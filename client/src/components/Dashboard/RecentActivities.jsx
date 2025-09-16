import React from 'react';
import { Activity } from 'lucide-react';
import './RecentActivities.css';

const RecentActivities = () => {
  return (
    <div className="recent-activities">
      <h2 className="section-title">Recent Activities</h2>
      <div className="empty-state">
        <div className="empty-icon">
          <Activity />
        </div>
        <p className="empty-message">No activity</p>
      </div>
    </div>
  );
};

export default RecentActivities;