from flask import Blueprint, jsonify, request
import pymysql
import pandas as pd
import json

pie_chart_bp = Blueprint('pie_chart', __name__)

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
@pie_chart_bp.route('/pie-data', methods=['GET'])
def get_pie_chart():
    user_id = request.args.get('user_id', 'user33')
    db = get_class_data()

    query = """
    SELECT
        u.user_name AS user_name, 
        f.facility_name AS facility_name,
        COUNT(r.reservation_id) AS total_reservations,
        ROUND((COUNT(r.reservation_id) / (SELECT COUNT(*) FROM reservation_tbl WHERE user_id = %s)) * 100, 2) AS reservation_ratio
    FROM 
        reservation_tbl r
    JOIN 
        court_tbl c ON r.court_id = c.court_id
    JOIN 
        facility_tbl f ON c.facility_id = f.facility_id
    JOIN 
        user_tbl u ON r.user_id = u.user_id
    WHERE 
        r.user_id = %s
    GROUP BY 
        f.facility_name
    ORDER BY 
        reservation_ratio DESC;
    """
    df = pd.read_sql(query, db, params=(user_id, user_id))
    db.close()

    df.rename(columns={'facility_name': 'category', 'reservation_ratio': 'percentage'}, inplace=True)

    # 결과 JSON 생성
    result_json = {
        "user_name": df['user_name'][0] if not df.empty else 'Unknown User',
        "data": df[['category', 'total_reservations', 'percentage']].to_dict(orient="records")
    }

    return jsonify(result_json)