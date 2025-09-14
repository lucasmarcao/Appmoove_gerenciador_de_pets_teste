package appmoove_BackEnd.DAOs;

import appmoove_BackEnd.Entidade.Pets;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class PetsSpecification {

    public static Specification<Pets> withFilters(
            String name,
            String species,
            String breed,
            String shelterCity,
            String status) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")),
                        "%" + name.toLowerCase() + "%"));
            }

            if (species != null && !species.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("species"), species));
            }

            if (breed != null && !breed.isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("breed")),
                        "%" + breed.toLowerCase() + "%"));
            }

            if (shelterCity != null && !shelterCity.isEmpty()) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("shelterCity")),
                        "%" + shelterCity.toLowerCase() + "%"));
            }

            if (status != null && !status.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}