package appmoove_BackEnd.DAOs;

import org.springframework.data.jpa.repository.JpaRepository;
import appmoove_BackEnd.Entidade.Pets;
import java.util.UUID;
import java.util.List;

public interface PetsDAO extends JpaRepository<Pets, UUID> {
    List<Pets> findByStatus(String status);

    List<Pets> findBySpecies(String species);

    List<Pets> findByShelterCity(String shelterCity);
}