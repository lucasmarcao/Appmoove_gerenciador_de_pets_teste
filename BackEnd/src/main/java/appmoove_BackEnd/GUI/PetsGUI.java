package appmoove_BackEnd.GUI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import appmoove_BackEnd.DAOs.PetsDAO;
import appmoove_BackEnd.Entidade.Pets;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping({ "/pets", "/pets/", "/pet", "/pet/" })
public class PetsGUI {

    @Autowired
    private PetsDAO petsDAO;

    // CREATE
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Pets pet) {
        try {
            Pets saved = petsDAO.save(pet);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(saved);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar pet: " + e.getMessage());
        }
    }

    /*
     * GET /breeds/:species Integração com TheDogAPI (dog) ou TheCatAPI (cat).
     * por nome. Normalizar a resposta para { name, origin
     * energy_level, image_url } .
     * 
     * https://docs.thedogapi.com/docs/examples/images
     * 
     * https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=gpN
     * -ReBkp
     * 
     * 
     * Search images: dog cachorro
     * curl -H "x-api-key: YOUR-API-KEY"
     * "https://api.thedogapi.com/v1/images/search?limit=2"
     * 
     * 
     * Example of how to filter Images by Breed: cat gato
     * endpoint: ./breeds
     * e.g. https://api.thecatapi.com/v1/images/search?breed_ids={breed.id}
     * 
     * lucas2004marcao@gmail.com
     * App description:
     * Desafio empresa appmoove
     * 
     * Minha API PRO GATO: ->
     * 
     * Minha API PRO CACHORRO: -> Here's your API key:
     * live_kxfKAYcWTviLVSWSPYP6iGcw5ltIbOGfaZfHESPpxK6PalKptTRnmzp6H8zlauxP
     * 
     */

    // READ ALL
    @GetMapping
    public List<Pets> listAll() {
        return petsDAO.findAll();
    }

    // READ BY STATUS
    @GetMapping({ "/status/{status}", "/status/{status}/" })
    public List<Pets> listByStatus(@PathVariable String status) {
        return petsDAO.findByStatus(status);
    }

    // READ BY SPECIES
    @GetMapping({ "/species/{species}", "/species/{species}/" })
    public List<Pets> listBySpecies(@PathVariable String species) {
        return petsDAO.findBySpecies(species);
    }

    // READ ONE
    @GetMapping({ "/{id}", "/{id}/" })
    public ResponseEntity<Pets> getById(@PathVariable UUID id) {
        return petsDAO.findById(id)
                .map(p -> ResponseEntity.ok(p))
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE
    @PutMapping({ "/{id}", "/{id}/" })
    public ResponseEntity<?> update(
            @PathVariable UUID id,
            @RequestBody Pets payload) {
        try {
            return petsDAO.findById(id)
                    .map(existing -> {
                        existing.setName(payload.getName());
                        existing.setSpecies(payload.getSpecies());
                        existing.setBreed(payload.getBreed());
                        existing.setAgeYears(payload.getAgeYears());
                        existing.setShelterCity(payload.getShelterCity());
                        existing.setShelterLat(payload.getShelterLat());
                        existing.setShelterLng(payload.getShelterLng());
                        existing.setStatus(payload.getStatus());

                        Pets updated = petsDAO.save(existing);
                        return ResponseEntity.ok(updated);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar pet: " + e.getMessage());
        }
    }

    // DELETE
    @DeleteMapping({ "/{id}", "/{id}/" })
    public ResponseEntity<String> delete(@PathVariable UUID id) {
        return petsDAO.findById(id)
                .map(p -> {
                    petsDAO.deleteById(id);
                    return ResponseEntity
                            .status(HttpStatus.OK)
                            .body("✅ Pet com ID " + id + " foi removido com sucesso.");
                })
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("⚠️ Pet com ID " + id + " não foi encontrado."));
    }
}