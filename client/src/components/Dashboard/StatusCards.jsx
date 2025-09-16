import React from 'react';
import './StatusCards.css';

const StatusCards = () => {
  const stats = [
    { label: 'Pending', value: '0', color: '#000000' },
    { label: 'Queried', value: '0', color: '#000000' },
    { label: 'Approved', value: '0', color: '#000000' },
    { label: 'Completed', value: '0', color: '#000000' },
  ];

  return (
    <div className="status-section">
      <h2 className="section-title">Filing Status Overview</h2>
      <div className="status-cards">
        {stats.map((stat) => (
          <div key={stat.label} className="status-card">
            <div className="status-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="status-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusCards;