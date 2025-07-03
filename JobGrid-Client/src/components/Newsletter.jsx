function Newsletter() {
  return (
    <section className="bg-[#F7F7F7] py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0 px-4">

        <h2 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left leading-snug">
          Subscribe to our newsletter <br className="hidden sm:block" /> for updates
        </h2>

        <form className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newsletter
