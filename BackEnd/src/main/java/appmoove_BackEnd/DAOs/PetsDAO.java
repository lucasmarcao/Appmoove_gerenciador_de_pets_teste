package appmoove_BackEnd.DAOs;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import appmoove_BackEnd.Entidade.Pets;
import java.util.UUID;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PetsDAO extends JpaRepository<Pets, UUID>, JpaSpecificationExecutor<Pets> {
    List<Pets> findByStatus(String status);

    List<Pets> findBySpecies(String species);

    List<Pets> findByShelterCity(String shelterCity);

    // Novo método para busca com filtros e paginação
    Page<Pets> findAll(Specification<Pets> spec, Pageable pageable);
}