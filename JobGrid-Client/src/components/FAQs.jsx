import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

function FAQs() {
  const faqs = [
    {
      question: "Is JobGrid free to use?",
      answer: "Yes! JobGrid is completely free for individual users. You can track unlimited job applications and manage your job search without a subscription.",
    },
    {
      question: "How secure is my data on JobGrid?",
      answer: "We take security seriously. Your data is encrypted and only accessible to you. We do not share your information with third parties.",
    },
    {
      question: "Can I access JobGrid on mobile devices?",
      answer: "Absolutely! JobGrid works seamlessly on phones, tablets, and desktops — no app download required.",
    },
    {
      question: "Do I need to create an account to use JobGrid?",
      answer: "Yes, creating an account helps you securely save and access your job applications from any device.",
    },
    {
      question: "Can I categorize or tag my job entries?",
      answer: "Yes! You can tag jobs with labels like 'Remote', 'Tech', 'Internship', and filter them easily.",
    },
  ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return(
    <section className='bg-[#F7F7F7] py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='text-3xl font-semibold mb-10'>Frequently Asked Questions</h2>
        <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <div key={index} className='bg-white rounded-xl shadow-sm border border-gray-200 transition duration-300'>
            <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={() => toggleFAQ(index)}>
              <span className="text-lg font-medium text-gray-800">{faq.question}</span>
              <span className="text-gray-500 scale-140">
                {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-40 pb-4" : "max-h-0 py-0"
              }`}
            >
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default FAQs