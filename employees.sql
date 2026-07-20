INSERT INTO employee (name,position,join_date,release_date,year_of_experience,salary) VALUES ('Albert','Engineer','2024-01-24',NULL,2.5,50);
UPDATE employee SET salary=85 WHERE position='Engineer';
SELECT SUM(salary) FROM employee WHERE join_date <= '2021-12-31' AND (release_date IS NULL OR release_date >= '2021-01-01');
SELECT * FROM employee ORDER BY year_of_experience DESC LIMIT 3;
SELECT * FROM employee WHERE id IN (SELECT id FROM employee WHERE position='Engineer' AND year_of_experience <=3);