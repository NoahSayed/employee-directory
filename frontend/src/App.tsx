import { useEffect, useState } from "react"
import axios from "axios"

type Employee = { id: number; name: string; email: string; role: string; created_at: string }

const api = "http://localhost:5000/employees"
const empty = { name: "", email: "", role: "" }
const perPage = 5

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [error, setError] = useState("")

  const load = () => axios.get(api).then(res => setEmployees(res.data))

  useEffect(() => {
    load()
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editId) await axios.put(`${api}/${editId}`, form)
      else await axios.post(api, form)
      cancel()
      load()
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong")
    }
  }

  const edit = (emp: Employee) => {
    setForm({ name: emp.name, email: emp.email, role: emp.role })
    setEditId(emp.id)
    setError("")
  }

  const cancel = () => {
    setForm(empty)
    setEditId(null)
    setError("")
  }

  const remove = async (id: number) => {
    if (!confirm("Delete this employee?")) return
    await axios.delete(`${api}/${id}`)
    load()
  }

  const text = search.toLowerCase()
  const shown = employees.filter(emp => emp.name.toLowerCase().includes(text) || emp.role.toLowerCase().includes(text))
  const pages = Math.max(1, Math.ceil(shown.length / perPage))
  const list = shown.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="app">
      <h1>Employee Directory</h1>
      <p className="count">{employees.length} employees</p>

      <form onSubmit={save}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
        <button>{editId ? "Update" : "Add"}</button>
        {editId && <button type="button" className="grey" onClick={cancel}>Cancel</button>}
      </form>

      {error && <p className="error">{error}</p>}

      <input placeholder="Search by name or role" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>{new Date(emp.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => edit(emp)}>Edit</button>
                <button className="red" onClick={() => remove(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={5} className="empty">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pages">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>{page} / {pages}</span>
        <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  )
}
