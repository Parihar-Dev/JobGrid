import { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4 font-inter">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl px-6 py-10 sm:px-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gray-900">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center mb-10 text-sm sm:text-base">
          Got a question, feedback, or partnership inquiry? We'd love to hear from you!
        </p>

        {submitted && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md mb-6 text-sm text-center">
            Your message has been submitted successfully!
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm text-gray-700">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-medium py-2.5 rounded-md transition ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-900'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-8">
          Or reach us directly at{' '}
          <a
            href="mailto:support@jobgrid.com"
            className="text-blue-600 font-medium hover:underline"
          >
            support@jobgrid.com
          </a>
        </p>
      </div>
    </section>
  );
}

export default Contact;
