package appmoove_BackEnd.DTOs;

import java.math.BigDecimal;
import java.util.UUID;

public class PetsDTO {
    private UUID id;
    private String name;
    private String species;
    private String breed;
    private Integer ageYears;
    private String shelterCity;
    private BigDecimal shelterLat;
    private BigDecimal shelterLng;
    private String status;

    // Getters e Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public Integer getAgeYears() {
        return ageYears;
    }

    public void setAgeYears(Integer ageYears) {
        this.ageYears = ageYears;
    }

    public String getShelterCity() {
        return shelterCity;
    }

    public void setShelterCity(String shelterCity) {
        this.shelterCity = shelterCity;
    }

    public BigDecimal getShelterLat() {
        return shelterLat;
    }

    public void setShelterLat(BigDecimal shelterLat) {
        this.shelterLat = shelterLat;
    }

    public BigDecimal getShelterLng() {
        return shelterLng;
    }

    public void setShelterLng(BigDecimal shelterLng) {
        this.shelterLng = shelterLng;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}