CREATE TABLE employees (
id SERIAL PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
employee_id INTEGER,
employee_job VARCHAR(50) NOT NULL,
employee_salary INTEGER);

INSERT INTO employees (first_name, last_name, employee_id, employee_job, employee_salary)
VALUES ('Stella', 'Skater', 12345, 'Powerless House Cat', 200),
('Mitzi', 'Kitty', 34567, 'Senior Powerless House Cat', 300),
('Ozzie', 'Aussie', 23456, 'Guard Dog', 500);

SELECT * FROM employees;

SELECT SUM (employee_salary)
FROM employees;
