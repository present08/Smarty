package com.green.smarty.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FacilityDTO {

    private String facility_id;
    private String facility_name;   // 시설 종류

    private int quantity;           // 수용 가능 인원
    private String open_time;
    private String close_time;      // 운영 시간
    private int default_time;       // 기본 이용시간

    private int basic_fee;
    private int extra_fee;          // 기본 및 할증가격

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
    private List<String> file_name = new ArrayList<>();     // 시설 관련 이미지 파일, 파일명

    // 시설 정보 수정 메서드
//    public void update(int quantity, String open_time, String close_time, int default_time,
//                       int basic_fee, int extra_fee, String contact, String info, String caution,
//                       boolean court, boolean facility_status) {
//        this.quantity = quantity;
//        this.open_time = open_time;
//        this.close_time = close_time;
//        this.default_time = default_time;
//        this.basic_fee = basic_fee;
//        this.extra_fee = extra_fee;
//        this.contact = contact;
//        this.info = info;
//        this.caution = caution;
//        this.court = court;
//        this.facility_status = facility_status;
//    }
}
