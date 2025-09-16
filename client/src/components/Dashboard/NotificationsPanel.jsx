import React from 'react';
import { Bell } from 'lucide-react';
import './NotificationsPanel.css';

const NotificationsPanel = () => {
  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <Bell className="bell-icon" />
        <span>Notifications</span>
      </div>
      <div className="notifications-content">
        <div className="empty-state">
          <div className="empty-icon">
            <Bell />
          </div>
          <p className="empty-message">No Notification</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;