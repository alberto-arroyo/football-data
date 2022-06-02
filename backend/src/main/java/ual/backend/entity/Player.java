package ual.backend.entity;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="players")
public class Player {
    @Id
    private Long id;

    @NotBlank(message= "name is required")
    private String name;
    private int age;
    private String photo;
    private String nationality;
    private String value;

    private ArrayList<Long> seasons = new ArrayList<>();


    public ArrayList<Long> getSeasons() {
        return seasons;
    }

    public void setSeasons(ArrayList<Long> seasons) {
        this.seasons = seasons;
    }

    public Player() {

    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }
}
