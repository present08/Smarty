create database smarty2db;
use smarty2db;

create user`smarty2`@`%` identified by '1234';
grant all privileges on smarty2db.* to `smarty2`@`%`;