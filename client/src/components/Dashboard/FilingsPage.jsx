import React from 'react';
import { Search, MapPin, Filter, Plus, FileText } from 'lucide-react';
import './FilingsPage.css';

const FilingsPage = ({ onStartNewFiling }) => {
  return (
    <div className="filings-page">
      <div className="filings-header">
        <div className="filings-title-section">
          <h1 className="filings-title">My filings</h1>
          <p className="filings-subtitle">Help you track all filings, review their progress, respond to queries, and download or serve documents.</p>
        </div>
        <button className="btn-primary" onClick={onStartNewFiling}>
          Start New Filing
        </button>
      </div>

      <div className="filings-controls">
        <div className="search-section">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="By Appeal or Motion Number (e.g. CA/LAG/00234)"
              className="search-input"
            />
          </div>
        </div>
        
        <div className="filter-section">
          <div className="filter-dropdown">
            <MapPin className="filter-icon" />
            <select className="filter-select">
              <option>Division</option>
              <option>Abuja</option>
              <option>Lagos</option>
              <option>Port-Harcourt</option>
            </select>
          </div>
          
          <div className="filter-dropdown">
            <Filter className="filter-icon" />
            <select className="filter-select">
              <option>Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Queried</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="filings-table">
        <div className="table-header">
          <div className="table-cell">Motion #</div>
          <div className="table-cell">Filing Type</div>
          <div className="table-cell">Division</div>
          <div className="table-cell">Date Submitted</div>
          <div className="table-cell">Status</div>
          <div className="table-cell">Action</div>
        </div>
        
        <div className="empty-filings">
          <div className="empty-filings-icon">
            <div className="filing-box">
              <img src="./src/components/Dashboard/img/files.svg" alt="files" />
            </div>
          </div>
          <p className="empty-filings-message">No appeal or motion filed</p>
          <button className="new-filing-link" onClick={onStartNewFiling}>
            <Plus className="plus-icon" />
            New Filing
          </button>
        </div>
      </div>

      <div className="pagination">
        <button className="pagination-btn" disabled>Previous</button>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default FilingsPage;