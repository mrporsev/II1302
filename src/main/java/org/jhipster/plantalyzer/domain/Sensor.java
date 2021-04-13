package org.jhipster.plantalyzer.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Sensor.
 */
@Entity
@Table(name = "sensor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sensor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "humidity")
    private String humidity;

    @Column(name = "soil_moisture")
    private String soilMoisture;

    @Column(name = "light")
    private String light;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "sensor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "sensor" }, allowSetters = true)
    private Set<Annotation> annotations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sensor id(Long id) {
        this.id = id;
        return this;
    }

    public String getHumidity() {
        return this.humidity;
    }

    public Sensor humidity(String humidity) {
        this.humidity = humidity;
        return this;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public String getSoilMoisture() {
        return this.soilMoisture;
    }

    public Sensor soilMoisture(String soilMoisture) {
        this.soilMoisture = soilMoisture;
        return this;
    }

    public void setSoilMoisture(String soilMoisture) {
        this.soilMoisture = soilMoisture;
    }

    public String getLight() {
        return this.light;
    }

    public Sensor light(String light) {
        this.light = light;
        return this;
    }

    public void setLight(String light) {
        this.light = light;
    }

    public String getName() {
        return this.name;
    }

    public Sensor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return this.user;
    }

    public Sensor user(User user) {
        this.setUser(user);
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Annotation> getAnnotations() {
        return this.annotations;
    }

    public Sensor annotations(Set<Annotation> annotations) {
        this.setAnnotations(annotations);
        return this;
    }

    public Sensor addAnnotation(Annotation annotation) {
        this.annotations.add(annotation);
        annotation.setSensor(this);
        return this;
    }

    public Sensor removeAnnotation(Annotation annotation) {
        this.annotations.remove(annotation);
        annotation.setSensor(null);
        return this;
    }

    public void setAnnotations(Set<Annotation> annotations) {
        if (this.annotations != null) {
            this.annotations.forEach(i -> i.setSensor(null));
        }
        if (annotations != null) {
            annotations.forEach(i -> i.setSensor(this));
        }
        this.annotations = annotations;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sensor)) {
            return false;
        }
        return id != null && id.equals(((Sensor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sensor{" +
            "id=" + getId() +
            ", humidity='" + getHumidity() + "'" +
            ", soilMoisture='" + getSoilMoisture() + "'" +
            ", light='" + getLight() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
