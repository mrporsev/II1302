package org.jhipster.plantalyzer.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.jhipster.plantalyzer.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlantcategoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plantcategory.class);
        Plantcategory plantcategory1 = new Plantcategory();
        plantcategory1.setId(1L);
        Plantcategory plantcategory2 = new Plantcategory();
        plantcategory2.setId(plantcategory1.getId());
        assertThat(plantcategory1).isEqualTo(plantcategory2);
        plantcategory2.setId(2L);
        assertThat(plantcategory1).isNotEqualTo(plantcategory2);
        plantcategory1.setId(null);
        assertThat(plantcategory1).isNotEqualTo(plantcategory2);
    }
}
