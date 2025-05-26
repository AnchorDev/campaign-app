import { useState, useEffect } from 'react';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/campaigns")
      .then(res => res.json())
      .then(setCampaigns)
      .catch(console.error);
  }, []);

  const deleteCampaign = (id) => {
    return fetch(`http://localhost:8080/api/campaigns/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setCampaigns(prev => prev.filter(c => c.id !== id));
    });
  };

  const updateCampaign = (campaign) => {
    return fetch(`http://localhost:8080/api/campaigns/${campaign.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaign),
    })
      .then(res => res.json())
      .then(data => {
        setCampaigns(prev => prev.map(c => c.id === data.id ? data : c));
      });
  };

  return { campaigns, setCampaigns, deleteCampaign, updateCampaign };
};
