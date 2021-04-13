package org.jhipster.plantalyzer.repository;

import java.util.List;
import org.jhipster.plantalyzer.domain.Sensor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Sensor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {
    @Query("select sensor from Sensor sensor where sensor.user.login = ?#{principal.username}")
    List<Sensor> findByUserIsCurrentUser();
}
