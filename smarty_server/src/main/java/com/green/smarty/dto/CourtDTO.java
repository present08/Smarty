package com.green.smarty.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourtDTO {

    private int court_id;
    private String facility_id;
    private String court_name;
    private boolean court_status;
}
