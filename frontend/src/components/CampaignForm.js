import React, { useState, useEffect } from 'react';
import { filterKeywords } from '../utils/keywordUtils';
import '../css/CampaignForm.css';

function CampaignForm({
  predefinedKeywords,
  editCampaign,
  onSubmit,
  onCancel,
  initialData
}) {
  const [formData, setFormData] = useState(initialData);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const updatedData = {
      ...initialData,
      keywords: Array.isArray(initialData.keywords)
        ? initialData.keywords.join(', ')
        : initialData.keywords
    };
    setFormData(updatedData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleKeywordInput = (e) => {
    const input = e.target.value;
    handleChange(e);

    const filtered = filterKeywords(input, predefinedKeywords);
    setSuggestions(filtered);
    setShowSuggestions(true);

    if (input.endsWith(',')) setSuggestions([]);
  };

  const handleSuggestionClick = (keyword) => {
    const parts = formData.keywords.split(',');
    parts[parts.length - 1] = keyword;
    const updated = parts.map(part => part.trim()).filter(Boolean).join(', ') + ', ';
    setFormData({ ...formData, keywords: updated });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const keywordsArray = formData.keywords
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);

    if (keywordsArray.length > 4) return alert("Max 4 keywords.");
    if (keywordsArray.some(k => k.length > 20)) return alert("Keywords max 20 chars.");

    const payload = {
      ...formData,
      keywords: keywordsArray,
      bidAmount: parseFloat(formData.bidAmount),
      campaignFund: parseFloat(formData.campaignFund),
      radius: parseInt(formData.radius)
    };

    onSubmit(payload);
  };

  return (
    <div className="form-container">
      <h2>{editCampaign ? 'Edit Campaign' : 'Create Campaign'}</h2>
      <form onSubmit={handleSubmit} className="campaign-form">
        <div className="form-row">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required maxLength={50} />
          <input type="number" name="bidAmount" value={formData.bidAmount} onChange={handleChange} placeholder="Bid Amount" min="1" required />
          <input type="number" name="campaignFund" value={formData.campaignFund} onChange={handleChange} placeholder="Campaign Fund" min="1" required />
          <input type="number" name="radius" value={formData.radius} onChange={handleChange} placeholder="Radius" required />
        </div>

        <div className="form-row">
          <div className="typeahead-wrapper">
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleKeywordInput}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              placeholder="Keywords (comma separated)"
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="typeahead-dropdown">
                {suggestions.map((k, i) => (
                  <li key={i} onMouseDown={() => handleSuggestionClick(k)}>{k}</li>
                ))}
              </ul>
            )}
          </div>

          <select name="town" value={formData.town} onChange={handleChange} required>
            <option value="">Select Town</option>
            <option value="Krakow">Krakow</option>
            <option value="Warsaw">Warsaw</option>
            <option value="Kielce">Kielce</option>
            <option value="Gdansk">Gdansk</option>
            <option value="Wroclaw">Wroclaw</option>
          </select>

          <button
            type="button"
            className={`status-toggle ${formData.status ? 'active' : 'inactive'}`}
            onClick={() => setFormData(prev => ({ ...prev, status: !prev.status }))}
          >
            {formData.status ? 'Active' : 'Inactive'}
          </button>
        </div>

        <div className="form-actions">
          <button type="submit">{editCampaign ? 'Update' : 'Create'}</button>
          {editCampaign && <button type="button" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

export default CampaignForm;
