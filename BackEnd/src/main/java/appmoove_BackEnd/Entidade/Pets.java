package appmoove_BackEnd.Entidade;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "pets")
public class Pets {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 3)
    private String species; // 'dog' or 'cat'

    @Column(nullable = false, length = 100)
    private String breed;

    @Column(name = "age_years", nullable = false)
    private Integer ageYears;

    @Column(name = "shelter_city", nullable = false, length = 100)
    private String shelterCity;

    @Column(name = "shelter_lat", nullable = false, precision = 10, scale = 7)
    private BigDecimal shelterLat;

    @Column(name = "shelter_lng", nullable = false, precision = 10, scale = 7)
    private BigDecimal shelterLng;

    @Column(nullable = false, length = 10)
    private String status = "available"; // 'available' or 'adopted'

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        if (this.id == null) {
            this.id = UUID.randomUUID();
        }
    }

    public Pets() {
        // Construtor vazio necessário para o Hibernate
    }

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

    public Instant getCreatedAt() {
        return createdAt;
    }
}