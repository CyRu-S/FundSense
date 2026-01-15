package com.mutualfund.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.mutualfund.backend.models.User;
import com.mutualfund.backend.repository.UserRepository;

/**
 * Creates the default admin user on startup if it doesn't exist.
 */
@Component
@Order(1)
public class AdminUserInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminUsername = "Admin2005";
        String adminEmail = "masteradmin@fundsense.com";
        String adminPassword = "Admin@2005";
        
        // Check if admin user already exists
        if (!userRepository.existsByUsername(adminUsername)) {
            System.out.println("=== ADMIN SETUP: Creating default admin user ===");
            
            User admin = new User(adminUsername, adminEmail, passwordEncoder.encode(adminPassword));
            admin.setRole("ADMIN");
            admin.setIsActive(true);
            admin.setTermsAccepted(true);
            admin.setCountry("global");
            admin.setIsEmailVerified(true);
            
            userRepository.save(admin);
            System.out.println("=== ADMIN SETUP: Admin user created successfully ===");
            System.out.println("    Username: " + adminUsername);
            System.out.println("    Email: " + adminEmail);
        } else {
            System.out.println("=== ADMIN SETUP: Admin user already exists ===");
        }
    }
}
