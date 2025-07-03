import UserJourney from '../assets/User_Journey.png';

function HowItWorks() {
  const steps = [
    {
      title: "Step 1: Create Your Free Account",
      description: "Sign up with your email and start tracking your job search instantly.",
    },
    {
      title: "Step 2: Add Job Applications",
      description: "Enter job details, upload resumes, and select status like Applied or Interview.",
    },
    {
      title: "Step 3: Track & Improve",
      description: "Use filters, dashboards, and notes to manage everything in one place.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 font-inter">
        <h2 className="text-3xl font-semibold mb-4 text-left md:text-left">How It Works</h2>

        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="w-full md:w-1/2">
            {steps.map((step, index) => (
              <div key={index} className="mb-8 pt-2">
                <h3 className="text-xl font-medium pb-2">{step.title}</h3>
                <p className="text-lg font-light text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/2 h-72 md:h-96 overflow-hidden rounded-lg">
            <img
              src={UserJourney}
              alt="User Journey"
              className="w-full h-full object-cover object-center transform transition duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
