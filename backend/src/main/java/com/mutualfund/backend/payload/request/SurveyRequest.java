package com.mutualfund.backend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.Map;

@Data
public class SurveyRequest {
    @NotBlank
    private String investmentGoal;

    @NotBlank
    private String timeline;

    // e.g. "q1": 5, "q2": 10
    private Map<String, Integer> answers;
}
