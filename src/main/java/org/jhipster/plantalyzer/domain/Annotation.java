package org.jhipster.plantalyzer.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "annotation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Annotation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "smiley", nullable = false)
    private String smiley;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "text_box", nullable = false)
    private String textBox;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "annotations" }, allowSetters = true)
    private Sensor sensor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Annotation id(Long id) {
        this.id = id;
        return this;
    }

    public String getSmiley() {
        return this.smiley;
    }

    public Annotation smiley(String smiley) {
        this.smiley = smiley;
        return this;
    }

    public void setSmiley(String smiley) {
        this.smiley = smiley;
    }

    public String getTextBox() {
        return this.textBox;
    }

    public Annotation textBox(String textBox) {
        this.textBox = textBox;
        return this;
    }

    public void setTextBox(String textBox) {
        this.textBox = textBox;
    }

    public Instant getDate() {
        return this.date;
    }

    public Annotation date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Sensor getSensor() {
        return this.sensor;
    }

    public Annotation sensor(Sensor sensor) {
        this.setSensor(sensor);
        return this;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Annotation)) {
            return false;
        }
        return id != null && id.equals(((Annotation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Annotation{" +
            "id=" + getId() +
            ", smiley='" + getSmiley() + "'" +
            ", textBox='" + getTextBox() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
