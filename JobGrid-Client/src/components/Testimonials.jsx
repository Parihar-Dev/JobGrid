import User1 from '../assets/User1_Image.avif'
import User2 from '../assets/User2_Image.webp'
import User3 from '../assets/User3_Image.jpg'

function Testimonials() {
  const testimonials = [
    {
      profile: User1,
      name: 'Tim Bradford',
      quote:
        'JobGrid made my job hunt 10x easier! I stopped using messy spreadsheets and finally tracked everything in one place.',
    },
    {
      profile: User2,
      name: 'John Nolan',
      quote:
        'Before JobGrid, I missed deadlines and interviews. Now I never miss follow-ups. It’s my daily companion!',
    },
    {
      profile: User3,
      name: 'Lucy Chen',
      quote:
        'I love the dashboard and how organized everything feels. The resume upload and tagging features are a game-changer.',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="font-semibold text-3xl text-left mb-10">Hear From Our Users</h2>

      <div className="flex md:hidden gap-4 overflow-x-auto scroll-smooth px-1 snap-x snap-mandatory">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="min-w-[85%] bg-white p-6 rounded-xl shadow hover:shadow-md transition snap-start"
          >
            <p className="text-gray-700 text-sm italic mb-4">"{t.quote}"</p>
            <div className="flex gap-3 items-center">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={t.profile}
                alt={t.name}
              />
              <p className="text-sm font-medium">{t.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <p className="text-gray-700 text-sm italic mb-6">"{t.quote}"</p>
            <div className="flex gap-3 items-center">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={t.profile}
                alt={t.name}
              />
              <p className="text-sm font-medium">{t.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
