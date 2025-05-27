import React, { useState, useEffect } from 'react';
import { filterKeywords } from '../utils/keywordUtils';

function CampaignForm({
  predefinedKeywords,
  editCampaign,
  onSubmit,
  onCancel,
  initialData
}) {
  const [formData, setFormData] = useState(initialData);
  const [suggestions, setSuggestions] = useState([]);

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

    if (input.endsWith(',')) setSuggestions([]);
  };

  const handleSuggestionClick = (keyword) => {
    const parts = formData.keywords.split(',');
    parts[parts.length - 1] = keyword;
    const updated = parts.map(part => part.trim()).filter(Boolean).join(', ') + ', ';
    setFormData({ ...formData, keywords: updated });
    setSuggestions([]);
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
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required maxLength={50} />
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleKeywordInput}
            placeholder="Keywords (comma separated)"
            required
          />
          {suggestions.length > 0 && (
            <ul style={{
              position: 'absolute', top: '100%', left: 0,
              backgroundColor: 'white', border: '1px solid #ccc',
              width: '100%', zIndex: 1, listStyle: 'none', padding: 0, margin: 0
            }}>
              {suggestions.map(k => (
                <li key={k} onClick={() => handleSuggestionClick(k)} style={{ padding: '5px', cursor: 'pointer' }}>
                  {k}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input type="number" name="bidAmount" value={formData.bidAmount} onChange={handleChange} placeholder="Bid Amount" required />
        <input type="number" name="campaignFund" value={formData.campaignFund} onChange={handleChange} placeholder="Campaign Fund" required />
        <select name="town" value={formData.town} onChange={handleChange} required>
          <option value="">Select Town</option>
          <option value="Krakow">Krakow</option>
          <option value="Warsaw">Warsaw</option>
          <option value="Kielce">Kielce</option>
          <option value="Gdansk">Gdansk</option>
          <option value="Wroclaw">Wroclaw</option>
        </select>
        <input type="number" name="radius" value={formData.radius} onChange={handleChange} placeholder="Radius" required />
        <label>
          <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
          Active
        </label>
        <button type="submit">{editCampaign ? 'Update' : 'Create'}</button>
      </form>
      {editCampaign && (
        <button onClick={onCancel} style={{ marginTop: '10px' }}>Cancel Edit</button>
      )}
    </div>
  );
}

export default CampaignForm;
