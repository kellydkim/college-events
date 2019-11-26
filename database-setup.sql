CREATE DATABASE college_events;

USE college_events;

CREATE USER 'springuser' @'%' IDENTIFIED BY 'password';

GRANT ALL ON college_events.* TO 'springuser' @'%';