import React from 'react';
import { Plus, FileText } from 'lucide-react';
import './PendingDrafts.css';

const PendingDrafts = ({ onStartNewFiling }) => {
  return (
    <div className="pending-drafts">
      <h2 className="section-title">Pending Drafts</h2>
      <div className="empty-state">
        <div className="empty-icon">
          <FileText />
        </div>
        <button className="start-filing-btn" onClick={onStartNewFiling}>
          <Plus className="plus-icon" />
          Start New Filing
        </button>
      </div>
    </div>
  );
};

export default PendingDrafts;