import JobGrid from '../assets/JobGrid_Logo.png'
import facebook from '../social/facebook.svg'
import linkedin from '../social/linkedin.png'
import github from '../social/github.svg'
import youtube from '../social/youtube.svg'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-white text-gray-700 py-10 border-t border-gray-200 font-inter">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-sm">

            <div className="flex flex-col items-start space-y-10">
                <div className="flex items-center space-x-2">
                    <img src={JobGrid} alt="JobGrid logo" className="w-6 h-6" />
                    <span className="text-lg font-semibold">JobGrid</span>
                </div>
                <div className="flex space-x-8 mt-2">
                    <a href="#" aria-label="Facebook">
                    <img src={facebook} alt="Facebook" className="w-5 h-5" />
                    </a>
                    <a href="#" aria-label="LinkedIn">
                    <img src={linkedin} alt="LinkedIn" className="w-5 h-5" />
                    </a>
                    <a href="#" aria-label="YouTube">
                    <img src={youtube} alt="YouTube" className="w-5 h-5" />
                    </a>
                    <a href="#" aria-label="Github">
                    <img src={github} alt="Github" className="w-5 h-5" />
                </a>
            </div>
            </div>

            <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><a href="/#features" className="hover:underline">Features</a></li>
                <li><Link to="/contact-us" className="hover:underline">Contact Us</Link></li>
            </ul>
            </div>

            <div>
            <h4 className="font-semibold mb-2">User Actions</h4>
            <ul className="space-y-2">
                <li><Link to="/sign-up" className="hover:underline">Sign Up</Link></li>
                <li><Link href="/login" className="hover:underline">Log In</Link></li>
            </ul>
            </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-10">
            © {new Date().getFullYear()} JobGrid Inc. All rights reserved.
        </div>
        </footer>
    )
}

export default Footer