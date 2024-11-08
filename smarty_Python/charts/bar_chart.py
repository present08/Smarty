from flask import Blueprint, jsonify
import pymysql


bar_chart_bp = Blueprint('bar_chart', __name__)

# 데이터베이스 연결 및 데이터 가져오기
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

@bar_chart_bp.route('/bar-data', methods=['GET'])
def get_bar_data():
    db = get_class_data()  # 데이터베이스 연결
    cursor = db.cursor()

    query = """
        SELECT 
            c.class_name, COUNT(u.user_id) as user_count
        FROM 
            enrollment_tbl e
        JOIN
            user_tbl u ON e.user_id = u.user_id
        JOIN 
            class_tbl c ON e.class_id = c.class_id
        GROUP BY 
            c.class_name
        ORDER BY 
            COUNT(u.user_id) DESC;
        """
    cursor.execute(query)
    results = cursor.fetchall()

    cursor.close()
    db.close()

    # 데이터를 JSON으로 변환
    data = [{"class_name": row[0], "user_count": row[1]} for row in results]

    return jsonify(data)
