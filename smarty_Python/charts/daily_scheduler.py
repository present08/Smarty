from flask import Flask, Blueprint, jsonify, request
import pymysql
from datetime import datetime, timedelta

app = Flask(__name__)

daily_scheduler_bp = Blueprint('daily_scheduler', __name__)

# 데이터베이스 연결 설정
def get_class_data():
    try:
        db_connection = pymysql.connect(
            host='localhost',
            user='smarty',
            password='1234',
            database='smartydb'
        )
        return db_connection
    except pymysql.MySQLError as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# 하루 24시간을 기준으로 타임 슬롯을 생성하는 함수 (1시간 간격)
def generate_time_slots(start_time, end_time, interval_minutes=60):
    slots = []
    current_time = start_time
    while current_time < end_time:
        next_time = current_time + timedelta(minutes=interval_minutes)
        slots.append((current_time.strftime('%H:%M'), next_time.strftime('%H:%M')))
        current_time = next_time
    return slots

# 예약 데이터를 가져오는 엔드포인트
@daily_scheduler_bp.route('/daily-scheduler', methods=['POST', 'GET'])
def get_daily_data():
    if request.method == 'GET':
        facility_name = request.args.get('facility_name')
        date = request.args.get('date')
    elif request.method == 'POST':
        data = request.json

        # 디버깅을 위해 받은 데이터 출력
        print(f"Received POST data: {data}")

        facility_name = data.get('facility_name')
        date = data.get('date')

    if not facility_name or not date:
        return jsonify({"error": "시설 이름 또는 날짜가 누락되었습니다."}), 400

    print(f"Facility Name: {facility_name}, Date: {date}")

    db = get_class_data()
    if db is None:
        return jsonify({"error": "Unable to connect to the database"}), 500

    cursor = db.cursor()

    # 시설 이름과 날짜 기준으로 예약된 코트 데이터를 가져오는 쿼리
    query = """
        SELECT 
            r.reservation_id, 
            r.user_id, 
            r.court_id, 
            r.reservation_start, 
            r.reservation_end, 
            c.court_name
        FROM 
            reservation_tbl r
        JOIN 
            court_tbl c ON r.court_id = c.court_id
        JOIN 
            facility_tbl f ON c.facility_id = f.facility_id
        WHERE 
            f.facility_name = %s  -- facility_name을 사용하여 검색
            AND DATE(r.reservation_start) = %s  
        ORDER BY 
            r.reservation_start;
    """
    cursor.execute(query, (facility_name, date))
    reservations_results = cursor.fetchall()

    # 시설의 모든 코트 가져오기 (예약이 없어도 표시해야 하므로) - **추가된 부분**
    court_query = """
        SELECT court_id, court_name 
        FROM court_tbl c 
        JOIN facility_tbl f ON c.facility_id = f.facility_id 
        WHERE f.facility_name = %s
    """
    cursor.execute(court_query, (facility_name,))
    all_courts = cursor.fetchall()
    # 예약된 시간대를 코트별로 그룹화하여 저장하는 빈 딕셔너리 정의
    reservations_by_court = {}

    # 예약된 시간대를 코트별로 그룹화하여 저장
    for row in reservations_results:
        court_id = row[2]
        if court_id not in reservations_by_court:
            reservations_by_court[court_id] = []
        reservations_by_court[court_id].append({
            "reservation_start": row[3].strftime('%H:%M'),
            "reservation_end": row[4].strftime('%H:%M'),
            "user_id": row[1]
        })

    # 코트별 타임 슬롯 생성 (00:00~23:59 사이 한 시간 단위)
    time_slots = generate_time_slots(datetime.strptime('00:00', '%H:%M'), datetime.strptime('23:59', '%H:%M'))

    # 예약 상태를 포함한 테이블 형식 데이터 구성
    courts = []

    # 모든 코트에 대해 처리 (예약이 없는 코트도 포함)
    for court in all_courts:
        court_id, court_name = court

        # 해당 코트에 예약된 정보가 있는지 확인
        reservations = reservations_by_court.get(court_id, [])

        # 24시간 슬롯을 생성하고 예약 여부에 따라 상태 설정
        for start_time, end_time in time_slots:
            # 해당 슬롯에 예약된 시간이 걸치는지 확인하는 로직 추가
            reservation_found = next(
                (r for r in reservations
                 if r['reservation_start'] <= start_time and r['reservation_end'] > start_time),
                None
            )

            courts.append({
                "court_id": court_id,
                "court_name": court_name,
                "time_slot": f"{start_time} - {end_time}",
                "status": "Reserved" if reservation_found else "Available",
                "user_id": reservation_found['user_id'] if reservation_found else None  # 예약된 유저 정보도 추가
            })

    cursor.close()
    db.close()

    # 예약 데이터 반환
    return jsonify({"courts": courts}), 200