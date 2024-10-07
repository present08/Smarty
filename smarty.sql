create database smartydb;
use smartydb;

create user`smarty`@`%` identified by '1234'; 
grant all privileges on smartydb.* to `smarty`@`%`;

create table user_tbl(
	user_id varchar(100) primary key not null ,
    user_name varchar(100) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    phone varchar(100) not null,
    address varchar(100) not null,
    birthday date not null,
    join_date date not null,
    login_date date not null,
    user_status boolean,
    level varchar(100)
);
drop table user_tbl;
select * from user_tbl;

create table facility_tbl(
	facility_id varchar(100) primary key not null,
    facility_name varchar(100) not null,
    price int not null,
    day_rate double not null,
    night_rate double not null
);

create table product_tbl(
	product_id varchar(100) primary key not null,
    facility_id varchar(100),
    product_name varchar(100) not null,
    price int not null,
    foreign key(facility_id) references facility_tbl(facility_id)
);

create table rental_tbl(
	rental_id varchar(100) primary key not null,
    user_id varchar(100),
    product_id varchar(100),
    rental_date datetime not null,
    return_date datetime not null,
	foreign key(user_id) references user_tbl(user_id),
    foreign key(product_id) references product_tbl(product_id)
);

create table membership_tbl(
	membership_id varchar(100) primary key not null,
    user_id varchar(100),
    facility_id varchar(100),
	foreign key(user_id) references user_tbl(user_id),
    foreign key(facility_id) references facility_tbl(facility_id)
);

create table reservation_tbl(
	reservation_id varchar(100) primary key not null,
    membership_id varchar(100),
    reservation_start_date date not null,
    reservation_end_date date not null,
	foreign key(membership_id) references membership_tbl(membership_id)
);

create table attendance_tbl(
	attendance_id varchar(100) primary key not null,
    reservation_id varchar(100),
    attendance_date date not null,
    checkout_date date not null,
	foreign key(reservation_id) references reservation_tbl(reservation_id)    
);

create table payment_tbl(
	payment_id varchar(100) primary key not null,
    reservation_id varchar(100),
    amount float not null,
    payment_date date not null,
	foreign key(reservation_id) references reservation_tbl(reservation_id)    
);

create table notification_tbl(
	notification_id varchar(100) primary key not null,
    membership_id varchar(100),
    message varchar(300),
    send_date date,
	foreign key(membership_id) references membership_tbl(membership_id)
);

create table chatbot_tbl(
	char_room varchar(100) primary key not null,
    user_id varchar(100),
    question varchar(300),
    answer varchar(300),
    message text,
    status boolean,
	foreign key(user_id) references user_tbl(user_id)
);