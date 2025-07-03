import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import applicationIcon from '../assets/application-icon.svg'
import pendingIcon from '../assets/pending-icon.svg'
import star from '../assets/star.svg'
import fileIcon from '../assets/file-icon.svg'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../api'

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    saved: 0,
    resume: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return navigate('/login')
        
        const [statsRes, chartRes] = await Promise.all([
          api.get('/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}`}
          }),
          api.get('/dashboard/chart', {
            headers: {Authorization: `Bearer ${token}`}
          })
        ])

        setStats(statsRes.data)
        setChartData(chartRes.data)
      } catch (err) {
        console.error(err)
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [navigate])

  if (loading) return <div className="text-center mt-20">Loading...</div>

  const getColorClasses = (color) => {
    const map = {
      blue: 'bg-[#279BF3] text-blue-600',
      green: 'bg-[#57DF8B] text-green-600',
      orange: 'bg-[#F19D37] text-orange-600',
    };
    return map[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-[#F1F5F8] min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-grow">
        <div className='md:w-3/12 md:block hidden'>
          <Sidebar />
        </div>

        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Applications', value: stats.total, color: 'blue', icon: applicationIcon },
                { title: 'Pending Applications', value: stats.pending, color: 'green',icon: pendingIcon },
                { title: 'Saved Jobs', value: stats.saved, color: 'orange', icon: star },
                { title: 'Resume Submitted', value: stats.resume, color: 'blue', icon: fileIcon },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow text-center border-2 border-transparent hover:border-blue-500 transition-all"
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 text-xl ${getColorClasses(
                      card.color
                    )}`}
                  >
                    <img src={card.icon} className='w-8 h-8'/>
                  </div>
                  <div className="text-3xl font-bold">{card.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{card.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-lg font-semibold mb-4">Job Application Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="Applied" stroke="#3b82f6" strokeWidth={2} />
                <Line dataKey="Pending" stroke="#10b981" strokeWidth={2} />
                <Line dataKey="Interview" stroke="#f59e0b" strokeWidth={2} />
                <Line dataKey="Rejected" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
