import { useEffect, useState } from 'react';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch('https://campaign-app-e8fp.onrender.com/api/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data));
  }, []);

  const deleteCampaign = (id) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  const updateCampaign = (updated) => {
    setCampaigns(prev =>
      prev.map(c => c.id === updated.id ? updated : c)
    );
  };

  return {
    campaigns,
    setCampaigns,
    deleteCampaign,
    updateCampaign
  };
}
