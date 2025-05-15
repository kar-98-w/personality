package com.marron.personality;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Marks this class as a JPA entity
public class Personality {

    @Id // Marks the 'id' field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Configures auto-generation of the primary key
    private Long id;

    private String trait;
    private String description;
    private int score;
    private String category;

    // Default constructor (required by JPA)
    public Personality() {
    }

    public Personality(String trait, String description, int score, String category) {
        this.trait = trait;
        this.description = description;
        this.score = score;
        this.category = category;
    }

    // Getters and setters for all fields (including id and category)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrait() {
        return trait;
    }

    public void setTrait(String trait) {
        this.trait = trait;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Personality{" +
                "id=" + id +
                ", trait='" + trait + '\'' +
                ", description='" + description + '\'' +
                ", score=" + score +
                ", category='" + category + '\'' +
                '}';
    }
}

