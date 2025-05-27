import React from 'react';

function CampaignItem({ campaign, onEdit, onDelete, onToggle }) {
  return (
    <li>
      <div className="campaign-info">
        <strong>{campaign.name}</strong><br />
        Keywords: {campaign.keywords.join(', ')}<br />
        Bid: ${campaign.bidAmount}<br />
        Fund: ${campaign.campaignFund}<br />
        Town: {campaign.town}<br />
        Radius: {campaign.radius} km
      </div>
      <div className="campaign-buttons">
        <button onClick={() => onEdit(campaign)}>Edit</button>
        <button onClick={() => onDelete(campaign.id)}>Delete</button>
        <button onClick={() => onToggle({ ...campaign, status: !campaign.status })}>
          {campaign.status ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </li>
  );
}

export default CampaignItem;
