from flask import Blueprint, jsonify, request
import pymysql
import  pandas as pd
import json


rental_statistics_bp = Blueprint('rental_statistics', __name__)

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

@rental_statistics_bp.route('/rental-statistics', methods=['POST', 'GET'])
def get_rental_statistics():
    print("여기 호출되는가?")
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
        CASE 
            WHEN p.product_name IN ('유니폼', '운동화') THEN COALESCE(s.cloth_size, s.shoe_size)
            ELSE '전체'
        END AS size,
        SUM(q.stock) AS total_stock,
        COALESCE(SUM(r.rented_quantity), 0) AS rented_quantity
    FROM 
        facility f
    JOIN 
        product p ON f.facility_id = p.facility_id
    JOIN 
        quantity q ON p.product_id = q.product_id
    LEFT JOIN 
        size s ON q.size_id = s.size_id
    LEFT JOIN 
        (
            SELECT quantity_id, COUNT(*) AS rented_quantity
            FROM rental
            WHERE DATE(rental_date) = %s
            GROUP BY quantity_id
        ) r ON q.quantity_id = r.quantity_id
    WHERE 
        f.facility_name = %s
    GROUP BY 
        f.facility_name, p.product_name, size
    ORDER BY 
        p.product_name, size;
    """

    cursor.execute(query, (date, facility_name))
    result = cursor.fetchall()

    cursor.close()
    db.close()
    print("result:",result)

    processed_data = {}

    for item in result:
        facility_name = item['facility_name']
        product_name = item['product_name']
        size = item['size']
        total_stock = item['total_stock']
        rented_quantity = item['rented_quantity']

        # 사물함이면서 사이즈가 '전체'인 경우
        if product_name == '사물함' and size == '전체':
            key = f"{product_name}"
        # 사이즈가 '전체'가 아닌 다른 항목인 경우
        else:
            key = f"{product_name}" if size == '전체' else f"{product_name}{size}"

        # 필요한 데이터를 리스트로 저장
        processed_data[key] = [total_stock, rented_quantity]

    # DataFrame 생성
    df = pd.DataFrame.from_dict(processed_data, orient='index', columns=['total_stock', 'rented_quantity'])

    # 결과 DataFrame 출력
    print(df)
    # DataFrame을 JSON으로 변환
    json_result = json.loads(df.reset_index().to_json(orient="records", force_ascii=False))
    print("Parsed JSON Result:", json_result)
    return jsonify(json_result)
