package appmoove_BackEnd.GUI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import appmoove_BackEnd.DAOs.PetsDAO;
import appmoove_BackEnd.DAOs.PetsSpecification;
import appmoove_BackEnd.Entidade.Pets;

import java.util.List;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;

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

    // GET /pets com filtros e paginação
    @GetMapping
    public ResponseEntity<Map<String, Object>> listWithFilters(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String species,
            @RequestParam(required = false) String breed,
            @RequestParam(required = false) String shelter_city,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String order) {

        try {
            // Criar Specification com os filtros
            Specification<Pets> spec = PetsSpecification.withFilters(
                    name, species, breed, shelter_city, status);

            // Criar Pageable com ordenação
            Sort.Direction direction = order.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

            // Executar a consulta
            Page<Pets> petsPage = petsDAO.findAll(spec, pageable);

            // Preparar a resposta
            Map<String, Object> response = new HashMap<>();
            response.put("total", petsPage.getTotalElements());
            response.put("page", petsPage.getNumber());
            response.put("size", petsPage.getSize());
            response.put("content", petsPage.getContent());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erro ao buscar pets: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    // READ BY cidade
    @GetMapping({ "/shelter-city/{shelterCity}", "/shelter-city/{shelterCity}/"
    })
    public List<Pets> listByShelterCity(@PathVariable String shelterCity) {
        return petsDAO.findByShelterCity(shelterCity);
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
