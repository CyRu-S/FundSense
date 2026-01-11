package com.mutualfund.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Set;
import java.util.HashSet;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String username;

    private String email;

    private String password;

    private String role; // Single role: ADMIN, INVESTOR, ANALYST

    // New fields from Schema
    private Boolean isActive = true;

    private Set<String> favorites = new HashSet<>(); // Storing Fund IDs
    
    // Registration Fields
    private String country;
    private String phone; // Optional
    private String profession; // Optional
    private String ageRange; // Optional
    private Boolean isEmailVerified = false;
    private Boolean termsAccepted = false;

    private String createdAt;

    private String updatedAt;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = true;
        this.role = "INVESTOR"; // Default role
    }
}
