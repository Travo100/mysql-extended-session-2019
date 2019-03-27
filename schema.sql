DROP DATABASE IF EXISTS classroomdb;
CREATE DATABASE classroomdb;
USE classroomdb;

CREATE TABLE students(
	id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    GPA DECIMAL(10, 2) NOT NULL,
    roomNumber INTEGER(4) NOT NULL,
    favSubject VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roomNumber(
	id INT AUTO_INCREMENT,
    number INTEGER(4) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO roomNumber (number) VALUES (308);
INSERT INTO roomNumber (number) VALUES (100);
-- a record into the students table 
INSERT INTO students(name, GPA, roomNumber, favSubject) 
VALUES ("Shannon", 3.8, 308, "art"), ("Jay", 3.6, 308, "math");

INSERT INTO students SET name = "Chardo", GPA = 3.0, roomNumber = 100, favSubject = "history";

-- update the Chardo record GPA from 3.00 to 3.5 
UPDATE students 
SET GPA = 4.0
WHERE id = 3;

SELECT * FROM students;
SELECT * FROM roomNumber;


SELECT students.name, roomNumber.number 
FROM students 
INNER JOIN roomNumber 
ON students.roomNumber = roomNumber.number
WHERE students.roomNumber = 100;
