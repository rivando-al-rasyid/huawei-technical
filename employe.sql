INSERT INTO employees (
    name,
    position,
    join_date,
    release_date,
    years_of_experience,
    salary
)
VALUES (
    'Albert',
    'Engineer',
    '2024-01-24',
    NULL,
    2.5,
    50
);

UPDATE employees
SET salary = 85
WHERE Position = 'Engineer';

SELECT Sum(salary) from employees
WHERE YEAR(JoinDate) <= 2021
  AND (ReleaseDate IS NULL OR YEAR(ReleaseDate) >= 2021);

SELECT TOP 3
    Name,
    Position,
    YearOfExperience,
    Salary
FROM Employee
ORDER BY YearOfExperience DESC;


SELECT Name,
    Position,
    YearOfExperience,
    Salary
FROM Employee
WHERE EmployeeID IN (
    SELECT EmployeeID
    FROM Employee
    WHERE Position = 'Engineer'
      AND YearOfExperience <= 3
);