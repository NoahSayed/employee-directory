const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")

const app = express()
const db = mysql.createPool({ host: "localhost", user: "root", password: process.env.DB_PASSWORD, database: "employees" })

app.use(cors())
app.use(express.json())

const check = (req, res, next) => {
  const { name, email, role } = req.body
  if (!name || !email || !role) return res.status(400).json({ error: "Name, email and role are required" })
  next()
}

app.get("/employees", async (req, res) => {
  const [rows] = await db.query("select * from employees order by id")
  res.json(rows)
})

app.post("/employees", check, async (req, res) => {
  const { name, email, role } = req.body
  try {
    const [result] = await db.query("insert into employees (name, email, role) values (?, ?, ?)", [name, email, role])
    res.json({ id: result.insertId, name, email, role })
  } catch {
    res.status(409).json({ error: "This email already exists" })
  }
})

app.put("/employees/:id", check, async (req, res) => {
  const { name, email, role } = req.body
  try {
    await db.query("update employees set name = ?, email = ?, role = ? where id = ?", [name, email, role, req.params.id])
    res.json({ id: Number(req.params.id), name, email, role })
  } catch {
    res.status(409).json({ error: "This email already exists" })
  }
})

app.delete("/employees/:id", async (req, res) => {
  await db.query("delete from employees where id = ?", [req.params.id])
  res.json({ ok: true })
})

app.listen(5000, () => console.log("api on 5000"))
