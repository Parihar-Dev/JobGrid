import { NavLink } from 'react-router-dom'
import DashboardIcon from '../assets/dashboard.svg'
import JobsIcon from '../assets/jobs-icon.svg'
import ResumeIcon from '../assets/resume-icon.svg'
import LogoutIcon from '../assets/logout-logo.svg'

function Sidebar() {
  const navItems = [
    { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { label: 'Manage Jobs', icon: JobsIcon, path: '/jobs' },
    { label: 'My Resumes', icon: ResumeIcon, path: '/resumes' },
  ];

  const getNavLinkClasses = ({ isActive }) =>
    `flex flex-row items-center gap-3 p-4 cursor-pointer rounded-lg font-inter text-lg transition ${
      isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-800 hover:bg-gray-100'
  }`;

  return (
    <div className="w-full pr-3 bg-white flex flex-col justify-between min-h-screen">
      <div className="mt-4">
        {navItems.map((item, index) => (
          <NavLink to={item.path} key={index} className={getNavLinkClasses}>
            <img src={item.icon} className="w-5 h-5" />
            <h2>{item.label}</h2>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
