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

  // ✅ Validation function
  const validateForm = () => {
    const { username, email, phone, address, password } = form;

    if (!username.trim()) return "Username is required!";
    if (username.length < 3) return "Username must be at least 3 characters long!";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required!";
    if (!emailRegex.test(email)) return "Invalid email format!";

    const phoneRegex = /^[6-9][0-9]{9}$/;
    if (!phone.trim()) return "Phone number is required!";
    if (!phoneRegex.test(phone)) return "Enter a valid 10-digit phone number starting with 6-9!";


    if (!address.trim()) return "Address is required!";
    if (address.length < 5) return "Address must be at least 5 characters!";

    if (!password.trim()) return "Password is required!";
    if (password.length < 6)
      return "Password must be at least 6 characters long!";
    if (!/[A-Z]/.test(password))
      return "Password must include at least one uppercase letter!";
    if (!/[a-z]/.test(password))
      return "Password must include at least one lowercase letter!";
    if (!/[0-9]/.test(password))
      return "Password must include at least one number!";
    if (!/[!@#$%^&*]/.test(password))
      return "Password must include at least one special character (!@#$%^&*)!";

    return null; // No errors ✅
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Step 1: Validate input fields
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    // ✅ Step 2: Fetch existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Step 3: Check if username, email or phone already exist
    const exists = users.find(
      (u) =>
        u.username.toLowerCase() === form.username.toLowerCase() ||
        u.email.toLowerCase() === form.email.toLowerCase() ||
        u.phone === form.phone
    );

    if (exists) {
      let errorText = "User already exists with ";
      if (exists.username === form.username) errorText += "this username!";
      else if (exists.email === form.email) errorText += "this email!";
      else if (exists.phone === form.phone) errorText += "this phone number!";
      setMessage({ type: "error", text: errorText });
      return;
    }

    // ✅ Step 4: Hash password & save user
    const hashedPassword = await hashPassword(form.password);
    const newUser = { ...form, password: hashedPassword };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    // ✅ Step 5: Success message & reset form
    setMessage({ type: "success", text: "Signup successful! Please log in." });
    setForm({
      username: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    });
    onSignup();
  };


  return (
    <div className="card p-4 shadow-sm">
      <h2 className="mb-3 text-center">Signup</h2>
      <Message message={message} />
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Sign Up
        </button>
      </form>
    </div>
  );
}
