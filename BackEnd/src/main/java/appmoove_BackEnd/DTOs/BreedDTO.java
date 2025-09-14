package appmoove_BackEnd.DTOs;

public class BreedDTO {
    private String name;
    private String origin;
    private String life_span;
    private String temperament;
    private String image_url;

    // Construtor
    public BreedDTO(String name, String origin, String life_span, String temperament, String image_url) {
        this.name = name;
        this.origin = origin;
        this.life_span = life_span;
        this.temperament = temperament;
        this.image_url = image_url;
    }

    // Getters e Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getlife_span() {
        return life_span;
    }

    public void setlife_span(String life_span) {
        this.life_span = life_span;
    }

    public String getTemperament() {
        return temperament;
    }

    public void setTemperament(String temperament) {
        this.temperament = temperament;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}