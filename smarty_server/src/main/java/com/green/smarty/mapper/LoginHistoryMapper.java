package com.green.smarty.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginHistoryMapper {
    void insertOrUpdateSentHumanMessageByUserId(@Param("user_id") String user_id);
    void upsertSentHumanMessageBasedOnUser();

}
