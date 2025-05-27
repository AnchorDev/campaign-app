import React, { useState } from 'react';
import { useCampaigns } from './hooks/useCampaigns';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import './App.css';

function App() {
  const predefinedKeywords = ['marketing', 'advertising', 'sales', 'promotion', 'digital', 'social media', 'SEO', 'content marketing', 
    'email marketing', 'PPC', 'branding', 'analytics', 'strategy', 'campaign management', 'lead generation', 'influencer marketing',
     'customer engagement', 'target audience', 'market research', 'competitive analysis', 'ROI', 'KPIs', 'A/B testing',
     'customer retention', 'brand awareness', 'content strategy', 'social media marketing', 'search engine marketing', 'display advertising',
     'video marketing', 'mobile marketing', 'event marketing', 'public relations', 'crisis management', 'community management', 'user experience',
      'website optimization', 'landing pages', 'call to action', 'lead nurturing', 'sales funnel', 'customer journey', 'segmentation', 'personalization',
    'automation', 'CRM', 'email campaigns', 'social media ads', 'Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'Twitter Ads', 'YouTube Ads',
    'content creation', 'blogging', 'podcasting', 'webinars', 'infographics', 'eBooks', 'whitepapers', 'case studies', 'testimonials', 'reviews'];

  const { campaigns, setCampaigns, deleteCampaign, updateCampaign } = useCampaigns();
  const [showForm, setShowForm] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);

  const [emeraldBalance, setEmeraldBalance] = useState(1000.00);

  const handleEdit = (campaign) => {
    setEditCampaign(campaign);
    setShowForm(true);
  };

  const handleFormSubmit = (campaignData) => {
    const method = editCampaign ? 'PUT' : 'POST';
    const url = editCampaign
      ? `https://https://campaign-app-production-0136.up.railway.app/api/campaigns/${editCampaign.id}`
      : "https://https://campaign-app-production-0136.up.railway.app/api/campaigns";

    const oldFund = editCampaign?.status ? parseFloat(editCampaign.campaignFund) : 0;
    const newFund = campaignData.status ? parseFloat(campaignData.campaignFund) : 0;

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaignData)
    })
      .then(res => res.json())
      .then(data => {
        if (editCampaign) {
          updateCampaign(data);
          setEmeraldBalance(prev => prev + oldFund - newFund);
        } else {
          setCampaigns(prev => [...prev, data]);
          if (data.status) {
            setEmeraldBalance(prev => prev - newFund);
          }
        }
        setEditCampaign(null);
        setShowForm(false);
      });
  };

  const handleToggleStatus = (campaign) => {
    const toggledStatus = !campaign.status;
    const updated = { ...campaign, status: toggledStatus };

    fetch(`https://campaign-app-production-0136.up.railway.app/api/campaigns/${campaign.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then(res => res.json())
      .then(data => {
        updateCampaign(data);

        const fund = parseFloat(data.campaignFund);
        setEmeraldBalance(prev =>
          toggledStatus ? prev - fund : prev + fund
        );
      });
  };

  const handleDelete = (campaign) => {
  fetch(`https://campaign-app-production-0136.up.railway.app/api/campaigns/${campaign.id}`, {
    method: 'DELETE'
  })
    .then(() => {
      deleteCampaign(campaign.id);
      if (campaign.status) {
        setEmeraldBalance(prev => prev + parseFloat(campaign.campaignFund));
      }
    });
};

  const handleCancel = () => {
    setEditCampaign(null);
    setShowForm(false);
  };

  const active = campaigns.filter(c => c.status);
  const inactive = campaigns.filter(c => !c.status);

  return (
    <div className="App">
      <h1>Campaign Manager</h1>
      <button onClick={() => {
        if (showForm) handleCancel();
        else setShowForm(true);
      }}>
        {showForm ? 'Hide Form' : 'Create New Campaign'}
      </button>

      {showForm && (
        <CampaignForm
          predefinedKeywords={predefinedKeywords}
          editCampaign={editCampaign}
          initialData={editCampaign || {
            name: '', keywords: '', bidAmount: '', campaignFund: '', status: true, town: '', radius: ''
          }}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className='campaign-container'>
        <div className='campaign-column'>
          <h2>Active Campaigns</h2>
          <CampaignList campaigns={active} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggleStatus} />
        </div>
        <div className='campaign-column'>
          <h2>Inactive Campaigns</h2>
          <CampaignList campaigns={inactive} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggleStatus} />
        </div>
      </div>
      <div className='emerald-balance'>
        <p>Emerald Balance: ${emeraldBalance.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default App;
