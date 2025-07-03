import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Plus, Search, Pencil, Trash2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../api';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-600';
      case 'Interview': return 'bg-green-100 text-green-600';
      case 'Rejected': return 'bg-gray-200 text-gray-600';
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      default: return '';
    }
  };

  return (
    <div className="bg-[#F1F5F8] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <div className="md:w-3/12 hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-grow p-4 sm:p-6 overflow-x-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="w-80 sm:w-full flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <h2 className="text-2xl sm:text-3xl font-inter">Manage Jobs</h2>
              <div
                className="w-30 bg-[#297EFF] px-4 py-2 rounded-lg text-white flex items-center gap-2 cursor-pointer"
                onClick={() => { setShowModal(true); setEditingJob(null); }}
              >
                <Plus size={18} /> Add Job
              </div>
            </div>

            <div className="relative w-80">
              <span className="absolute left-3 top-2.5 text-gray-500">
                <Search size={18} />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Jobs"
                className="w-10/12 pl-10 pr-3 py-2 bg-white border border-[#828282] rounded-lg focus:outline-none"
              />
            </div>

            {loading ? (
              <div className="text-center py-8">Loading jobs...</div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full text-sm text-left font-inter">
                  <thead className="bg-white border-b font-semibold">
                    <tr>
                      <th className="px-4 py-3 whitespace-nowrap">Job Title</th>
                      <th className="px-4 py-3 whitespace-nowrap">Company</th>
                      <th className="px-4 py-3 whitespace-nowrap">Date Applied</th>
                      <th className="px-4 py-3 whitespace-nowrap">Status</th>
                      <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{job.title}</td>
                        <td className="px-4 py-3">{job.company}</td>
                        <td className="px-4 py-3">{job.date?.split('T')[0]}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 flex gap-3">
                          <Pencil
                            className="w-4 h-4 text-gray-600 hover:text-blue-600 cursor-pointer"
                            onClick={() => { setEditingJob(job); setShowModal(true); }}
                          />
                          <Trash2
                            className="w-4 h-4 text-gray-600 hover:text-red-500 cursor-pointer"
                            onClick={async () => {
                              if (window.confirm('Are you sure you want to delete this job?')) {
                                try {
                                  await api.delete(`/jobs/${job.id}`);
                                  setJobs(jobs.filter(j => j.id !== job.id));
                                } catch (err) {
                                  console.error('Delete failed:', err);
                                }
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-[95%] max-w-md p-6 animate-modal-pop relative">
            <div className='flex justify-between items-center mb-5'>
              <h3 className="text-xl font-semibold">
                {editingJob ? 'Edit Job' : 'Add New Job'}
              </h3>
              <X size={24} 
                onClick={() =>{
                  setShowModal(false),
                  setEditingJob(null)
                }} 
                className='cursor-pointer'/>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                const form = e.target;

                const data = {
                  title: form.title.value.trim(),
                  company: form.company.value.trim(),
                  date: new Date(form.date.value),
                  status: form.status.value
                };

                try {
                  if (editingJob) {
                    const res = await api.put(`/jobs/${editingJob.id}`, data);
                    setJobs(jobs.map(j => j.id === res.data.id ? res.data : j));
                  } else {
                    const res = await api.post('/jobs', data);
                    setJobs([res.data, ...jobs]);
                  }
                  setShowModal(false);
                  setEditingJob(null);
                } catch (err) {
                  console.error("Failed to submit job:", err.response?.data || err.message);
                  alert("Error submitting job.");
                } finally {
                  setSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                defaultValue={editingJob?.title || ''}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                defaultValue={editingJob?.company || ''}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="date"
                defaultValue={editingJob?.date?.split('T')[0] || ''}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="status"
                defaultValue={editingJob?.status || 'Applied'}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  {submitting ? 'Saving...' : editingJob ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

export default Jobs;
