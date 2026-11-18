# Employee Directory

Add, view, edit and delete employees.

**Stack:** React + Vite + TypeScript, Node.js + Express, MySQL

## Features

- Add, edit and delete employees (name, email, role)
- Search by name or role
- Pagination (5 per page)
- Confirm before delete
- Duplicate email and empty field checks

## Run

1. Run `backend/schema.sql` in MySQL
2. Copy `backend/.env.example` to `backend/.env` and set your MySQL password
3. Backend: `cd backend && npm install && npm start` (port 5000)
4. Frontend: `cd frontend && npm install && npm run dev` (port 5173)

## API

| Method | Route | Does |
|---|---|---|
| GET | /employees | List all |
| POST | /employees | Add one |
| PUT | /employees/:id | Update one |
| DELETE | /employees/:id | Delete one |
