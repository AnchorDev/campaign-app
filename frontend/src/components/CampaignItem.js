import React from 'react';

function CampaignItem({ campaign, onEdit, onDelete, onToggle }) {
  return (
    <li>
      <strong>{campaign.name}</strong> - {campaign.keywords.join(', ')} - ${campaign.bidAmount} - ${campaign.campaignFund} - {campaign.town} - {campaign.radius}km
      <button onClick={() => onToggle(campaign)}>{campaign.status ? 'Deactivate' : 'Activate'}</button>
      <button onClick={() => onDelete(campaign.id)}>Delete</button>
      <button onClick={() => onEdit(campaign)}>Edit</button>
    </li>
  );
}

export default CampaignItem;
