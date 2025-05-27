import { useEffect, useState } from 'react';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data));
  }, []);

  const deleteCampaign = (id) => {
    fetch(`http://localhost:8080/api/campaigns/${id}`, { method: 'DELETE' })
      .then(() => setCampaigns(prev => prev.filter(c => c.id !== id)));
  };

  const updateCampaign = (updated) => {
    fetch(`http://localhost:8080/api/campaigns/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then(res => res.json())
      .then(data => {
        setCampaigns(prev =>
          prev.map(c => c.id === data.id ? data : c)
        );
      });
  };

  return {
    campaigns,
    setCampaigns,
    deleteCampaign,
    updateCampaign
  };
}
