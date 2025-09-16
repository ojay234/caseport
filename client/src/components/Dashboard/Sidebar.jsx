import React from 'react';

import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Users, 
  Bell, 
  Settings, 
  HelpCircle,
  MapPin
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeMenuItem, setActiveMenuItem }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Filings', icon: FileText },
    { name: 'Response Queries', icon: MessageSquare },
    { name: 'Clients', icon: Users },
    { name: 'Notifications', icon: Bell },
  ];

  const bottomMenuItems = [
    { name: 'Settings', icon: Settings },
    { name: 'Help/Support', icon: HelpCircle },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
           <img src="./logo.svg" alt="" className="h-20 w-40" /> 
            <img src="./court.svg" alt="" className="h-20 w-40" />
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${activeMenuItem === item.name ? 'active' : ''}`}
            onClick={() => setActiveMenuItem(item.name)}
          >
            <item.icon className="nav-icon" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <nav className="bottom-nav">
          {bottomMenuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activeMenuItem === item.name ? 'active' : ''}`}
              onClick={() => setActiveMenuItem(item.name)}
            >
              <item.icon className="nav-icon" />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="user-section">
          <div className="location">
            <MapPin className="location-icon" />
            <span>Abuja - Shehu Shagari way</span>
          </div>
          <div className="user-info">
            <div className="user-avatar">NT</div>
            <span>Njemanze, Theophilus C...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;