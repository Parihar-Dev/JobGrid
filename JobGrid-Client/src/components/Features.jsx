import Feature_1 from '../assets/Feature_1.png'
import Feature_2 from '../assets/Feature_2.png'
import Feature_3 from '../assets/Feature_3.png'

function Features() {
  const features = [
    {
      icon: Feature_1,
      title: 'Application Tracker with Status Updates',
      description:
        'Track each job through stages like Applied, Interview, Offer, and Rejected — all in one place.',
    },
    {
      icon: Feature_2,
      title: 'Resume Upload & Notes',
      description:
        'Attach resumes, cover letters, and personal notes to each application — no more scattered files.',
    },
    {
      icon: Feature_3,
      title: 'Secure & Private',
      description:
        'Your data is encrypted and accessible only to you — privacy-first by design.',
    },
  ]

  return (
    <section id="features" className="bg-[#F7F7F7] py-12 px-4">
      <div className="max-w-7xl mx-auto font-inter px-4">
        <h2 className="text-3xl sm:text-3xl font-semibold text-left text-gray-900 mb-12">
          Why JobGrid ?
        </h2>

        <div className="flex md:hidden gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-1">
          {features.map((feature, index) => (
            <div
              key={index}
              className="min-w-[85%] bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <div className="mb-4 w-full h-40 overflow-hidden rounded-lg">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden md:grid grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300"
            >
              <div className="mb-4 w-full h-40 overflow-hidden rounded-lg">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
