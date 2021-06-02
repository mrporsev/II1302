package org.jhipster.plantalyzer.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.jhipster.plantalyzer.IntegrationTest;
import org.jhipster.plantalyzer.domain.Plantcategory;
import org.jhipster.plantalyzer.repository.PlantcategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PlantcategoryResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlantcategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_EXAMPLE = "AAAAAAAAAA";
    private static final String UPDATED_EXAMPLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_MOISTURE_MAX = 1;
    private static final Integer UPDATED_MOISTURE_MAX = 2;

    private static final Integer DEFAULT_MOISTURE_MIN = 1;
    private static final Integer UPDATED_MOISTURE_MIN = 2;

    private static final Integer DEFAULT_LIGHT_MAX = 1;
    private static final Integer UPDATED_LIGHT_MAX = 2;

    private static final Integer DEFAULT_LIGHT_MIN = 1;
    private static final Integer UPDATED_LIGHT_MIN = 2;

    private static final Integer DEFAULT_HUMIDITY_MAX = 1;
    private static final Integer UPDATED_HUMIDITY_MAX = 2;

    private static final Integer DEFAULT_HUMIDITY_MIN = 1;
    private static final Integer UPDATED_HUMIDITY_MIN = 2;

    private static final Integer DEFAULT_TEMPERATURE_MAX = 1;
    private static final Integer UPDATED_TEMPERATURE_MAX = 2;

    private static final Integer DEFAULT_TEMPERATURE_MIN = 1;
    private static final Integer UPDATED_TEMPERATURE_MIN = 2;

    private static final String ENTITY_API_URL = "/api/plantcategories";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PlantcategoryRepository plantcategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlantcategoryMockMvc;

    private Plantcategory plantcategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plantcategory createEntity(EntityManager em) {
        Plantcategory plantcategory = new Plantcategory()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .example(DEFAULT_EXAMPLE)
            .moisture_max(DEFAULT_MOISTURE_MAX)
            .moisture_min(DEFAULT_MOISTURE_MIN)
            .light_max(DEFAULT_LIGHT_MAX)
            .light_min(DEFAULT_LIGHT_MIN)
            .humidity_max(DEFAULT_HUMIDITY_MAX)
            .humidity_min(DEFAULT_HUMIDITY_MIN)
            .temperature_max(DEFAULT_TEMPERATURE_MAX)
            .temperature_min(DEFAULT_TEMPERATURE_MIN);
        return plantcategory;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plantcategory createUpdatedEntity(EntityManager em) {
        Plantcategory plantcategory = new Plantcategory()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .example(UPDATED_EXAMPLE)
            .moisture_max(UPDATED_MOISTURE_MAX)
            .moisture_min(UPDATED_MOISTURE_MIN)
            .light_max(UPDATED_LIGHT_MAX)
            .light_min(UPDATED_LIGHT_MIN)
            .humidity_max(UPDATED_HUMIDITY_MAX)
            .humidity_min(UPDATED_HUMIDITY_MIN)
            .temperature_max(UPDATED_TEMPERATURE_MAX)
            .temperature_min(UPDATED_TEMPERATURE_MIN);
        return plantcategory;
    }

    @BeforeEach
    public void initTest() {
        plantcategory = createEntity(em);
    }

    @Test
    @Transactional
    void createPlantcategory() throws Exception {
        int databaseSizeBeforeCreate = plantcategoryRepository.findAll().size();
        // Create the Plantcategory
        restPlantcategoryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(plantcategory)))
            .andExpect(status().isCreated());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeCreate + 1);
        Plantcategory testPlantcategory = plantcategoryList.get(plantcategoryList.size() - 1);
        assertThat(testPlantcategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlantcategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPlantcategory.getExample()).isEqualTo(DEFAULT_EXAMPLE);
        assertThat(testPlantcategory.getMoisture_max()).isEqualTo(DEFAULT_MOISTURE_MAX);
        assertThat(testPlantcategory.getMoisture_min()).isEqualTo(DEFAULT_MOISTURE_MIN);
        assertThat(testPlantcategory.getLight_max()).isEqualTo(DEFAULT_LIGHT_MAX);
        assertThat(testPlantcategory.getLight_min()).isEqualTo(DEFAULT_LIGHT_MIN);
        assertThat(testPlantcategory.getHumidity_max()).isEqualTo(DEFAULT_HUMIDITY_MAX);
        assertThat(testPlantcategory.getHumidity_min()).isEqualTo(DEFAULT_HUMIDITY_MIN);
        assertThat(testPlantcategory.getTemperature_max()).isEqualTo(DEFAULT_TEMPERATURE_MAX);
        assertThat(testPlantcategory.getTemperature_min()).isEqualTo(DEFAULT_TEMPERATURE_MIN);
    }

    @Test
    @Transactional
    void createPlantcategoryWithExistingId() throws Exception {
        // Create the Plantcategory with an existing ID
        plantcategory.setId(1L);

        int databaseSizeBeforeCreate = plantcategoryRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlantcategoryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(plantcategory)))
            .andExpect(status().isBadRequest());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = plantcategoryRepository.findAll().size();
        // set the field null
        plantcategory.setName(null);

        // Create the Plantcategory, which fails.

        restPlantcategoryMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(plantcategory)))
            .andExpect(status().isBadRequest());

        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPlantcategories() throws Exception {
        // Initialize the database
        plantcategoryRepository.saveAndFlush(plantcategory);

        // Get all the plantcategoryList
        restPlantcategoryMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plantcategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].example").value(hasItem(DEFAULT_EXAMPLE)))
            .andExpect(jsonPath("$.[*].moisture_max").value(hasItem(DEFAULT_MOISTURE_MAX)))
            .andExpect(jsonPath("$.[*].moisture_min").value(hasItem(DEFAULT_MOISTURE_MIN)))
            .andExpect(jsonPath("$.[*].light_max").value(hasItem(DEFAULT_LIGHT_MAX)))
            .andExpect(jsonPath("$.[*].light_min").value(hasItem(DEFAULT_LIGHT_MIN)))
            .andExpect(jsonPath("$.[*].humidity_max").value(hasItem(DEFAULT_HUMIDITY_MAX)))
            .andExpect(jsonPath("$.[*].humidity_min").value(hasItem(DEFAULT_HUMIDITY_MIN)))
            .andExpect(jsonPath("$.[*].temperature_max").value(hasItem(DEFAULT_TEMPERATURE_MAX)))
            .andExpect(jsonPath("$.[*].temperature_min").value(hasItem(DEFAULT_TEMPERATURE_MIN)));
    }

    @Test
    @Transactional
    void getPlantcategory() throws Exception {
        // Initialize the database
        plantcategoryRepository.saveAndFlush(plantcategory);

        // Get the plantcategory
        restPlantcategoryMockMvc
            .perform(get(ENTITY_API_URL_ID, plantcategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plantcategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.example").value(DEFAULT_EXAMPLE))
            .andExpect(jsonPath("$.moisture_max").value(DEFAULT_MOISTURE_MAX))
            .andExpect(jsonPath("$.moisture_min").value(DEFAULT_MOISTURE_MIN))
            .andExpect(jsonPath("$.light_max").value(DEFAULT_LIGHT_MAX))
            .andExpect(jsonPath("$.light_min").value(DEFAULT_LIGHT_MIN))
            .andExpect(jsonPath("$.humidity_max").value(DEFAULT_HUMIDITY_MAX))
            .andExpect(jsonPath("$.humidity_min").value(DEFAULT_HUMIDITY_MIN))
            .andExpect(jsonPath("$.temperature_max").value(DEFAULT_TEMPERATURE_MAX))
            .andExpect(jsonPath("$.temperature_min").value(DEFAULT_TEMPERATURE_MIN));
    }

    @Test
    @Transactional
    void getNonExistingPlantcategory() throws Exception {
        // Get the plantcategory
        restPlantcategoryMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPlantcategory() throws Exception {
        // Initialize the database
        plantcategoryRepository.saveAndFlush(plantcategory);

        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();

        // Update the plantcategory
        Plantcategory updatedPlantcategory = plantcategoryRepository.findById(plantcategory.getId()).get();
        // Disconnect from session so that the updates on updatedPlantcategory are not directly saved in db
        em.detach(updatedPlantcategory);
        updatedPlantcategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .example(UPDATED_EXAMPLE)
            .moisture_max(UPDATED_MOISTURE_MAX)
            .moisture_min(UPDATED_MOISTURE_MIN)
            .light_max(UPDATED_LIGHT_MAX)
            .light_min(UPDATED_LIGHT_MIN)
            .humidity_max(UPDATED_HUMIDITY_MAX)
            .humidity_min(UPDATED_HUMIDITY_MIN)
            .temperature_max(UPDATED_TEMPERATURE_MAX)
            .temperature_min(UPDATED_TEMPERATURE_MIN);

        restPlantcategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPlantcategory.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPlantcategory))
            )
            .andExpect(status().isOk());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
        Plantcategory testPlantcategory = plantcategoryList.get(plantcategoryList.size() - 1);
        assertThat(testPlantcategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlantcategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPlantcategory.getExample()).isEqualTo(UPDATED_EXAMPLE);
        assertThat(testPlantcategory.getMoisture_max()).isEqualTo(UPDATED_MOISTURE_MAX);
        assertThat(testPlantcategory.getMoisture_min()).isEqualTo(UPDATED_MOISTURE_MIN);
        assertThat(testPlantcategory.getLight_max()).isEqualTo(UPDATED_LIGHT_MAX);
        assertThat(testPlantcategory.getLight_min()).isEqualTo(UPDATED_LIGHT_MIN);
        assertThat(testPlantcategory.getHumidity_max()).isEqualTo(UPDATED_HUMIDITY_MAX);
        assertThat(testPlantcategory.getHumidity_min()).isEqualTo(UPDATED_HUMIDITY_MIN);
        assertThat(testPlantcategory.getTemperature_max()).isEqualTo(UPDATED_TEMPERATURE_MAX);
        assertThat(testPlantcategory.getTemperature_min()).isEqualTo(UPDATED_TEMPERATURE_MIN);
    }

    @Test
    @Transactional
    void putNonExistingPlantcategory() throws Exception {
        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();
        plantcategory.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlantcategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, plantcategory.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(plantcategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPlantcategory() throws Exception {
        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();
        plantcategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlantcategoryMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(plantcategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPlantcategory() throws Exception {
        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();
        plantcategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlantcategoryMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(plantcategory)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePlantcategoryWithPatch() throws Exception {
        // Initialize the database
        plantcategoryRepository.saveAndFlush(plantcategory);

        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();

        // Update the plantcategory using partial update
        Plantcategory partialUpdatedPlantcategory = new Plantcategory();
        partialUpdatedPlantcategory.setId(plantcategory.getId());

        partialUpdatedPlantcategory
            .example(UPDATED_EXAMPLE)
            .moisture_max(UPDATED_MOISTURE_MAX)
            .moisture_min(UPDATED_MOISTURE_MIN)
            .light_max(UPDATED_LIGHT_MAX)
            .light_min(UPDATED_LIGHT_MIN)
            .humidity_min(UPDATED_HUMIDITY_MIN)
            .temperature_max(UPDATED_TEMPERATURE_MAX)
            .temperature_min(UPDATED_TEMPERATURE_MIN);

        restPlantcategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlantcategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlantcategory))
            )
            .andExpect(status().isOk());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
        Plantcategory testPlantcategory = plantcategoryList.get(plantcategoryList.size() - 1);
        assertThat(testPlantcategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlantcategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPlantcategory.getExample()).isEqualTo(UPDATED_EXAMPLE);
        assertThat(testPlantcategory.getMoisture_max()).isEqualTo(UPDATED_MOISTURE_MAX);
        assertThat(testPlantcategory.getMoisture_min()).isEqualTo(UPDATED_MOISTURE_MIN);
        assertThat(testPlantcategory.getLight_max()).isEqualTo(UPDATED_LIGHT_MAX);
        assertThat(testPlantcategory.getLight_min()).isEqualTo(UPDATED_LIGHT_MIN);
        assertThat(testPlantcategory.getHumidity_max()).isEqualTo(DEFAULT_HUMIDITY_MAX);
        assertThat(testPlantcategory.getHumidity_min()).isEqualTo(UPDATED_HUMIDITY_MIN);
        assertThat(testPlantcategory.getTemperature_max()).isEqualTo(UPDATED_TEMPERATURE_MAX);
        assertThat(testPlantcategory.getTemperature_min()).isEqualTo(UPDATED_TEMPERATURE_MIN);
    }

    @Test
    @Transactional
    void fullUpdatePlantcategoryWithPatch() throws Exception {
        // Initialize the database
        plantcategoryRepository.saveAndFlush(plantcategory);

        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();

        // Update the plantcategory using partial update
        Plantcategory partialUpdatedPlantcategory = new Plantcategory();
        partialUpdatedPlantcategory.setId(plantcategory.getId());

        partialUpdatedPlantcategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .example(UPDATED_EXAMPLE)
            .moisture_max(UPDATED_MOISTURE_MAX)
            .moisture_min(UPDATED_MOISTURE_MIN)
            .light_max(UPDATED_LIGHT_MAX)
            .light_min(UPDATED_LIGHT_MIN)
            .humidity_max(UPDATED_HUMIDITY_MAX)
            .humidity_min(UPDATED_HUMIDITY_MIN)
            .temperature_max(UPDATED_TEMPERATURE_MAX)
            .temperature_min(UPDATED_TEMPERATURE_MIN);

        restPlantcategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlantcategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlantcategory))
            )
            .andExpect(status().isOk());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
        Plantcategory testPlantcategory = plantcategoryList.get(plantcategoryList.size() - 1);
        assertThat(testPlantcategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlantcategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPlantcategory.getExample()).isEqualTo(UPDATED_EXAMPLE);
        assertThat(testPlantcategory.getMoisture_max()).isEqualTo(UPDATED_MOISTURE_MAX);
        assertThat(testPlantcategory.getMoisture_min()).isEqualTo(UPDATED_MOISTURE_MIN);
        assertThat(testPlantcategory.getLight_max()).isEqualTo(UPDATED_LIGHT_MAX);
        assertThat(testPlantcategory.getLight_min()).isEqualTo(UPDATED_LIGHT_MIN);
        assertThat(testPlantcategory.getHumidity_max()).isEqualTo(UPDATED_HUMIDITY_MAX);
        assertThat(testPlantcategory.getHumidity_min()).isEqualTo(UPDATED_HUMIDITY_MIN);
        assertThat(testPlantcategory.getTemperature_max()).isEqualTo(UPDATED_TEMPERATURE_MAX);
        assertThat(testPlantcategory.getTemperature_min()).isEqualTo(UPDATED_TEMPERATURE_MIN);
    }

    @Test
    @Transactional
    void patchNonExistingPlantcategory() throws Exception {
        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();
        plantcategory.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlantcategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, plantcategory.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(plantcategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPlantcategory() throws Exception {
        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();
        plantcategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlantcategoryMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(plantcategory))
            )
            .andExpect(status().isBadRequest());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPlantcategory() throws Exception {
        int databaseSizeBeforeUpdate = plantcategoryRepository.findAll().size();
        plantcategory.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlantcategoryMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(plantcategory))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Plantcategory in the database
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePlantcategory() throws Exception {
        // Initialize the database
        plantcategoryRepository.saveAndFlush(plantcategory);

        int databaseSizeBeforeDelete = plantcategoryRepository.findAll().size();

        // Delete the plantcategory
        restPlantcategoryMockMvc
            .perform(delete(ENTITY_API_URL_ID, plantcategory.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plantcategory> plantcategoryList = plantcategoryRepository.findAll();
        assertThat(plantcategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
