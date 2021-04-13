package org.jhipster.plantalyzer.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.jhipster.plantalyzer.IntegrationTest;
import org.jhipster.plantalyzer.domain.Annotation;
import org.jhipster.plantalyzer.repository.AnnotationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link AnnotationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AnnotationResourceIT {

    private static final String DEFAULT_SMILEY = "AAAAAAAAAA";
    private static final String UPDATED_SMILEY = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT_BOX = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_BOX = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/annotations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AnnotationRepository annotationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAnnotationMockMvc;

    private Annotation annotation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Annotation createEntity(EntityManager em) {
        Annotation annotation = new Annotation().smiley(DEFAULT_SMILEY).textBox(DEFAULT_TEXT_BOX).date(DEFAULT_DATE);
        return annotation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Annotation createUpdatedEntity(EntityManager em) {
        Annotation annotation = new Annotation().smiley(UPDATED_SMILEY).textBox(UPDATED_TEXT_BOX).date(UPDATED_DATE);
        return annotation;
    }

    @BeforeEach
    public void initTest() {
        annotation = createEntity(em);
    }

    @Test
    @Transactional
    void createAnnotation() throws Exception {
        int databaseSizeBeforeCreate = annotationRepository.findAll().size();
        // Create the Annotation
        restAnnotationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(annotation)))
            .andExpect(status().isCreated());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeCreate + 1);
        Annotation testAnnotation = annotationList.get(annotationList.size() - 1);
        assertThat(testAnnotation.getSmiley()).isEqualTo(DEFAULT_SMILEY);
        assertThat(testAnnotation.getTextBox()).isEqualTo(DEFAULT_TEXT_BOX);
        assertThat(testAnnotation.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    void createAnnotationWithExistingId() throws Exception {
        // Create the Annotation with an existing ID
        annotation.setId(1L);

        int databaseSizeBeforeCreate = annotationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnotationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(annotation)))
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkSmileyIsRequired() throws Exception {
        int databaseSizeBeforeTest = annotationRepository.findAll().size();
        // set the field null
        annotation.setSmiley(null);

        // Create the Annotation, which fails.

        restAnnotationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(annotation)))
            .andExpect(status().isBadRequest());

        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = annotationRepository.findAll().size();
        // set the field null
        annotation.setDate(null);

        // Create the Annotation, which fails.

        restAnnotationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(annotation)))
            .andExpect(status().isBadRequest());

        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAnnotations() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        // Get all the annotationList
        restAnnotationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(annotation.getId().intValue())))
            .andExpect(jsonPath("$.[*].smiley").value(hasItem(DEFAULT_SMILEY)))
            .andExpect(jsonPath("$.[*].textBox").value(hasItem(DEFAULT_TEXT_BOX.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    void getAnnotation() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        // Get the annotation
        restAnnotationMockMvc
            .perform(get(ENTITY_API_URL_ID, annotation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(annotation.getId().intValue()))
            .andExpect(jsonPath("$.smiley").value(DEFAULT_SMILEY))
            .andExpect(jsonPath("$.textBox").value(DEFAULT_TEXT_BOX.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAnnotation() throws Exception {
        // Get the annotation
        restAnnotationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewAnnotation() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();

        // Update the annotation
        Annotation updatedAnnotation = annotationRepository.findById(annotation.getId()).get();
        // Disconnect from session so that the updates on updatedAnnotation are not directly saved in db
        em.detach(updatedAnnotation);
        updatedAnnotation.smiley(UPDATED_SMILEY).textBox(UPDATED_TEXT_BOX).date(UPDATED_DATE);

        restAnnotationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAnnotation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedAnnotation))
            )
            .andExpect(status().isOk());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
        Annotation testAnnotation = annotationList.get(annotationList.size() - 1);
        assertThat(testAnnotation.getSmiley()).isEqualTo(UPDATED_SMILEY);
        assertThat(testAnnotation.getTextBox()).isEqualTo(UPDATED_TEXT_BOX);
        assertThat(testAnnotation.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void putNonExistingAnnotation() throws Exception {
        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();
        annotation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnotationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, annotation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(annotation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAnnotation() throws Exception {
        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();
        annotation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnotationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(annotation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAnnotation() throws Exception {
        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();
        annotation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnotationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(annotation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAnnotationWithPatch() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();

        // Update the annotation using partial update
        Annotation partialUpdatedAnnotation = new Annotation();
        partialUpdatedAnnotation.setId(annotation.getId());

        partialUpdatedAnnotation.textBox(UPDATED_TEXT_BOX).date(UPDATED_DATE);

        restAnnotationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnnotation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAnnotation))
            )
            .andExpect(status().isOk());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
        Annotation testAnnotation = annotationList.get(annotationList.size() - 1);
        assertThat(testAnnotation.getSmiley()).isEqualTo(DEFAULT_SMILEY);
        assertThat(testAnnotation.getTextBox()).isEqualTo(UPDATED_TEXT_BOX);
        assertThat(testAnnotation.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void fullUpdateAnnotationWithPatch() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();

        // Update the annotation using partial update
        Annotation partialUpdatedAnnotation = new Annotation();
        partialUpdatedAnnotation.setId(annotation.getId());

        partialUpdatedAnnotation.smiley(UPDATED_SMILEY).textBox(UPDATED_TEXT_BOX).date(UPDATED_DATE);

        restAnnotationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAnnotation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAnnotation))
            )
            .andExpect(status().isOk());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
        Annotation testAnnotation = annotationList.get(annotationList.size() - 1);
        assertThat(testAnnotation.getSmiley()).isEqualTo(UPDATED_SMILEY);
        assertThat(testAnnotation.getTextBox()).isEqualTo(UPDATED_TEXT_BOX);
        assertThat(testAnnotation.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingAnnotation() throws Exception {
        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();
        annotation.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnotationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, annotation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(annotation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAnnotation() throws Exception {
        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();
        annotation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnotationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(annotation))
            )
            .andExpect(status().isBadRequest());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAnnotation() throws Exception {
        int databaseSizeBeforeUpdate = annotationRepository.findAll().size();
        annotation.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAnnotationMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(annotation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Annotation in the database
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAnnotation() throws Exception {
        // Initialize the database
        annotationRepository.saveAndFlush(annotation);

        int databaseSizeBeforeDelete = annotationRepository.findAll().size();

        // Delete the annotation
        restAnnotationMockMvc
            .perform(delete(ENTITY_API_URL_ID, annotation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Annotation> annotationList = annotationRepository.findAll();
        assertThat(annotationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
