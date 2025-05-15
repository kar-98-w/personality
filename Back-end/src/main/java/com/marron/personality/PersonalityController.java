package com.marron.personality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Replace with your React app's origin
@RequestMapping("/marron/personalities") // Updated the request mapping
public class PersonalityController {

    @Autowired
    private PersonalityRepository personalityRepository;

    @GetMapping
    public ResponseEntity<List<Personality>> getAllPersonalities() { // Updated method name
        List<Personality> personalities = personalityRepository.findAll();
        return new ResponseEntity<>(personalities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Personality> getPersonalityById(@PathVariable Long id) { // Updated method name
        Optional<Personality> personality = personalityRepository.findById(id);
        return personality.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Personality> createPersonality(@RequestBody Personality personality) { // Updated method name
        Personality savedPersonality = personalityRepository.save(personality);
        return new ResponseEntity<>(savedPersonality, HttpStatus.CREATED);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Personality>> createBulkPersonalities(@RequestBody List<Personality> personalities) {
        List<Personality> savedPersonalities = personalityRepository.saveAll(personalities);
        return new ResponseEntity<>(savedPersonalities, HttpStatus.CREATED);
    }


}