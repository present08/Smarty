from flask import Blueprint, jsonify, request
import datetime
import pymysql


line_chart_bp = Blueprint('line_chart', __name__)

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

@line_chart_bp.route('/line-data', methods=['GET'])
def get_line_data():
    query_date = request.args.get('date', datetime.date.today().strftime('%Y-%m-%d'))

    db = get_class_data()
    cursor = db.cursor()

    query = """
    SELECT 
    f.facility_name,

    -- 예약으로 인한 수입 계산
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
    ), 0) AS reservation_income,

    -- 대여 물품비 계산
    COALESCE(( 
        SELECT 
            SUM(p.price)
        FROM 
            rental rt
        JOIN 
            quantity q ON rt.quantity_id = q.quantity_id
        JOIN 
            product p ON q.product_id = p.product_id  -- quantity과 product조인
        WHERE 
            rt.user_id = r.user_id 
            AND DATE(rt.rental_date) = DATE(r.reservation_start)
    ), 0) AS rental_income,

    -- 총 수입 계산 (예약 수입 + 대여 물품비)
    (
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
        ), 0) + 

        (SELECT 
            COALESCE(SUM(p.price), 0)
        FROM 
            rental rt
        JOIN 
            quantity q ON rt.quantity_id = q.quantity_id
        JOIN 
            product p ON q.product_id = p.product_id  -- quantity과 product 조인
        WHERE 
            rt.user_id = r.user_id 
            AND DATE(rt.rental_date) = DATE(r.reservation_start)
        )
    ) AS total_income

FROM 
    reservation r
JOIN 
    court ct ON r.court_id = ct.court_id
JOIN 
    facility f ON ct.facility_id = f.facility_id
WHERE 
    DATE(r.reservation_start) = %s  -- 날짜 필터링

GROUP BY 
    f.facility_name,
    DATE(r.reservation_start)
ORDER BY 
    f.facility_name,
    DATE(r.reservation_start);

    """
    cursor.execute(query, (query_date,))
    results = cursor.fetchall()
    print(results)
    cursor.close()
    db.close()

    # 데이터를 JSON으로 변환
    data = []
    for row in results:
        data.append(
            {
                "facility_name": row[0],
                "total_income": row[3]
            }
        )
    print(data)
    return jsonify({"date": query_date, "data": data})
