package com.mutualfund.backend.repository;

import com.mutualfund.backend.models.InvestorProfile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InvestorProfileRepository extends MongoRepository<InvestorProfile, String> {
    Optional<InvestorProfile> findByUserId(String userId);
}
