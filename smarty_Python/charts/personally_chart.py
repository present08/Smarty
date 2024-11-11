from flask import Blueprint, jsonify, request
import pymysql
import pandas as pd
import json

personally_chart_bp = Blueprint('personally_chart', __name__)

def get_class_data():
    db_connection = pymysql.connect(
        host='localhost',
        user='smarty',
        password='1234',
        database='smartydb'
    )
    return db_connection
# 로그인하면 해당 user_id 가져오는 코드
# @personally_chart_bp.route('/personally-data/<user_id>', methods=['GET'])
# def get_personally_chart(user_id):
#     db = get_class_data()

# 테스트를 위한 user33 할당
@personally_chart_bp.route('/personally-data', methods=['GET'])
def get_personally_chart():
    user_id = request.args.get('user_id', 'user33')  # 기본 유저 ID 설정
    db = get_class_data()

    query = """
        SELECT 
            DATE(r.reservation_start) AS date,
            u.user_name AS user_name,  -- 유저 이름 가져오기
               SUM(TIMESTAMPDIFF(HOUR, r.reservation_start, r.reservation_end)) AS total_usage_hours,
               (SELECT COUNT(*) 
                FROM rental rt
                WHERE rt.user_id = %s 
                    AND DATE(rt.rental_date) = DATE(r.reservation_start)) AS total_rentals,
                COUNT(r.reservation_id) AS total_reservations
        FROM reservation r
        JOIN court c ON r.court_id = c.court_id
        JOIN facility f ON c.facility_id = f.facility_id
        JOIN user u ON r.user_id = u.user_id  -- user 조인하여 유저 이름 가져옴
            WHERE r.user_id = %s
            AND DATE(r.reservation_start) BETWEEN DATE_SUB(CURDATE(), INTERVAL 4 DAY) AND CURDATE()
        GROUP BY DATE(r.reservation_start)
        ORDER BY DATE(r.reservation_start);
    """
    df = pd.read_sql(query, db, params=(user_id, user_id))

    result_json = df.to_json(orient="records", date_format="iso")
    db.close()
    return jsonify(json.loads(result_json))
