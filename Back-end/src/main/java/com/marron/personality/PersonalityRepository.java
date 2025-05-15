package com.marron.personality;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PersonalityRepository extends JpaRepository<Personality, Long> {

    // You can add custom query methods here if needed.
    // For example, to find personalities with a score greater than a certain value:
    // List<Personality> findByScoreGreaterThan(int score);

    // Or to find personalities by a specific trait:
    // List<Personality> findByTrait(String trait);
}