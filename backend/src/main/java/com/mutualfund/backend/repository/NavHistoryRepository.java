package com.mutualfund.backend.repository;

import com.mutualfund.backend.models.NavHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NavHistoryRepository extends MongoRepository<NavHistory, String> {
    List<NavHistory> findByFundIdOrderByDateDesc(String fundId);

    List<NavHistory> findByFundIdAndDateAfter(String fundId, LocalDateTime date);
}
