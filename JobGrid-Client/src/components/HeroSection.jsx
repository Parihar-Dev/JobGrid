import HeroImg from '../assets/Hero_Image.png'
import { Link } from 'react-router-dom'

function HeroSection() {
	return (
		<section className="bg-[#F1F5F8] py-16 px-4">
		<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">

			<div className="w-full md:w-1/2 text-center md:text-left px-4">
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
					Stay Organized. <br /> Land More Interviews.
				</h1>
				<p className="mt-6 text-lg text-gray-600">
					JobGrid helps you track every job application with clarity —
					from “Applied” to “Offer.” Say goodbye to messy spreadsheets.
				</p>
				<div className="mt-8">
					<Link
					to="/sign-up"
					className="inline-block bg-[#297EFF] text-white px-8 py-4 text-base md:text-lg font-medium rounded-lg hover:bg-blue-600 transition"
					>
						Get Started
				</Link>
				</div>
			</div>

			<div className="w-full md:w-1/2">
				<img
				src={HeroImg}
				alt="JobGrid dashboard illustration"
				className="w-full h-auto object-contain"
				/>
			</div>
		</div>
		</section>
	)
}

export default HeroSection
