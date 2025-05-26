import React from 'react';
import CampaignItem from './CampaignItem';

function CampaignList({ campaigns, onEdit, onDelete, onToggle }) {
  if (campaigns.length === 0) return <p>No campaigns.</p>;

  return (
    <ul>
      {campaigns.map(c => (
        <CampaignItem
          key={c.id}
          campaign={c}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default CampaignList;
