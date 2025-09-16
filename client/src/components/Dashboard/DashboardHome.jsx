import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar';
import Header from '../Dashboard/Header';
import StatusCards from '../Dashboard/StatusCards';
import PendingDrafts from '../Dashboard/PendingDrafts';
import RecentActivities from '../Dashboard/RecentActivities';
import NotificationsPanel from '../Dashboard/NotificationsPanel';
import FilingsPage from '../Dashboard/FilingsPage';
import AddNewFiling from '../Dashboard/AddNewFiling';
import '../Dashboard/DashboardHome.css';


function DashboardHome() {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Filings':
        return <FilingsPage onStartNewFiling={() => setActiveMenuItem('AddNewFiling')} />;
      case 'AddNewFiling':
        return <AddNewFiling onBack={() => setActiveMenuItem('Filings')} />;
      default:
        return (
          <div className="dashboard-content">
            <div className="content-wrapper">
              <StatusCards />
              <div className="dashboard-sections">
                <PendingDrafts onStartNewFiling={() => setActiveMenuItem('AddNewFiling')} />
                <RecentActivities />
              </div>
            </div>
            <NotificationsPanel />
          </div>
        );
    }
  };

  return (
    <div className="app">
      <Sidebar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
      <div className="main-content">
        <Header onStartNewFiling={() => setActiveMenuItem('AddNewFiling')} />
        {renderContent()}
      </div>
    </div>
  );
}

export default DashboardHome;