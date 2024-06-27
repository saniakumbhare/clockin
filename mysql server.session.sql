CREATE TABLE IF NOT EXISTS clockin (
    employee_id INT,
    employee_name VARCHAR(50),
    day DATE,
    clock_in DATETIME,
    clock_out DATETIME,
    total_hours DATETIME
);
SELECT * FROM clockin;