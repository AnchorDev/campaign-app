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
  const [showForm, setShowForm] = useState(false);

  const activeCampaigns = campaigns.filter(campaign => campaign.status);
  const inactiveCampaigns = campaigns.filter(campaign => !campaign.status);

  const [editCampaign, setEditCampaign] = useState(null);

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

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/campaigns/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    }
    ).catch(error => console.error("Error deleting campaign:", error));
  };

  const handleToggleStatus = (campaign) => {
    const updatedCampaign = { ...campaign, status: !campaign.status };
    fetch(`http://localhost:8080/api/campaigns/${campaign.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCampaign)
    })
    .then(response => response.json())
    .then(data => {
      setCampaigns(campaigns.map(c => c.id === data.id ? data : c));
    }
    )
    .catch(error => console.error("Error updating campaign status:", error));
  };

  const handleCancelEdit = () => {
    setEditCampaign(null);
    setNewCampaign({
      name: '',
      keywords: '',
      bidAmount: '',
      campaignFund: '',
      status: true,
      town: '',
      radius: ''
    });
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCampaign({
      ...newCampaign,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEdit = (campaign) => {
    setNewCampaign({
      ...campaign,
      keywords: campaign.keywords.join(', ')
    });
    setEditCampaign(campaign.id);
    setShowForm(true);
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

    const method = editCampaign ? 'PUT' : 'POST';
    const url = editCampaign ? `http://localhost:8080/api/campaigns/${editCampaign}` : "http://localhost:8080/api/campaigns";
    
    setShowForm(false);

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(campaignToSend)
    })
    .then(response => response.json())
    .then(data => {
      if (editCampaign) {
        setCampaigns(campaigns.map(c => (c.id === editCampaign ? data : c)));
      } else {
        setCampaigns([...campaigns, data]);
      }
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
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Create New Campaign'}
      </button>
      {showForm && (
        <div className="form-container">
      <h2>{editCampaign ? 'Edit Campaign' : 'Create Campaign'}</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="text"
          name="name"
          placeholder="Campaign Name"
          value={newCampaign.name}
          onChange={handleChange}
          required
        />
        {selectedKeywords.length > 0 && (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {selectedKeywords.map((keyword) => (
              <li
                key={keyword}
                onClick={() => {
                  const parts = newCampaign.keywords.split(',');
                  parts[parts.length - 1] = keyword;
                  setNewCampaign({
                    ...newCampaign,
                    keywords: parts.join(', ')
                  });
                }}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                {keyword}
              </li>
            ))}
          </ul>
        )}
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
        <button type="submit">
          {editCampaign ? 'Update Campaign' : 'Create Campaign'}
        </button>
      </form>
      {editCampaign && (
        <button type="button" onClick={handleCancelEdit} style={{ marginTop: '10px' }}>
          Cancel Edit
        </button>
      )}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Active Campaigns</h2>
          {activeCampaigns.length > 0 ? (
            <ul>
              {activeCampaigns.map(campaign => (
                <li key={campaign.id}>
                  <strong>{campaign.name}</strong> - {campaign.keywords.join(', ')} - ${campaign.bidAmount} - ${campaign.campaignFund} - {campaign.town} - {campaign.radius}km
                  <button onClick={() => handleToggleStatus(campaign)}>Deactivate</button>
                  <button onClick={() => handleDelete(campaign.id)}>Delete</button>
                  <button onClick={() => handleEdit(campaign)}>Edit</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No active campaigns.</p>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h2>Inactive Campaigns</h2>
          {inactiveCampaigns.length > 0 ? (
            <ul>
              {inactiveCampaigns.map(campaign => (
                <li key={campaign.id}>
                  <strong>{campaign.name}</strong> - {campaign.keywords.join(', ')} - ${campaign.bidAmount} - ${campaign.campaignFund} - {campaign.town} - {campaign.radius}km
                  <button onClick={() => handleToggleStatus(campaign)}>Activate</button>
                  <button onClick={() => handleDelete(campaign.id)}>Delete</button>
                  <button onClick={() => handleEdit(campaign)}>Edit</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No inactive campaigns.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
