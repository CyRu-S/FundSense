package com.mutualfund.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "recommendations")
public class Recommendation {
    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("fund_id")
    private String fundId;

    private Double score;

    private String reason;

    @Field("model_version")
    private String modelVersion;

    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
