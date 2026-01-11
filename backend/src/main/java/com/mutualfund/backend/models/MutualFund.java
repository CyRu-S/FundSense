package com.mutualfund.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "mutual_funds")
public class MutualFund {
    @Id
    private String id;

    private String name;

    @Field("category")
    private String category; // EQUITY, DEBT, etc.

    @Field("sub_category")
    private String subCategory;

    @Field("fund_house")
    private String fundHouse;

    @Field("risk_level")
    private String riskLevel;

    @Field("current_nav")
    private Double currentNav;

    @Field("expense_ratio")
    private Double expenseRatio;

    private Long aum;

    @Field("returns_history")
    private Map<String, Double> returnsHistory; // "1y", "3y", "5y"

    @Field("min_investment")
    private Integer minInvestment;

    @Field("fund_manager")
    private String fundManager;

    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Field("updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
