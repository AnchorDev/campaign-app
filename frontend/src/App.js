import React, { useEffect, useState} from 'react'
import './App.css';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    keywords: '',
    bidAmount: '',
    campaignFund: '',
    status: true,
    town: '',
    radius: ''
  });
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const predefinedKeywords = ['marketing', 'advertising', 'sales', 'promotion', 'digital', 'social media', 'SEO', 'content marketing'];

  useEffect(() => {
    fetch("http://localhost:8080/api/campaigns")
      .then(response => response.json())
      .then(data => setCampaigns(data))
      .catch(error => console.error("Error fetching campaigns:", error));
  }, []);

  const handleKeywordInput = (e) => {
    const input = e.target.value;
    handleChange(e);
    if(input) {
      const inputParts = input.split(',');
      const lastWord = inputParts[inputParts.length - 1].trim().toLowerCase();
      const filteredKeywords = predefinedKeywords.filter(keyword => keyword.toLowerCase().startsWith(lastWord));
      setSelectedKeywords(filteredKeywords);
    } else {
      setSelectedKeywords([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCampaign({
      ...newCampaign,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const campaignToSend = {
      ...newCampaign,
      keywords: newCampaign.keywords.split(',').map(keyword => keyword.trim()),
      bidAmount: parseFloat(newCampaign.bidAmount),
      campaignFund: parseFloat(newCampaign.campaignFund),
      radius: parseInt(newCampaign.radius)
    };

    fetch("http://localhost:8080/api/campaigns", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(campaignToSend)
    })
    .then(response => response.json())
    .then(data => {
      setCampaigns([...campaigns, data]);
      setNewCampaign({
        name: '',
        keywords: '',
        bidAmount: '',
        campaignFund: '',
        status: true,
        town: '',
        radius: ''
      });
    })
    .catch(error => console.error("Error creating campaign:", error));
  };

  return (
    <div className="App">
      <h1>Campaign Manager</h1>

      <h2>Active Campaigns</h2>
      <ul>
        {campaigns.map(campaign => (
          <li key={campaign.id}>
            <strong>{campaign.name}</strong> - {campaign.town}, {campaign.radius}km
          </li>
        ))}
      </ul>
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Campaign Name"
          value={newCampaign.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="keywords"
          placeholder="Keywords (comma separated)"
          value={newCampaign.keywords}
          onChange={handleKeywordInput}
          required
        />
        <input
          type="number"
          name="bidAmount"
          step="0.01"
          placeholder="Bid Amount"
          value={newCampaign.bidAmount}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="campaignFund"
          step="0.01"
          placeholder="Campaign Fund"
          value={newCampaign.campaignFund}
          onChange={handleChange}
          required
        />
        <select
          name="town"
          value={newCampaign.town}
          onChange={handleChange}
          required
        >
          <option value="">Select a town</option>
          <option value="Krakow">Krakow</option>
          <option value="Warsaw">Warsaw</option>
          <option value="Kielce">Kielce</option>
        </select>
        <input
          type="number"
          name="radius"
          placeholder="Radius (km)"
          value={newCampaign.radius}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="status"
            checked={newCampaign.status}
            onChange={handleChange}
          />
          Active
        </label>
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
}

export default App;
