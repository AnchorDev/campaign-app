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
        <button onClick={() => onDelete(campaign)}>Delete</button>
        <button
          className={campaign.status ? 'active-btn' : 'inactive-btn'}
          onClick={() => onToggle(campaign)}
        >
          {campaign.status ? 'Deactivate' : 'Activate'}
        </button>
      </div>
    </li>
  );
}

export default CampaignItem;
