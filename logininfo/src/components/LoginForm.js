import React, { useState } from "react";
import Input from "./Input";
import Message from "./Message";
import { hashPassword } from "../utils/crypto";

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const hashedPassword = await hashPassword(form.password);

    const user = users.find(
      (u) =>
        (u.username === form.identifier ||
          u.email === form.identifier ||
          u.phone === form.identifier) &&
        u.password === hashedPassword
    );

    if (user) {
      setMessage({ type: "success", text: "Login successful!" });
      onLogin(user);
    } else {
      setMessage({ type: "error", text: "Invalid credentials." });
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="mb-3 text-center">Login</h2>
      <Message message={message} />
      <form onSubmit={handleSubmit}>
        <Input
          label="Username / Email / Phone"
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          placeholder="Enter username, email or phone"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-success w-100 mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
