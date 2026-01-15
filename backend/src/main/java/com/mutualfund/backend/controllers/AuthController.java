package com.mutualfund.backend.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mutualfund.backend.models.User;
import com.mutualfund.backend.payload.AuthPayloads.*;
import com.mutualfund.backend.repository.UserRepository;
import com.mutualfund.backend.security.JwtUtils;
import com.mutualfund.backend.security.UserDetailsImpl;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Set<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toSet());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        
        // 1. Check Mandatory Terms
        if (signUpRequest.getTermsAccepted() == null || !signUpRequest.getTermsAccepted()) {
             return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Terms & Conditions must be accepted!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));
                
        // Map new fields
        user.setCountry(signUpRequest.getCountry());
        user.setTermsAccepted(signUpRequest.getTermsAccepted());
        user.setPhone(signUpRequest.getPhone()); // Optional
        user.setProfession(signUpRequest.getProfession()); // Optional
        user.setAgeRange(signUpRequest.getAgeRange()); // Optional
        
        // Set verification status
        user.setIsEmailVerified(false); 

        Set<String> strRoles = signUpRequest.getRoles();
        String role = "INVESTOR";

        if (strRoles != null && !strRoles.isEmpty()) {
            // Take the first role if multiple provided, or check specific flags
            String reqRole = strRoles.iterator().next();
            switch (reqRole.toLowerCase()) {
                case "admin":
                    role = "ADMIN";
                    break;
                case "analyst":
                    role = "ANALYST";
                    break;
                default:
                    role = "INVESTOR";
            }
        }

        user.setRole(role);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody String token) {
        // In a real app, verify the token. 
        // Here we just return success to simulate flow.
        return ResponseEntity.ok(new MessageResponse("Email verified successfully!"));
    }
}
