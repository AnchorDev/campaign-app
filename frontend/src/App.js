import React, { useState } from 'react';
import { useCampaigns } from './hooks/useCampaigns';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import './App.css';

function App() {
  const predefinedKeywords = ['marketing', 'advertising', 'sales', 'promotion', 'digital', 'social media', 'SEO', 'content marketing', 
    'email marketing', 'PPC', 'branding', 'analytics', 'strategy', 'campaign management', 'lead generation', 'conversion optimization', 'influencer marketing',
     'customer engagement', 'target audience', 'market research', 'competitive analysis', 'ROI', 'KPIs', 'A/B testing',
    'customer acquisition', 'customer retention', 'brand awareness', 'content strategy', 'social media marketing', 'search engine marketing', 'display advertising',
     'video marketing', 'mobile marketing', 'event marketing', 'public relations', 'crisis management', 'reputation management', 'community management', 'user experience',
      'website optimization', 'landing pages', 'call to action', 'lead nurturing', 'sales funnel', 'customer journey', 'segmentation', 'personalization',
    'automation', 'CRM', 'email campaigns', 'social media ads', 'Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'Twitter Ads', 'YouTube Ads',
    'content creation', 'blogging', 'podcasting', 'webinars', 'infographics', 'eBooks', 'whitepapers', 'case studies', 'testimonials', 'reviews'];

  const { campaigns, setCampaigns, deleteCampaign, updateCampaign } = useCampaigns();
  const [showForm, setShowForm] = useState(false);
  const [editCampaign, setEditCampaign] = useState(null);

  const handleEdit = (campaign) => {
    setEditCampaign(campaign);
    setShowForm(true);
  };

  const handleFormSubmit = (campaignData) => {
    const method = editCampaign ? 'PUT' : 'POST';
    const url = editCampaign
      ? `http://localhost:8080/api/campaigns/${editCampaign.id}`
      : "http://localhost:8080/api/campaigns";

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaignData)
    })
      .then(res => res.json())
      .then(data => {
        if (editCampaign) {
          updateCampaign(data);
        } else {
          setCampaigns(prev => [...prev, data]);
        }
        setEditCampaign(null);
        setShowForm(false);
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

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div>
          <h2>Active Campaigns</h2>
          <CampaignList campaigns={active} onEdit={handleEdit} onDelete={deleteCampaign} onToggle={updateCampaign} />
        </div>
        <div>
          <h2>Inactive Campaigns</h2>
          <CampaignList campaigns={inactive} onEdit={handleEdit} onDelete={deleteCampaign} onToggle={updateCampaign} />
        </div>
      </div>
    </div>
  );
}

export default App;
