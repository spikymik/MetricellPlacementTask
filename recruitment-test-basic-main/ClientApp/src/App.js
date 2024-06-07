import React, { useState, useEffect } from 'react';

export default function () {

    const [employees, setEmployees] = useState([]);

        useEffect(() => {        
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const data = await getEmployees();
        setEmployees(data);
    };
    
    async function getEmployees() {
        return fetch("/employees").then(response => response.json());
    }

    async function createEmployee(name, value) {
        await fetch("/employees", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });

        await fetchEmployees();
    }

    async function updateEmployee(name, value) {
        await fetch("/employees", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, value: value })
        });

        await fetchEmployees();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const value = event.target.value.value;

        createEmployee(name, value);

        event.target.reset();

    }

    const handleEdit = (name, value) => {
        updateEmployee(name, value);
    }

   

    return (
        <div>

        <h1>Employees</h1>
        <form onSubmit={handleSubmit}>
            <input
                type = "text"
                placeholder = "Employee name"
                name = "name"
            />
            <input
                type = "number"
                placeholder = "Employee number"
                name = "value"
            />
            <button type="submit">Add employee</button>
        </form>
        <ul>
            {employees.map((employee, index) => (
                <li key={index}>
                    {employee.name} : {employee.value}
                    <button onClick={() => handleEdit(employee.name, employee.value)}>Edit</button>
                </li>
            ))}
        </ul>


        </div>
    );

}