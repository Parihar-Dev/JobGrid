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

      <div className="flex flex-row items-center gap-3 py-2 px-4 mb-4 cursor-pointer hover:bg-red-100 rounded-lg">
        <img src={LogoutIcon} className="w-5 h-5" />
        <h2 className="font-inter text-lg">Logout</h2>
      </div>
    </div>
  );
}
export default Sidebar;
