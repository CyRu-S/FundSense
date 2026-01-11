package com.mutualfund.backend.repository;

import com.mutualfund.backend.models.Recommendation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface RecommendationRepository extends MongoRepository<Recommendation, String> {
    List<Recommendation> findByUserId(String userId);
}
