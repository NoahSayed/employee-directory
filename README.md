# Employee Directory

Add, view, edit and delete employees.

**Stack:** React + Vite + TypeScript, Node.js + Express, MySQL

## Features

- Add, edit and delete employees (name, email, role)
- Search by name or role (Search button)
- Pagination (5 per page)
- Confirm before delete
- Duplicate email and empty field checks

## How to start it

You need Node.js and MySQL on your machine.

**1. Set up the database**

Open MySQL (Workbench or the terminal) and run `backend/schema.sql`. It creates the `employees` database and table.

**2. Add your MySQL password**

Copy `backend/.env.example` to `backend/.env` and put your password in it:

```
DB_PASSWORD=your_mysql_password
```

**3. Start the backend**

```
cd backend
npm install
npm start
```

You should see `api on 5000`.

**4. Start the frontend** (in a second terminal)

```
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 and start adding employees.

## API

| Method | Route | Does |
|---|---|---|
| GET | /employees | List all |
| POST | /employees | Add one |
| PUT | /employees/:id | Update one |
| DELETE | /employees/:id | Delete one |
