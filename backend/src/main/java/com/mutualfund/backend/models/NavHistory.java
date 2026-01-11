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
@Document(collection = "nav_history")
// Timeseries annotation if using Spring Data MongoDB 4+
// @TimeSeries(timeField = "date", metaField = "fundId", granularity =
// TimeSeriesGranularity.HOURS)
public class NavHistory {
    @Id
    private String id;

    @Field("fund_id")
    private String fundId;

    private LocalDateTime date;

    private Double nav;
}
