import React, { useState } from 'react';
import { ArrowLeft, Calendar, Upload, X, Search } from 'lucide-react';
import './AddNewFiling.css';

const AddNewFiling = ({ onBack }) => {
  const [showDivisionModal, setShowDivisionModal] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [formData, setFormData] = useState({
    appealTitle: '',
    lowerCourtName: '',
    caseNumber: '',
    date: '01/07/2025',
    noticeOfAppeal: ''
  });

  const divisions = [
    'Abuja',
    'Lagos', 
    'Port-Harcourt',
    'Benin',
    'Oyo',
    'Plateau',
    'Ogun',
    'Kwara',
    'Warri'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDivisionSelect = (division) => {
    setSelectedDivision(division);
    setShowDivisionModal(false);
  };

  return (
    <div className="add-new-filing">
      <div className="filing-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft className="back-icon" />
          Add New Filing
        </button>
        <p className="filing-subtitle">Submit your Notice of Appeal and all required documents for a new appeal to the Court of Appeal.</p>
      </div>

      <div className="filing-form">
        <div className="form-section">
          <div className="section-header">
            <div className="section-icon case-details-icon">
              <span>📋</span>
            </div>
            <h3 className="section-title">CASE DETAILS</h3>
            <div className="appeal-notice">
              <span className="warning-icon">⚠️</span>
              <span>Appeal Number will be created after submission</span>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Appeal Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. John Okafor v. The State"
                value={formData.appealTitle}
                onChange={(e) => handleInputChange('appealTitle', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lower Court Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. High Court of Abuja"
                value={formData.lowerCourtName}
                onChange={(e) => handleInputChange('lowerCourtName', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Case Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="Lower Court Case Number e.g. ID/142C/2025"
                value={formData.caseNumber}
                onChange={(e) => handleInputChange('caseNumber', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <div className="date-input-wrapper">
                <input
                  type="text"
                  className="form-input"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
                <Calendar className="calendar-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <div className="section-icon upload-icon">
              <Upload />
            </div>
            <h3 className="section-title">UPLOAD REQUIRED DOCUMENTS</h3>
          </div>

          <div className="form-group">
            <label className="form-label">Notice of Appeal</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. High Court of Abuja"
              value={formData.noticeOfAppeal}
              onChange={(e) => handleInputChange('noticeOfAppeal', e.target.value)}
            />
          </div>
        </div>
      </div>

      {showDivisionModal && (
        <div className="modal-overlay">
          <div className="division-modal">
            <div className="modal-header">
              <h3 className="modal-title">Select Judicial Division</h3>
              <button 
                className="close-button"
                onClick={() => setShowDivisionModal(false)}
              >
                <X className="close-icon" />
              </button>
            </div>
            
            <p className="modal-subtitle">Choose the division where the lower court delivered judgment.</p>
            
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Division"
                className="division-search"
              />
            </div>

            <div className="divisions-list">
              {divisions.map((division) => (
                <label key={division} className="division-option">
                  <input
                    type="radio"
                    name="division"
                    value={division}
                    checked={selectedDivision === division}
                    onChange={() => setSelectedDivision(division)}
                  />
                  <span className="division-name">{division}</span>
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <button 
                className="btn-primary modal-btn"
                onClick={() => handleDivisionSelect(selectedDivision)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewFiling;