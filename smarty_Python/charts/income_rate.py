from flask import Blueprint, jsonify, request
import pymysql
import pandas as pd
import json

income_comparison_bp = Blueprint('income_comparison', __name__)

def get_db_connection():
    try:
        db_connection = pymysql.connect(
            host='localhost',
            user='smarty',
            password='1234',
            database='smartydb',
            cursorclass=pymysql.cursors.DictCursor
        )
        return db_connection
    except pymysql.MySQLError as e:
        print(f"Error connecting to MySQL: {e}")
        return None

# 수입 비교 엔드포인트
@income_comparison_bp.route('/income-comparison', methods=['GET'])
def get_income_comparison():

    db = get_db_connection()
    if db is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = db.cursor()

    # 어제와 오늘의 total_income 조회 쿼리
    query = """
    SELECT 
        DATE(r.reservation_start) AS reservation_date,
        SUM(total_income) AS total_income_sum
    FROM (
        SELECT 
            DATE(r.reservation_start) AS reservation_date,
            COALESCE(SUM(
                CASE 
                    WHEN TIME(r.reservation_start) >= '09:00:00' AND TIME(r.reservation_end) <= '18:00:00' THEN 
                        f.day_rate * TIMESTAMPDIFF(HOUR, r.reservation_start, r.reservation_end)
                    WHEN TIME(r.reservation_start) >= '16:00:00' AND TIME(r.reservation_end) <= '23:00:00' THEN 
                        f.night_rate * TIMESTAMPDIFF(HOUR, r.reservation_start, r.reservation_end)
                    WHEN TIME(r.reservation_start) < '18:00:00' AND TIME(r.reservation_end) > '16:00:00' THEN 
                        (f.day_rate * TIMESTAMPDIFF(HOUR, r.reservation_start, 
                            CASE 
                                WHEN TIME(r.reservation_end) > '18:00:00' THEN '18:00:00'
                                ELSE r.reservation_end 
                            END
                        )) + 
                        (f.night_rate * TIMESTAMPDIFF(HOUR, 
                            CASE 
                                WHEN TIME(r.reservation_start) < '16:00:00' THEN '16:00:00'
                                ELSE r.reservation_start 
                            END,
                            r.reservation_end
                        ))
                    ELSE 0  
                END
            ), 0) 
            +
            COALESCE(( 
                SELECT 
                    SUM(p.price)
                FROM 
                    rental_tbl rt
                JOIN 
                    quantity_tbl q ON rt.quantity_id = q.quantity_id
                JOIN 
                    product_tbl p ON q.product_id = p.product_id
                WHERE 
                    rt.user_id = r.user_id 
                    AND DATE(rt.rental_date) = DATE(r.reservation_start)
            ), 0) AS total_income
        FROM 
            reservation_tbl r
        JOIN 
            court_tbl ct ON r.court_id = ct.court_id
        JOIN 
            facility_tbl f ON ct.facility_id = f.facility_id
        WHERE 
            DATE(r.reservation_start) IN (CURDATE(), DATE_SUB(CURDATE(), INTERVAL 1 DAY))
        GROUP BY 
            f.facility_name,
            DATE(r.reservation_start)
    ) AS daily_totals
    GROUP BY 
        reservation_date;
    """

    cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    db.close()

    df = pd.DataFrame(result)

    # 어제와 오늘 수입 데이터 추출
    today = pd.Timestamp.today().normalize()
    yesterday = today - pd.Timedelta(days=1)

    today_income = df.loc[df['reservation_date'] == today, 'total_income_sum'].values[0] if today in df['reservation_date'].values else 0
    yesterday_income = df.loc[df['reservation_date'] == yesterday, 'total_income_sum'].values[0] if yesterday in df['reservation_date'].values else 0

    # 수입 변화 비율 계산
    if yesterday_income > 0:
        change_ratio = ((today_income - yesterday_income) / yesterday_income) * 100
    else:
        change_ratio = None  # 어제 수입이 0일 경우 비율 계산 불가

    # 결과 생성
    if change_ratio is not None:
        change_text = f"오늘 수입이 전날 대비 {change_ratio:.2f}% 상승했습니다." if change_ratio > 0 else f"오늘 수입이 전날 대비 {abs(change_ratio):.2f}% 하락했습니다."
    else:
        change_text = "어제 수입이 없어 오늘 수입과 비교할 수 없습니다."

    # JSON으로 결과 반환
    response = {
        "today_income": today_income,
        "yesterday_income": yesterday_income,
        "change_ratio": change_ratio,
        "change_text": change_text
    }

    return jsonify(response)
