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

    # 어제와 오늘의 수입 데이터
    query = """
    SELECT 
        DATE(payment_date) AS payment_date,
        SUM(amount) AS total_income_sum
    FROM 
        payment
    WHERE 
        DATE(payment_date) IN (CURDATE(), DATE_SUB(CURDATE(), INTERVAL 1 DAY))
    GROUP BY 
        payment_date;
    """
    cursor.execute(query)
    daily_income_result = cursor.fetchall()

    # 월 평균 일 수입 계산
    monthly_query = """
    SELECT 
        AVG(daily_total) AS average_daily_income
    FROM (
        SELECT 
            DATE(payment_date) AS payment_date,
            SUM(amount) AS daily_total
        FROM 
            payment
        WHERE 
            MONTH(payment_date) = MONTH(CURDATE())
            AND YEAR(payment_date) = YEAR(CURDATE())
        GROUP BY 
            DATE(payment_date)
    ) AS monthly_data;
    """
    cursor.execute(monthly_query)
    monthly_income_result = cursor.fetchone()

    cursor.close()
    db.close()

    # Pandas로 데이터 처리
    df = pd.DataFrame(daily_income_result)

    today = pd.Timestamp.today().normalize()
    yesterday = today - pd.Timedelta(days=1)

    today_income = df.loc[df['payment_date'] == today, 'total_income_sum'].values[0] if today in df['payment_date'].values else 0
    yesterday_income = df.loc[df['payment_date'] == yesterday, 'total_income_sum'].values[0] if yesterday in df['payment_date'].values else 0
    monthly_average_income = monthly_income_result["average_daily_income"] if monthly_income_result else 0

    # 수입 변화 비율 계산
    if yesterday_income > 0:
        change_ratio = ((today_income - yesterday_income) / yesterday_income) * 100
    else:
        change_ratio = None

    # JSON 응답
    response = {
        "yesterday_income": yesterday_income,
        "today_income": today_income,
        "change_ratio": change_ratio,
        "monthly_average_income": monthly_average_income
    }

    return jsonify(response)
