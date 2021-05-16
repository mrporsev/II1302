package org.jhipster.plantalyzer.repository;

import org.jhipster.plantalyzer.domain.Plantcategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Plantcategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantcategoryRepository extends JpaRepository<Plantcategory, Long> {}
