import { useEffect, useState } from 'react';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/campaigns')
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
