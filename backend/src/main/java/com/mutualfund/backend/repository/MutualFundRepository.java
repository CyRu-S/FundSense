package com.mutualfund.backend.repository;

import com.mutualfund.backend.models.MutualFund;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MutualFundRepository extends MongoRepository<MutualFund, String> {
    List<MutualFund> findByCategory(String category);

    List<MutualFund> findByRiskLevel(String riskLevel);
}
