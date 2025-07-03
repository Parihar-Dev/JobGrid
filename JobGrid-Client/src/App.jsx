import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ContactUs from './pages/ContactUs'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Resume from './pages/Resume'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact-us' element={<ContactUs />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/jobs' element={<Jobs />}/>
        <Route path='/resumes' element={<Resume />}/>
        <Route path="*" element={<h1 className="text-center text-xl mt-10">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
