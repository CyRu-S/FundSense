package com.mutualfund.backend.controllers;

import com.mutualfund.backend.models.User;
import com.mutualfund.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Set<String>> getUserFavorites() {
        String username = getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        return ResponseEntity.ok(user.getFavorites());
    }

    @PostMapping("/{fundId}")
    public ResponseEntity<?> addFavorite(@PathVariable String fundId) {
        String username = getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        user.getFavorites().add(fundId);
        userRepository.save(user);

        return ResponseEntity.ok("Fund added to favorites!");
    }

    @DeleteMapping("/{fundId}")
    public ResponseEntity<?> removeFavorite(@PathVariable String fundId) {
        String username = getCurrentUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        user.getFavorites().remove(fundId);
        userRepository.save(user);

        return ResponseEntity.ok("Fund removed from favorites!");
    }

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }
}
