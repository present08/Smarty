-- 데이터베이스 생성
CREATE DATABASE smartydb;
USE smartydb;

-- 사용자 생성 및 권한 부여
CREATE USER `smarty`@`%` IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON smartydb.* TO `smarty`@`%`;


-- 10/14
-- 인덱스 요소 추가 및 검증
-- 시설 내에 코트/레일 세분화를 위한 court_tbl 추가
-- court_tbl추가로 인한 reservation_tbl 수정

-- 10/15
-- 상품별 사이즈와 사이즈별 수량 관련 데이터 관리는 위한 테이블 추가 (size_tbl, quantity_tbl)
-- 회원가입시 발급되는 QR코드에 대한 정보를 저장하기 위해 user_tbl에 qr_code 항목을 추가
-- rental_tbl에 상품별 대여에 대한 세분화를 위해 size_tbl에서 size_id 값을 FK로 참조

-- 10/16
-- class_tbl에서 외래키로 받고 있는 user_id에 대한 값이 class_tbl에서는 불필요하다 판단하여 삭제
-- enrollment_tbl에서 실질적으로 수강신청에 대한 데이터를 주고 받기 때문에 user_id값은 여기서 외래키로 받는게 적절하다고 판단하여 추가
-- class 추가시 같은 시설내에서 같은 요일에 같은 시간을 가지는 강좌가 중복되지 않는 제약조건 추가 (아직 제대로 작동x)

-- 10/18
-- 강의 데이터 입력
-- 강의별 유저들 수강신청 데이터 입력
-- 예약별 이용요금 계산 데이터 조회
-- 시설별 하루 시설 예약에 대한 총수입 조회

-- 10/24
-- 대여품목에 대한 대여 상태 처리 기능 고안 (rental_tbl 항목으로)
-- 초기에 생각한 대여 상태 처리 기능으로 변경
-- 상품 상태 처리로 인해 대여 테이블 수정필요

-- 10/30
-- user_tbl 로그인 날짜 현재 날짜 기준에서 직전 5개월 날짜로 랜덤 갱신
-- user_status 갱신을 위한 3개월 이상인 고객 처리

-- 10/31
-- 유저별 예약, 대여, 수강중인 강의 조회

-- 11/1
-- 현재까지 시설별 총 예약 현황비율

-- 사용자 테이블 생성
CREATE TABLE user_tbl (
    user_id VARCHAR(100) PRIMARY KEY NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    join_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    login_date DATE NOT NULL,
    user_status BOOLEAN,
    qr_code BLOB,
    level VARCHAR(100)
);

select * from user_tbl;
drop table user_tbl;

-- 유저별 나이 계산
SELECT
    user_name
  , birthday
  , YEAR(NOW())-LEFT(birthday,4) AS 'foreignAge(외국나이)'
  , YEAR(NOW())-LEFT(birthday,4) +1 AS 'koreaAge(한국나이)'
  , (SELECT (YEAR(NOW()) - year(birthday)) - (date_format(birthday, '%m%d') > DATE_FORMAT(NOW(), '%m%d'))) as 'koreaManAge(만나이)'
FROM user_tbl;

-- 3개월 미접속 이력 유저 검색
SELECT *
FROM user_tbl
WHERE DATEDIFF(CURDATE(), login_date) >= 90;


-- 로그인 히스토리 테이블 생성
CREATE TABLE login_history_tbl (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    login_time DATETIME NOT NULL,
    logout_time DATETIME DEFAULT NULL,
    ip_address VARCHAR(45) NOT NULL,
    login_status ENUM('SUCCESS', 'FAILURE') NOT NULL,
    user_agent VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)
);

-- 시설 테이블 생성 (운영시간 포함)
CREATE TABLE facility_tbl (
    facility_id VARCHAR(100) PRIMARY KEY NOT NULL,
    facility_name VARCHAR(100) NOT NULL,
    day_rate DOUBLE NOT NULL,
    night_rate DOUBLE NOT NULL,
    open_time TIME NOT NULL,  -- 시설 개방 시간
    close_time TIME NOT NULL   -- 시설 폐장 시간
);

select * from facility_tbl;
drop table facility_tbl;

-- 대여 물품 테이블 생성
CREATE TABLE product_tbl (
    product_id VARCHAR(100) PRIMARY KEY NOT NULL,
    facility_id VARCHAR(100),
    product_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (facility_id) REFERENCES facility_tbl(facility_id)
);

select * from product_tbl;
drop table product_tbl;

-- 대여 테이블 생성
CREATE TABLE rental_tbl (
    rental_id VARCHAR(100) PRIMARY KEY NOT NULL,
    user_id VARCHAR(100),           -- 사용자 ID
    quantity_id VARCHAR(100),       -- 고유 재고 ID (quantity_tbl의 quantity_id)
    rental_date DATETIME NOT NULL,  -- 대여 시작일
    return_date DATETIME NOT NULL,  -- 반납일
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (quantity_id) REFERENCES quantity_tbl(quantity_id)  -- quantity_id를 참조
);


select * from rental_tbl;
drop table rental_tbl;

-- 금일 시설별 대여품
SELECT
    f.facility_id,
    f.facility_name,
    p.product_id,
    p.product_name,
    q.stock AS total_stock,
    COUNT(r.rental_id) AS rented_quantity
FROM
    facility_tbl f
JOIN
    product_tbl p ON f.facility_id = p.facility_id
JOIN
    quantity_tbl q ON p.product_id = q.product_id
LEFT JOIN
    rental_tbl r ON q.quantity_id = r.quantity_id
                AND DATE(r.rental_date) = CURDATE()  -- 금일 대여된 품목만 조회
GROUP BY
    f.facility_id, f.facility_name, p.product_id, p.product_name, q.stock  -- 모든 선택 컬럼 포함
ORDER BY
    f.facility_id, p.product_name;


-- 대여로 인한 수입 계산
SELECT
    f.facility_name,
    SUM(p.price) AS rental_income
FROM
    rental_tbl r
JOIN
    product_tbl p ON r.product_id = p.product_id
JOIN
    facility_tbl f ON p.facility_id = f.facility_id
GROUP BY
    f.facility_name;


-- 멤버십 테이블 생성
CREATE TABLE membership_tbl (
    membership_id VARCHAR(100) PRIMARY KEY NOT NULL,
    membership_level VARCHAR(100) NOT NULL,
    user_id VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)
);

-- 예약 테이블 생성 (시설 관련 칼럼 제거)
CREATE TABLE reservation_tbl (
    reservation_id VARCHAR(100) PRIMARY KEY NOT NULL,
    user_id VARCHAR(100),
    -- 시설전체 예약에서 코트/레일 별로 세분화 작업을 통해 시설ID를 받아오는게 아니라 courtID를 외래키로 참조
    -- facility_id VARCHAR(100),
    court_id varchar(100),
    reservation_start DATETIME NOT NULL,
    reservation_end DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    -- FOREIGN KEY (facility_id) REFERENCES facility_tbl(facility_id)
	foreign key (court_id) references court_tbl(court_id)
);

select * from reservation_tbl;
drop table reservation_tbl;

-- 예약 현황 조회 쿼리
SELECT
    c.court_name,
    r.reservation_start,
    r.reservation_end
FROM
    court_tbl c
LEFT JOIN
    reservation_tbl r ON c.court_id = r.court_id
WHERE
    c.facility_id = 'Facility1'  -- 여기에 시설 ID를 입력하세요.
ORDER BY
    r.reservation_start;


SELECT
    r.reservation_id,
    f.facility_name,
    r.reservation_start,
    r.reservation_end,
    CASE
		-- 예약이 낮시간에만 있는 경우
        WHEN TIME(r.reservation_start) BETWEEN '09:00:00' AND '18:00:00'
             AND TIME(r.reservation_end) <= '18:00:00' THEN f.day_rate * TIMESTAMPDIFF(HOUR, r.reservation_start, r.reservation_end)
		-- 예약이 밤시간에만 있는 경우
        WHEN TIME(r.reservation_start) BETWEEN '16:00:00' AND '23:00:00'
             AND TIME(r.reservation_end) <= '23:00:00' THEN f.night_rate * TIMESTAMPDIFF(HOUR, r.reservation_start, r.reservation_end)
		-- 예약이 낮시간과 밤시간에 걸쳐 있는 경우
        WHEN TIME(r.reservation_start) < '18:00:00' AND TIME(r.reservation_end) > '16:00:00'
             THEN
             -- 낮시간 요금 계산: 시작 시간부터 18:00까지
                (f.day_rate * TIMESTAMPDIFF(HOUR, r.reservation_start, '18:00:00')) +
                (f.night_rate * TIMESTAMPDIFF(HOUR, '16:00:00', r.reservation_end))
        ELSE 0  -- 그 외 시간대
    END AS calculated_rate
FROM
    reservation_tbl r
JOIN
    court_tbl ct ON r.court_id = ct.court_id
JOIN
    facility_tbl f ON ct.facility_id = f.facility_id
ORDER BY
    r.reservation_start;

SELECT
    calculated.facility_name,
    calculated.reservation_date,
    SUM(calculated.calculated_rate) AS total_income
FROM
    (
        SELECT
            r.reservation_id,
            f.facility_name,
            DATE(r.reservation_start) AS reservation_date,
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
            END AS calculated_rate
        FROM
            reservation_tbl r
        JOIN
            court_tbl ct ON r.court_id = ct.court_id
        JOIN
            facility_tbl f ON ct.facility_id = f.facility_id
    ) AS calculated
GROUP BY
    calculated.facility_name,
    calculated.reservation_date
ORDER BY
    calculated.facility_name,
    calculated.reservation_date;

SELECT
 CASE WEEKDAY(reservation_end)
    WHEN '0' THEN '월'
    WHEN '1' THEN '화'
    WHEN '2' THEN '수'
    WHEN '3' THEN '목'
    WHEN '4' THEN '금'
    WHEN '5' THEN '토'
    WHEN '6' THEN '일'
 END AS day
FROM reservation_tbl;

-- 출결 테이블 생성 (10/14 출석/지각/결석 출결상태 값 추가)
CREATE TABLE attendance_tbl (
    attendance_id VARCHAR(100) PRIMARY KEY NOT NULL,
    reservation_id VARCHAR(100),
    enrollment_id VARCHAR(100),
    status ENUM('Present', 'Late', 'Absent'),  -- 출결 상태
    checkin_date DATETIME NOT NULL,
    checkout_date DATETIME NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservation_tbl(reservation_id),
    FOREIGN KEY (enrollment_id) REFERENCES enrollment_tbl(enrollment_id)
);

-- 결제 테이블 생성
CREATE TABLE payment_tbl (
    payment_id VARCHAR(100) PRIMARY KEY NOT NULL,
    reservation_id VARCHAR(100),
    enrollment_id VARCHAR(100),
    rental_id varchar(100),
    amount FLOAT NOT NULL,
    payment_date DATE NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservation_tbl(reservation_id),
	foreign key(rental_id) references rental_tbl(rental_id),
    FOREIGN KEY (enrollment_id) REFERENCES enrollment_tbl(enrollment_id)
);

drop table payment_tbl;

-- 알림 테이블 생성
CREATE TABLE notification_tbl (
    notification_id VARCHAR(100) PRIMARY KEY NOT NULL,
    user_id VARCHAR(100),
    message VARCHAR(300),
    send_date DATE,
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)
);

-- 챗봇 테이블 생성
CREATE TABLE chatbot_tbl (
    chat_room VARCHAR(100) PRIMARY KEY NOT NULL,
    user_id VARCHAR(100),
    question VARCHAR(300),
    answer VARCHAR(300),
    message TEXT,
    status BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id)
);

-- 수업 테이블 생성
CREATE TABLE class_tbl (
    class_id VARCHAR(100) PRIMARY KEY NOT NULL,
    -- user_id VARCHAR(100),
    facility_id VARCHAR(100),
    class_name VARCHAR(100) NOT NULL,
    start_date DATE,
    end_date DATE,
    day VARCHAR(50),
    start_time TIME,
    end_time TIME,
    price INT,
    -- FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (facility_id) REFERENCES facility_tbl(facility_id)
);

-- 수업 요일과 시간 중복 방지
ALTER TABLE class_tbl
ADD CONSTRAINT unique_class UNIQUE (facility_id, day, start_time, end_time);

SELECT
    u.user_id,          -- 유저 ID
    u.user_name,        -- 유저 이름
    c.class_name        -- 강좌명
FROM
    enrollment_tbl e
JOIN
    user_tbl u ON e.user_id = u.user_id  -- 유저 정보 조인
JOIN
    class_tbl c ON e.class_id = c.class_id; -- 강좌 정보 조인

select * from class_tbl;
drop table class_tbl;

SELECT
    f.facility_name,
    SUM(c.price) AS class_income
FROM
    enrollment_tbl e
JOIN
    class_tbl c ON e.class_id = c.class_id
JOIN
    facility_tbl f ON c.facility_id = f.facility_id
GROUP BY
    f.facility_name;

-- 수강 신청 테이블 생성
CREATE TABLE enrollment_tbl (
    enrollment_id VARCHAR(100) PRIMARY KEY NOT NULL,
    user_id VARCHAR(100),
    class_id VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (class_id) REFERENCES class_tbl(class_id)
);

select * from enrollment_tbl;


-- 10/14 예약시스템 세분화를 위한 특정시설 내에 코트/레일 세분화 추가
create table court_tbl(
	court_id varchar(100) primary key not null,
    court_name varchar(100) not null,
    facility_id varchar(100) not null,
    FOREIGN KEY (facility_id) REFERENCES facility_tbl(facility_id)
);

select * from court_tbl;
drop table court_tbl;

-- 10/14 현재까지 테스트한 테이블 인덱싱 처리
CREATE INDEX idx_user_id ON user_tbl(user_id);
CREATE INDEX idx_facility_name ON facility_tbl(facility_name);
CREATE INDEX idx_reservation_start_end ON reservation_tbl(reservation_start, reservation_end);
CREATE INDEX idx_reservation_court_id ON reservation_tbl(court_id);

-- 10/14 미구현 테이블 인덱싱
CREATE INDEX idx_payment_date ON payment_tbl(payment_date);
CREATE INDEX idx_attendance_status_checkin ON attendance_tbl(status, checkin_date);
CREATE INDEX idx_login_time ON login_history_tbl(login_time);
CREATE INDEX idx_class_start_end ON class_tbl(start_time, end_time);

-- 상품별 사이즈 테이블
create table size_tbl(
	size_id varchar(100) primary key not null,
    cloth_size varchar(100),
    shoe_size varchar(100),
    product_id varchar(100),
    FOREIGN KEY (product_id) REFERENCES product_tbl(product_id)
);

select * from size_tbl;
drop table size_tbl;

-- 대여품목별 재고 테이블
create table quantity_tbl(
	quantity_id varchar(100) primary key not null,
	product_id varchar(100),
    size_id varchar(100),
    stock INT, -- 대여 가능한 수량
    FOREIGN KEY (product_id) REFERENCES product_tbl(product_id),
    FOREIGN KEY (size_id) REFERENCES size_tbl(size_id)
);

select * from quantity_tbl;
drop table quantity_tbl;

-- 시설별 유니폼 사이즈 조회
SELECT
    f.facility_id,
    f.facility_name,
    p.product_name AS uniform_name,
    s.cloth_size AS uniform_size
FROM
    facility_tbl f
JOIN
    product_tbl p ON f.facility_id = p.facility_id
JOIN
    size_tbl s ON p.product_id = s.product_id
WHERE
    p.product_name LIKE '%유니폼%';  -- 유니폼이라는 키워드를 포함하는 상품

-- 시설별 운동화 사이즈 조회
SELECT
    f.facility_id,
    f.facility_name,
    p.product_name AS shoe_name,
    s.shoe_size AS shoe_size
FROM
    facility_tbl f
JOIN
    product_tbl p ON f.facility_id = p.facility_id
JOIN
    size_tbl s ON p.product_id = s.product_id
WHERE
    p.product_name LIKE '%운동화%';  -- 운동화라는 키워드를 포함하는 상품

-- 날짜&시설 별 예약 현황 (시설ID 버전)
SELECT
    c.court_id,
    c.court_name,
    r.reservation_id,
    r.user_id,
    r.reservation_start,
    r.reservation_end
FROM
    court_tbl c
LEFT JOIN
    reservation_tbl r ON c.court_id = r.court_id
    AND DATE(r.reservation_start) = '2024-10-21'  -- 날짜 필터링
JOIN
    facility_tbl f ON c.facility_id = f.facility_id
WHERE
    f.facility_id = 'Facility1'  -- 예시로 사용될 facility_id
ORDER BY
    c.court_id;  -- 코트 ID로 정렬

-- 날짜&시설 별 예약 현황 (시설명 버전)
SELECT
    c.court_id,
    c.court_name,
    r.reservation_id,
    r.user_id,
    r.reservation_start,
    r.reservation_end
FROM
    court_tbl c
LEFT JOIN
    reservation_tbl r ON c.court_id = r.court_id
    AND DATE(r.reservation_start) = '2024-10-21'  -- 날짜 필터링
JOIN
    facility_tbl f ON c.facility_id = f.facility_id
WHERE
    f.facility_name = '배드민턴장'  -- 예시로 사용될 facility_name
ORDER BY
    c.court_id;  -- 코트 ID로 정렬

-- 10/24 상품별 재고량 확인
SELECT
    p.product_name AS 상품명,
    COALESCE(s.cloth_size, s.shoe_size, '사이즈 없음') AS 사이즈,
    q.stock AS 재고수량
FROM
    product_tbl p
LEFT JOIN
    size_tbl s ON p.product_id = s.product_id
LEFT JOIN
    quantity_tbl q ON p.product_id = q.product_id
                    AND (s.size_id = q.size_id OR q.size_id IS NULL)
ORDER BY
    p.product_name, 사이즈;

-- 10/24 관리자용 상품 관리
CREATE TABLE product_status_tbl (
    status_id VARCHAR(100) PRIMARY KEY NOT NULL,
    quantity_id VARCHAR(100),        -- 재고 ID
    status ENUM('손상', '수리 필요', '재구매 필요', '대여 가능') NOT NULL, -- 상태
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 업데이트 시각
    FOREIGN KEY (quantity_id) REFERENCES quantity_tbl(quantity_id)
);

select * from product_status_tbl;
drop table product_status_tbl;

SELECT * FROM product_status_tbl WHERE quantity_id = 'Facility1_shoes_Facility1_shoes240';

-- 날짜&시설별 물품 대여
SELECT
    p.product_id,
    p.product_name,
    q.stock AS total_stock,
    (q.stock - COALESCE(SUM(CASE WHEN r.return_date >= CURDATE() THEN 1 ELSE 0 END), 0)) AS remaining_stock
FROM
    product_tbl p
JOIN
    quantity_tbl q ON p.product_id = q.product_id
LEFT JOIN
    rental_tbl r ON q.quantity_id = r.quantity_id
                 AND DATE(r.rental_date) <= '2024-10-29'
                 AND DATE(r.return_date) >= '2024-10-29'
WHERE
    p.facility_id = 'Facility4'
GROUP BY
    p.product_id, p.product_name, q.stock;

-- 10/31
-- 특정 사용자의 예약 정보 조회
SELECT r.reservation_id, r.court_id, r.reservation_start, r.reservation_end,
       c.court_name, f.facility_name
FROM reservation_tbl r
JOIN court_tbl c ON r.court_id = c.court_id
JOIN facility_tbl f ON c.facility_id = f.facility_id
WHERE r.user_id = 'user14';

-- 특정 사용자의 대여 정보 조회
SELECT rt.rental_id, p.product_name, s.cloth_size, s.shoe_size,
       rt.rental_date, rt.return_date, f.facility_name
FROM rental_tbl rt
JOIN quantity_tbl q ON rt.quantity_id = q.quantity_id
LEFT JOIN size_tbl s ON q.size_id = s.size_id  -- LEFT JOIN으로 변경
JOIN product_tbl p ON q.product_id = p.product_id
JOIN facility_tbl f ON p.facility_id = f.facility_id
WHERE rt.user_id = 'user14';

-- 특정 사용자의 수강 신청한 강좌 정보 조회
SELECT e.enrollment_id, f.facility_name, c.class_name, c.start_date, c.end_date, c.day,
       c.start_time, c.end_time
FROM enrollment_tbl e
JOIN class_tbl c ON e.class_id = c.class_id
JOIN facility_tbl f ON c.facility_id = f.facility_id
WHERE e.user_id = 'user14';

-- 이용자별 예약 기록 및 현황 조회
SELECT r.reservation_id,
       r.court_id,
       r.reservation_start,
       r.reservation_end,
       c.court_name,
       f.facility_name,
       CASE
           WHEN NOW() > r.reservation_end THEN '만료'
           WHEN NOW() BETWEEN r.reservation_start AND r.reservation_end THEN '이용중'
           ELSE '대기중'
       END AS '상태',
       CASE
         WHEN NOW() > r.reservation_end THEN '만료'
           WHEN NOW() < r.reservation_start THEN
               CONCAT(
                   TIMESTAMPDIFF(HOUR, NOW(), r.reservation_start), '시간 ',
                   MOD(TIMESTAMPDIFF(MINUTE, NOW(), r.reservation_start), 60), '분'
               )
           ELSE
               CONCAT(
                   TIMESTAMPDIFF(HOUR, NOW(), r.reservation_end), '시간 ',
                   MOD(TIMESTAMPDIFF(MINUTE, NOW(), r.reservation_end), 60), '분'
               )
       END AS '남은 시간'
FROM reservation_tbl r
JOIN court_tbl c ON r.court_id = c.court_id
JOIN facility_tbl f ON c.facility_id = f.facility_id
WHERE r.user_id = 'user1';

-- 이용자별 대여 기록 및 현황 조회
SELECT rt.rental_id,
       p.product_name,
       s.cloth_size,
       s.shoe_size,
       rt.rental_date,
       rt.return_date,
       f.facility_name,
       CASE
            WHEN NOW() > rt.return_date THEN '만료'
           WHEN NOW() BETWEEN rt.rental_date AND rt.return_date THEN '이용중'
           ELSE '대기중'
       END AS '상태',
       CASE
           WHEN NOW() >  rt.return_date THEN '만료'
           WHEN NOW() < rt.rental_date THEN
               CONCAT(
                   TIMESTAMPDIFF(HOUR, NOW(), rt.rental_date), '시간 ',
                   MOD(TIMESTAMPDIFF(MINUTE, NOW(), rt.rental_date), 60), '분'
               )
           ELSE
               CONCAT(
                   TIMESTAMPDIFF(HOUR, NOW(),rt.return_date), '시간 ',
                   MOD(TIMESTAMPDIFF(MINUTE, NOW(), rt.return_date), 60), '분'
               )
       END AS '남은 시간'
FROM rental_tbl rt
JOIN quantity_tbl q ON rt.quantity_id = q.quantity_id
LEFT JOIN size_tbl s ON q.size_id = s.size_id
JOIN product_tbl p ON q.product_id = p.product_id
JOIN facility_tbl f ON p.facility_id = f.facility_id
WHERE rt.user_id = 'user1';

-- 현재 날짜 기준으로 최근 5일간 시설이용시간, 물품대여 횟수, 시설예약 횟수 조회
SELECT
    DATE(r.reservation_start) AS date,
    SUM(TIMESTAMPDIFF(HOUR,
        r.reservation_start,
        r.reservation_end)) AS '총 이용 시간',
    (SELECT
            COUNT(*)
        FROM
            rental_tbl rt
        WHERE
            rt.user_id = 'user33'
                AND DATE(rt.rental_date) = DATE(r.reservation_start)) AS '총 대여 횟수',
    COUNT(r.reservation_id) AS '총 예약 횟수'
FROM
    reservation_tbl r
        JOIN
    court_tbl c ON r.court_id = c.court_id
        JOIN
    facility_tbl f ON c.facility_id = f.facility_id
WHERE
    r.user_id = 'user33'
        AND DATE(r.reservation_start) BETWEEN DATE_SUB(CURDATE(), INTERVAL 4 DAY) AND CURDATE()
GROUP BY DATE(r.reservation_start)
ORDER BY DATE(r.reservation_start);

-- 현재까지 시설별 총 예약 현황비율
SELECT
    f.facility_name AS facility_name,
    COUNT(r.reservation_id) AS total_reservations,
    ROUND((COUNT(r.reservation_id) / (SELECT COUNT(*) FROM reservation_tbl WHERE user_id = 'user33')) * 100, 2) AS reservation_ratio
FROM
    reservation_tbl r
JOIN
    court_tbl c ON r.court_id = c.court_id
JOIN
    facility_tbl f ON c.facility_id = f.facility_id
WHERE
    r.user_id = 'user33'
GROUP BY
    f.facility_name
ORDER BY
    total_reservations DESC;

SELECT
    reservation_date,
    SUM(reservation_income) AS total_reservation_income,
    SUM(rental_income) AS total_rental_income,
    SUM(total_income) AS total_income
FROM (
    SELECT
        DATE(r.reservation_start) AS reservation_date,
        f.facility_name,
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
        ), 0) AS rental_income,

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
                rental_tbl rt
            JOIN
                quantity_tbl q ON rt.quantity_id = q.quantity_id
            JOIN
                product_tbl p ON q.product_id = p.product_id
            WHERE
                rt.user_id = r.user_id
                AND DATE(rt.rental_date) = DATE(r.reservation_start)
            )
        ) AS total_income

    FROM
        reservation_tbl r
    JOIN
        court_tbl ct ON r.court_id = ct.court_id
    JOIN
        facility_tbl f ON ct.facility_id = f.facility_id
    GROUP BY
        reservation_date,
        f.facility_name
) AS facility_totals
GROUP BY
    reservation_date
ORDER BY
    reservation_date;