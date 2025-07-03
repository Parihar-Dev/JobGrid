import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { Trash2, X } from 'lucide-react';
import ResumeIcon from '../assets/resume-icon-blue.svg';
import api from '../api';
import UploadResume from '../components/uploadResume';

function Resume() {
  const [resumes, setResumes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await api.get('/resumes', {
        headers : {
          Authorization: `Bearer ${token}`
        },
      });
      setResumes(res.data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUploadComplete = async (fileUrl) => {
    if (!title.trim()) {
      alert('Please enter a title before uploading.');
      return;
    }

    try {
      setUploading(true);
      const res = await api.post('/resumes', {
        title,
        filePath: fileUrl,
      });
      setResumes([res.data, ...resumes]);
      setTitle('');
      setShowModal(false);
    } catch (err) {
      console.error('Upload failed:', err.response?.data || err.message);
      alert('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await api.delete(`/resumes/${id}`);
      setResumes(resumes.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  return (
    <div className="bg-[#F1F5F8] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <div className="md:w-3/12 md:block hidden">
          <Sidebar />
        </div>

        <main className="flex-grow p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 font-inter gap-4">
              <h1 className="text-3xl text-gray-800">My Resumes</h1>
              <button
                className="w-40 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(true)}
              >
                + Add Resume
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white rounded-xl shadow p-6 text-center flex flex-col items-center justify-between"
                >
                  <img src={ResumeIcon} className="w-12 mb-3" />
                  <div className="text-lg font-semibold mb-1">{resume.title}</div>
                  <p className="text-sm text-gray-500 mb-3">
                    Added on {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <a
                      href={resume.filePath}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </a>
                    <Trash2
                      className="w-4 h-4 text-gray-600 hover:text-red-500 cursor-pointer"
                      onClick={() => handleDelete(resume.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-xl p-6 w-[95%] max-w-md shadow-2xl animate-modal-pop relative">
            <div className='flex justify-between mb-5 items-center'>
              <h3 className="text-xl font-semibold">Add Resume</h3>
              <X size={24} onClick={() => setShowModal(false)} className='cursor-pointer'/>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Resume Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <UploadResume
                title={title}
                onUploadSuccess={(res) => {
                  setShowModal(false);
                  fetchResumes();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resume;
