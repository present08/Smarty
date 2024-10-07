create database smartydb;
use smartydb;

create user`smarty`@`%` identified by '1234'; 
grant all privileges on smartydb.* to `smarty`@`%`;