import React, { useState } from "react";
import Input from "./Input";
import Message from "./Message";
import { hashPassword } from "../utils/crypto";

export default function SignupForm({ onSignup }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(
      (u) =>
        u.username === form.username ||
        u.email === form.email ||
        u.phone === form.phone
    );

    if (exists) {
      setMessage({ type: "error", text: "User already exists with same username/email/phone!" });
      return;
    }

    const hashedPassword = await hashPassword(form.password);
    const newUser = { ...form, password: hashedPassword };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setMessage({ type: "success", text: "Signup successful! Please log in." });
    setForm({ username: "", email: "", phone: "", address: "", password: "" });
    onSignup();
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="mb-3 text-center">Signup</h2>
      <Message message={message} />
      <form onSubmit={handleSubmit}>
        <Input label="Username" name="username" value={form.username} onChange={handleChange} />
        <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Phone" type="tel" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Address" name="address" value={form.address} onChange={handleChange} />
        <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} />

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Sign Up
        </button>
      </form>
    </div>
  );
}
