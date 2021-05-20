package org.jhipster.plantalyzer.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.jhipster.plantalyzer.domain.Plantcategory;
import org.jhipster.plantalyzer.repository.PlantcategoryRepository;
import org.jhipster.plantalyzer.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.jhipster.plantalyzer.domain.Plantcategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlantcategoryResource {

    private final Logger log = LoggerFactory.getLogger(PlantcategoryResource.class);

    private static final String ENTITY_NAME = "plantcategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlantcategoryRepository plantcategoryRepository;

    public PlantcategoryResource(PlantcategoryRepository plantcategoryRepository) {
        this.plantcategoryRepository = plantcategoryRepository;
    }

    /**
     * {@code POST  /plantcategories} : Create a new plantcategory.
     *
     * @param plantcategory the plantcategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plantcategory, or with status {@code 400 (Bad Request)} if the plantcategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plantcategories")
    public ResponseEntity<Plantcategory> createPlantcategory(@Valid @RequestBody Plantcategory plantcategory) throws URISyntaxException {
        log.debug("REST request to save Plantcategory : {}", plantcategory);
        if (plantcategory.getId() != null) {
            throw new BadRequestAlertException("A new plantcategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plantcategory result = plantcategoryRepository.save(plantcategory);
        return ResponseEntity
            .created(new URI("/api/plantcategories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plantcategories/:id} : Updates an existing plantcategory.
     *
     * @param id the id of the plantcategory to save.
     * @param plantcategory the plantcategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plantcategory,
     * or with status {@code 400 (Bad Request)} if the plantcategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plantcategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plantcategories/{id}")
    public ResponseEntity<Plantcategory> updatePlantcategory(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Plantcategory plantcategory
    ) throws URISyntaxException {
        log.debug("REST request to update Plantcategory : {}, {}", id, plantcategory);
        if (plantcategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, plantcategory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!plantcategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Plantcategory result = plantcategoryRepository.save(plantcategory);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, plantcategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /plantcategories/:id} : Partial updates given fields of an existing plantcategory, field will ignore if it is null
     *
     * @param id the id of the plantcategory to save.
     * @param plantcategory the plantcategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plantcategory,
     * or with status {@code 400 (Bad Request)} if the plantcategory is not valid,
     * or with status {@code 404 (Not Found)} if the plantcategory is not found,
     * or with status {@code 500 (Internal Server Error)} if the plantcategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/plantcategories/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Plantcategory> partialUpdatePlantcategory(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Plantcategory plantcategory
    ) throws URISyntaxException {
        log.debug("REST request to partial update Plantcategory partially : {}, {}", id, plantcategory);
        if (plantcategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, plantcategory.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!plantcategoryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Plantcategory> result = plantcategoryRepository
            .findById(plantcategory.getId())
            .map(
                existingPlantcategory -> {
                    if (plantcategory.getName() != null) {
                        existingPlantcategory.setName(plantcategory.getName());
                    }
                    if (plantcategory.getDescription() != null) {
                        existingPlantcategory.setDescription(plantcategory.getDescription());
                    }
                    if (plantcategory.getExample() != null) {
                        existingPlantcategory.setExample(plantcategory.getExample());
                    }
                    if (plantcategory.getMoisture_max() != null) {
                        existingPlantcategory.setMoisture_max(plantcategory.getMoisture_max());
                    }
                    if (plantcategory.getMoisture_min() != null) {
                        existingPlantcategory.setMoisture_min(plantcategory.getMoisture_min());
                    }
                    if (plantcategory.getLight_max() != null) {
                        existingPlantcategory.setLight_max(plantcategory.getLight_max());
                    }
                    if (plantcategory.getLight_min() != null) {
                        existingPlantcategory.setLight_min(plantcategory.getLight_min());
                    }
                    if (plantcategory.getHumidity_max() != null) {
                        existingPlantcategory.setHumidity_max(plantcategory.getHumidity_max());
                    }
                    if (plantcategory.getHumidity_min() != null) {
                        existingPlantcategory.setHumidity_min(plantcategory.getHumidity_min());
                    }
                    if (plantcategory.getTemperature_max() != null) {
                        existingPlantcategory.setTemperature_max(plantcategory.getTemperature_max());
                    }
                    if (plantcategory.getTemperature_min() != null) {
                        existingPlantcategory.setTemperature_min(plantcategory.getTemperature_min());
                    }

                    return existingPlantcategory;
                }
            )
            .map(plantcategoryRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, plantcategory.getId().toString())
        );
    }

    /**
     * {@code GET  /plantcategories} : get all the plantcategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plantcategories in body.
     */
    @GetMapping("/plantcategories")
    public List<Plantcategory> getAllPlantcategories() {
        log.debug("REST request to get all Plantcategories");
        return plantcategoryRepository.findAll();
    }

    /**
     * {@code GET  /plantcategories/:id} : get the "id" plantcategory.
     *
     * @param id the id of the plantcategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plantcategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plantcategories/{id}")
    public ResponseEntity<Plantcategory> getPlantcategory(@PathVariable Long id) {
        log.debug("REST request to get Plantcategory : {}", id);
        Optional<Plantcategory> plantcategory = plantcategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plantcategory);
    }

    /**
     * {@code DELETE  /plantcategories/:id} : delete the "id" plantcategory.
     *
     * @param id the id of the plantcategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plantcategories/{id}")
    public ResponseEntity<Void> deletePlantcategory(@PathVariable Long id) {
        log.debug("REST request to delete Plantcategory : {}", id);
        plantcategoryRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
