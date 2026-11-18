create database if not exists employees;
use employees;

create table employees (
  id int auto_increment primary key,
  name varchar(100) not null,
  email varchar(100) not null unique,
  role varchar(100) not null,
  created_at timestamp default current_timestamp
);
