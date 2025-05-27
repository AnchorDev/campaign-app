package com.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;

@Entity
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Campaign name is required")
    @Size(max = 50, message = "Campaign name must be max 50 characters")
    @Column(nullable = false)
    private String name;

    @Size(min = 1, max = 4, message = "You must provide between 1 and 4 keywords")
    @ElementCollection
    private List<@Size(max = 20, message = "Keyword must be max 20 characters") String> keywords;

    @NotNull(message = "Bid amount is required")
    @DecimalMin(value = "1.0", message = "Bid amount must be at least 1.0")
    @Column(nullable = false)
    private Double bidAmount;

    @NotNull(message = "Campaign fund is required")
    @DecimalMin(value = "1.0", message = "Campaign fund must be at least 1.0")
    @Column(nullable = false)
    private Double campaignFund;

    @NotNull(message = "Status is required")
    @Column(nullable = false)
    private Boolean status;

    @NotNull(message = "Town is required")
    @Column(nullable = false)
    private String town;

    @NotNull(message = "Radius is required")
    @Column(nullable = false)
    private Integer radius;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public Double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public Double getCampaignFund() {
        return campaignFund;
    }

    public void setCampaignFund(Double campaignFund) {
        this.campaignFund = campaignFund;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public Integer getRadius() {
        return radius;
    }

    public void setRadius(Integer radius) {
        this.radius = radius;
    }
}
