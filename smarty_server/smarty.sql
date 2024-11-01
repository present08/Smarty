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

-- 시설 테이블 수정
create table facility_tbl (
	facility_id varchar(100) primary key not null,
    facility_name varchar(100) not null,
    quantity int,
    open_time time,
    close_time time,
    default_time int,
    basic_fee int,
    extra_fee int,
    contact varchar(100),
    info text,
    caution text,
    court boolean default false,
    product boolean default false,
    facility_status boolean default false,
    facility_images boolean default false
);


-- 시설 첨부파일 테이블
create table facility_attach_tbl (
	facility_id varchar(100) not null,
	file_name varchar(100) not null,
    foreign key (facility_id) references facility(facility_id)
);

-- 대여 테이블 생성
CREATE TABLE rental_tbl (
    rental_id VARCHAR(100) PRIMARY KEY NOT NULL,
    user_id VARCHAR(100),
    quantity_id VARCHAR(100),
    rental_date DATETIME NOT NULL,
    return_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (quantity_id) REFERENCES quantity_tbl(quantity_id)
);

-- 대여 물품 테이블 생성
CREATE TABLE product_tbl (
    product_id VARCHAR(100) PRIMARY KEY NOT NULL,
    facility_id VARCHAR(100),
    product_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (facility_id) REFERENCES facility_tbl(facility_id)
);

-- 대여 물품별 사이즈 테이블(유니폼, 운동화 만)
create table size_tbl(
	size_id varchar(100) primary key not null,
    cloth_size varchar(100),
    shoe_size varchar(100),
    product_id varchar(100),
    FOREIGN KEY (product_id) REFERENCES product_tbl(product_id)
);

-- 대여품목별 재고 테이블
create table quantity_tbl(
	quantity_id varchar(100) primary key not null,
	product_id varchar(100),
    size_id varchar(100),
    stock INT, -- 대여 가능한 수량
    FOREIGN KEY (product_id) REFERENCES product_tbl(product_id),
    FOREIGN KEY (size_id) REFERENCES size_tbl(size_id)
);

-- 대여 물품 관리 테이블 (관리자용)
CREATE TABLE product_status_tbl (
    status_id VARCHAR(100) PRIMARY KEY NOT NULL,
    product_id VARCHAR(100),        -- 품목 ID
    status ENUM('손상', '수리 필요', '재구매 필요', '대여 가능') NOT NULL, -- 상태
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 업데이트 시각
    FOREIGN KEY (product_id) REFERENCES product_tbl(product_id)
);

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

-- 수강 신청 테이블 생성
CREATE TABLE enrollment_tbl (
    enrollment_id VARCHAR(100) PRIMARY KEY NOT NULL,
    user_id VARCHAR(100),
    class_id VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES user_tbl(user_id),
    FOREIGN KEY (class_id) REFERENCES class_tbl(class_id)
);


-- 예약시스템 세분화를 위한 특정시설 내에 코트/레일 세분화 추가
create table court_tbl (
	court_id varchar(100) primary key not null,
    facility_id varchar(100) not null,
    court_name varchar(100) not null,
    foreign key (facility_id) references facility(facility_id)
);

