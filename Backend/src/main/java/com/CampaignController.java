package com;

import com.model.Campaign;
import com.repository.CampaignRepository;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {
    private final CampaignRepository campaignRepository;

    public CampaignController(CampaignRepository campaignRepository){
        this.campaignRepository = campaignRepository;
    }

    @GetMapping
    public List<Campaign> getAllCampaigns(){
        return campaignRepository.findAll();
    }

    @PostMapping
    public Campaign createCampaign(@Valid @RequestBody Campaign campaign){
        return campaignRepository.save(campaign);
    }

    @PutMapping("/{id}")
    public Campaign updateCampaign(@PathVariable Long id,@Valid @RequestBody Campaign campaign){
        campaign.setId(id);
        return campaignRepository.save(campaign);
    }

    @DeleteMapping("/{id}")
    public void deleteCampaign(@PathVariable Long id){
        campaignRepository.deleteById(id);
    }

}
