package org.jhipster.plantalyzer.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Plantcategory.
 */
@Entity
@Table(name = "plantcategory")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Plantcategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "example")
    private String example;

    @Column(name = "moisture_max")
    private Integer moisture_max;

    @Column(name = "moisture_min")
    private Integer moisture_min;

    @Column(name = "light_max")
    private Integer light_max;

    @Column(name = "light_min")
    private Integer light_min;

    @Column(name = "humidity_max")
    private Integer humidity_max;

    @Column(name = "humidity_min")
    private Integer humidity_min;

    @Column(name = "temperature_max")
    private Integer temperature_max;

    @Column(name = "temperature_min")
    private Integer temperature_min;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Plantcategory id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public Plantcategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Plantcategory description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExample() {
        return this.example;
    }

    public Plantcategory example(String example) {
        this.example = example;
        return this;
    }

    public void setExample(String example) {
        this.example = example;
    }

    public Integer getMoisture_max() {
        return this.moisture_max;
    }

    public Plantcategory moisture_max(Integer moisture_max) {
        this.moisture_max = moisture_max;
        return this;
    }

    public void setMoisture_max(Integer moisture_max) {
        this.moisture_max = moisture_max;
    }

    public Integer getMoisture_min() {
        return this.moisture_min;
    }

    public Plantcategory moisture_min(Integer moisture_min) {
        this.moisture_min = moisture_min;
        return this;
    }

    public void setMoisture_min(Integer moisture_min) {
        this.moisture_min = moisture_min;
    }

    public Integer getLight_max() {
        return this.light_max;
    }

    public Plantcategory light_max(Integer light_max) {
        this.light_max = light_max;
        return this;
    }

    public void setLight_max(Integer light_max) {
        this.light_max = light_max;
    }

    public Integer getLight_min() {
        return this.light_min;
    }

    public Plantcategory light_min(Integer light_min) {
        this.light_min = light_min;
        return this;
    }

    public void setLight_min(Integer light_min) {
        this.light_min = light_min;
    }

    public Integer getHumidity_max() {
        return this.humidity_max;
    }

    public Plantcategory humidity_max(Integer humidity_max) {
        this.humidity_max = humidity_max;
        return this;
    }

    public void setHumidity_max(Integer humidity_max) {
        this.humidity_max = humidity_max;
    }

    public Integer getHumidity_min() {
        return this.humidity_min;
    }

    public Plantcategory humidity_min(Integer humidity_min) {
        this.humidity_min = humidity_min;
        return this;
    }

    public void setHumidity_min(Integer humidity_min) {
        this.humidity_min = humidity_min;
    }

    public Integer getTemperature_max() {
        return this.temperature_max;
    }

    public Plantcategory temperature_max(Integer temperature_max) {
        this.temperature_max = temperature_max;
        return this;
    }

    public void setTemperature_max(Integer temperature_max) {
        this.temperature_max = temperature_max;
    }

    public Integer getTemperature_min() {
        return this.temperature_min;
    }

    public Plantcategory temperature_min(Integer temperature_min) {
        this.temperature_min = temperature_min;
        return this;
    }

    public void setTemperature_min(Integer temperature_min) {
        this.temperature_min = temperature_min;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Plantcategory)) {
            return false;
        }
        return id != null && id.equals(((Plantcategory) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Plantcategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", example='" + getExample() + "'" +
            ", moisture_max=" + getMoisture_max() +
            ", moisture_min=" + getMoisture_min() +
            ", light_max=" + getLight_max() +
            ", light_min=" + getLight_min() +
            ", humidity_max=" + getHumidity_max() +
            ", humidity_min=" + getHumidity_min() +
            ", temperature_max=" + getTemperature_max() +
            ", temperature_min=" + getTemperature_min() +
            "}";
    }
}
