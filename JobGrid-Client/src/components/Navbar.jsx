import { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '../assets/JobGrid_Logo.png' 

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isDashboardPage = pathname.startsWith('/dashboard') || pathname.startsWith('/jobs') || pathname.startsWith('/resumes')

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <nav className={`bg-white shadow-md sticky top-0 z-50 transition-all duration-300 ${isOpen ? 'h-screen' : 'h-auto'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center md:justify-between">

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <Link
          to="/"
          className="flex items-center text-xl font-semibold text-gray-800 ml-auto md:ml-0 md:mr-auto"
        >
          <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
          JobGrid
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-black transition">Home</Link>
          {isAuthenticated && <Link to='/dashboard' className='hover:text-black transition'>Dashboard</Link>}
          {!isAuthenticated && (
            <>
            <Link to="/sign-up" className="px-4 py-1.5 border border-gray-300 rounded-md hover:border-black transition">Sign Up</Link>
            <Link to="/login" className="px-4 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition">Login</Link>
            </>
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className='px-4 py-1.5 border border-gray-300 rounded-md hover:border-red-500 text-red-600 transition'>
                Logout
            </button>
          )}
          
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className='px-6 py-6 flex flex-col gap-4 text-left text-gray-800 font-medium text-base'>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            {isAuthenticated && (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link>
                <Link to="/resumes" onClick={() => setIsOpen(false)}>Resumes</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className='text-left'>Logout</button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/sign-up" onClick={() => setIsOpen(false)}>Sign Up</Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
