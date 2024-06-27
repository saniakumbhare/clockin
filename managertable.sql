DROP TABLE IF EXISTS clockin;

CREATE TABLE clockin(
   employee_id INT,
   employee_name VARCHAR(50),
   day DATE,
   clock_in DATETIME,
   clock_out DATETIME,
   total_hours TIME
);

DESCRIBE clockin;
SELECT * FROM clockin;
