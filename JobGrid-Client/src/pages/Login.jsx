import { Eye, EyeOff } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from "react";
import api from '../api'
import { useNavigate } from 'react-router-dom'
 
function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (form.password !== '') {
      try {
        const res = await api.post('/auth/login', {
          email: form.email,
          password: form.password
        })
        localStorage.setItem('token', res.data.token)
        alert("Login Successful")
        navigate('/dashboard')
      } catch (err) {
        setError(err.response?.data?.error || "Login failed")
      } finally {
        setLoading(false)
      }
    } else {
      setError("Please enter all fields")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1F5F8] flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-sm text-red-500">{error}</p>}
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
                type={show ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="text-right text-sm">
              <a href="/sign-up" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-sm font-medium transition cursor-pointer ${loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800 text-white'}`}
            >
              {loading ? 'Logging in...' : 'Continue'}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-500">
            Don’t have an account?{" "}
            <a href="/sign-up" className="text-blue-600 font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
