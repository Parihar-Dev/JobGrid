import { Eye, EyeOff } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match")
      return 
    }

    try {
      const res = await api.post('/auth/register', {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        provider: 'local',
        providerId: null
      })
      alert("Registered successfully. Please Login.")
      navigate('/login')
    } catch(err) {
        setError(err.response?.data?.error || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F5F8] flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Create Your Free Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="relative">
              <input
                type={show1 ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                onClick={() => setShow1(!show1)}
              >
                {show1 ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="relative">
              <input
                type={show2 ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                onClick={() => setShow2(!show2)}
              >
                {show2 ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
            >
              Continue
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;
