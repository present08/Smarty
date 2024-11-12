package com.green.smarty.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FacilityAdminDTO {

    private String facility_id;
    private String facility_name;   // 시설 종류

    private String open_time;
    private String close_time;      // 운영 시간
    private int default_time;       // 기본 이용시간, 할인/할증 구간 나누는 기준

    private int basic_fee;
    private float rate_adjustment;  // 가격 조정율 ex) 0.3
    private int hot_time;
    // 0: 기본요금 적용, 1: 조조할인 적용, 2: 심야할증 적용, 3: 할인, 할증 모두 적용

    private String contact;
    private String info;
    private String caution;         // 연락처, 주의사항, 이용안내

    private boolean court;              // 부가시설 여부
    private boolean product;            // 물품등록 여부
    private boolean facility_status;    // 이용가능 여부
    private boolean facility_images;    // 사진등록 여부

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();
    @Builder.Default
    private List<String> file_name = new ArrayList<>();
    // 첨부파일이 없는 경우 기본값인 빈배열이 저장됨 (에러 방지)


    // 시설 정보 수정 메서드
    public void update(String facility_name, String open_time, String close_time, int default_time,
                       int basic_fee, float rate_adjustment, int hot_time, String contact, String info, String caution,
                       boolean court, boolean product, boolean facility_status) {
        this.facility_name = facility_name;
        this.open_time = open_time;
        this.close_time = close_time;
        this.default_time = default_time;
        this.basic_fee = basic_fee;
        this.rate_adjustment = rate_adjustment;
        this.hot_time = hot_time;
        this.contact = contact;
        this.info = info;
        this.caution = caution;
        this.court = court;
        this.product = product;
        this.facility_status = facility_status;
    }
}
