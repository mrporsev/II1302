package org.jhipster.plantalyzer.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.jhipster.plantalyzer.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AnnotationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Annotation.class);
        Annotation annotation1 = new Annotation();
        annotation1.setId(1L);
        Annotation annotation2 = new Annotation();
        annotation2.setId(annotation1.getId());
        assertThat(annotation1).isEqualTo(annotation2);
        annotation2.setId(2L);
        assertThat(annotation1).isNotEqualTo(annotation2);
        annotation1.setId(null);
        assertThat(annotation1).isNotEqualTo(annotation2);
    }
}
