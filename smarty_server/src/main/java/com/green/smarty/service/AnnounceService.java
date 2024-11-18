package com.green.smarty.service;

import com.green.smarty.dto.AnnounceDTO;
import com.green.smarty.mapper.AnnounceMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Log4j2
public class AnnounceService {
    @Autowired
    private AnnounceMapper announceMapper;

    // 공지사항 생성
    public int createAnnounce(AnnounceDTO announceDTO) {
        try {
            int result = announceMapper.insertAnnounce(announceDTO);
            if (result > 0) {
                log.info("Insert successful for announce ID: " + announceDTO.getAnnounce_id());
            } else {
                log.info("Insert failed, no rows affected.");
            }
            return result;
        } catch (Exception e) {
            log.error("Insert failed: ", e);
            return 0;
        }
    }

    // 조건부 검색 조회
    public List<AnnounceDTO> searchAnnounce(String type, String keyword) {
        return announceMapper.searchAnnounce(type, keyword);
    }



    // 공지사항 단일 조회
    public AnnounceDTO getAnnounceById(int announce_id){
        return announceMapper.selectAnnounceById(announce_id);
    }

    // 공지사항 전체 조회
    public List<AnnounceDTO> getAllAnnounce() {
        return announceMapper.selectAllAnnounce();
    }

    // 공지사항 업데이트
    public void updateAnnounce(AnnounceDTO announceDTO){
        announceMapper.modifyAnnounce(announceDTO);
    }

    // 공지사항 삭제
    public void deleteAnnounce(int announce_id){
        announceMapper.removeAnnounce(announce_id);
    }

    // 조회수 증가
    public int incrementViewCount(int announce_id) {
        return announceMapper.updateViewCount(announce_id);
    }


}
