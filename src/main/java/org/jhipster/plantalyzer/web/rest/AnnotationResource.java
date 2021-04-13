package org.jhipster.plantalyzer.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.jhipster.plantalyzer.domain.Annotation;
import org.jhipster.plantalyzer.repository.AnnotationRepository;
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
 * REST controller for managing {@link org.jhipster.plantalyzer.domain.Annotation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AnnotationResource {

    private final Logger log = LoggerFactory.getLogger(AnnotationResource.class);

    private static final String ENTITY_NAME = "annotation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnnotationRepository annotationRepository;

    public AnnotationResource(AnnotationRepository annotationRepository) {
        this.annotationRepository = annotationRepository;
    }

    /**
     * {@code POST  /annotations} : Create a new annotation.
     *
     * @param annotation the annotation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new annotation, or with status {@code 400 (Bad Request)} if the annotation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/annotations")
    public ResponseEntity<Annotation> createAnnotation(@Valid @RequestBody Annotation annotation) throws URISyntaxException {
        log.debug("REST request to save Annotation : {}", annotation);
        if (annotation.getId() != null) {
            throw new BadRequestAlertException("A new annotation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Annotation result = annotationRepository.save(annotation);
        return ResponseEntity
            .created(new URI("/api/annotations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /annotations/:id} : Updates an existing annotation.
     *
     * @param id the id of the annotation to save.
     * @param annotation the annotation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated annotation,
     * or with status {@code 400 (Bad Request)} if the annotation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the annotation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/annotations/{id}")
    public ResponseEntity<Annotation> updateAnnotation(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Annotation annotation
    ) throws URISyntaxException {
        log.debug("REST request to update Annotation : {}, {}", id, annotation);
        if (annotation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, annotation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!annotationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Annotation result = annotationRepository.save(annotation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, annotation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /annotations/:id} : Partial updates given fields of an existing annotation, field will ignore if it is null
     *
     * @param id the id of the annotation to save.
     * @param annotation the annotation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated annotation,
     * or with status {@code 400 (Bad Request)} if the annotation is not valid,
     * or with status {@code 404 (Not Found)} if the annotation is not found,
     * or with status {@code 500 (Internal Server Error)} if the annotation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/annotations/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Annotation> partialUpdateAnnotation(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Annotation annotation
    ) throws URISyntaxException {
        log.debug("REST request to partial update Annotation partially : {}, {}", id, annotation);
        if (annotation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, annotation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!annotationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Annotation> result = annotationRepository
            .findById(annotation.getId())
            .map(
                existingAnnotation -> {
                    if (annotation.getSmiley() != null) {
                        existingAnnotation.setSmiley(annotation.getSmiley());
                    }
                    if (annotation.getTextBox() != null) {
                        existingAnnotation.setTextBox(annotation.getTextBox());
                    }
                    if (annotation.getDate() != null) {
                        existingAnnotation.setDate(annotation.getDate());
                    }

                    return existingAnnotation;
                }
            )
            .map(annotationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, annotation.getId().toString())
        );
    }

    /**
     * {@code GET  /annotations} : get all the annotations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of annotations in body.
     */
    @GetMapping("/annotations")
    public List<Annotation> getAllAnnotations() {
        log.debug("REST request to get all Annotations");
        return annotationRepository.findAll();
    }

    /**
     * {@code GET  /annotations/:id} : get the "id" annotation.
     *
     * @param id the id of the annotation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the annotation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/annotations/{id}")
    public ResponseEntity<Annotation> getAnnotation(@PathVariable Long id) {
        log.debug("REST request to get Annotation : {}", id);
        Optional<Annotation> annotation = annotationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(annotation);
    }

    /**
     * {@code DELETE  /annotations/:id} : delete the "id" annotation.
     *
     * @param id the id of the annotation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/annotations/{id}")
    public ResponseEntity<Void> deleteAnnotation(@PathVariable Long id) {
        log.debug("REST request to delete Annotation : {}", id);
        annotationRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
