package com.mutualfund.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "investor_profiles")
public class InvestorProfile {
    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("risk_score")
    private Double riskScore;

    @Field("cluster_id")
    private String clusterId;

    @Field("investment_goal")
    private String investmentGoal;

    @Field("investment_timeline")
    private String investmentTimeline;

    @Field("survey_responses")
    private Map<String, Object> surveyResponses;
}
