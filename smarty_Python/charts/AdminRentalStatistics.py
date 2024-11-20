from flask import Blueprint, jsonify, request
import pymysql
import pandas as pd
import json

admin_rental_statistics_bp = Blueprint('admin-rental-statistics', __name__)

def get_class_data():
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

@admin_rental_statistics_bp.route('/admin-rental-statistics', methods=['POST', 'GET'])
def get_admin_rental_statistics():
    if request.method == 'GET':
        facility_name = request.args.get('facility_name')
        date = request.args.get('date')
    elif request.method == 'POST':
        data = request.json
        facility_name = data.get('facility_name')
        date = data.get('date')

    db = get_class_data()
    cursor = db.cursor()

    query = """
    SELECT 
        f.facility_name,
        p.product_name,
        p.management_type,
        p.size,
        p.stock,
        COALESCE(r.rented_quantity, 0) AS rented_quantity
    FROM 
        facility f
    JOIN 
        product p ON f.facility_id = p.facility_id
    LEFT JOIN 
        (
            SELECT 
                product_id, COUNT(*) AS rented_quantity
            FROM 
                rental
            WHERE 
                DATE(rental_date) = %s
            GROUP BY 
                product_id
        ) r ON p.product_id = r.product_id
    WHERE 
        f.facility_name = %s
    ORDER BY 
        p.product_name;
    """

    cursor.execute(query, (date, facility_name))
    result = cursor.fetchall()

    cursor.close()
    db.close()

    processed_data = {}

    for item in result:
        facility_name = item['facility_name']
        product_name = item['product_name']
        management_type = item['management_type']
        size_data = item['size']
        stock = item['stock']
        rented_quantity = item['rented_quantity']

        if management_type == '사이즈별 관리' and size_data:
            sizes = size_data.split(',')
            for size in sizes:
                key = f"{product_name} {size}"
                processed_data[key] = [stock // len(sizes), rented_quantity // len(sizes)]
        elif management_type == '개별 관리':
            key = f"{product_name} (개별)"
            processed_data[key] = [stock, rented_quantity]
        else:  # 일괄 관리
            key = f"{product_name} (일괄)"
            processed_data[key] = [stock, rented_quantity]

    # DataFrame 생성
    df = pd.DataFrame.from_dict(processed_data, orient='index', columns=['total_stock', 'rented_quantity'])

    # 결과 DataFrame 출력
    print(df)
    # DataFrame을 JSON으로 변환
    json_result = json.loads(df.reset_index().to_json(orient="records", force_ascii=False))
    print("Parsed JSON Result:", json_result)
    return jsonify(json_result)
