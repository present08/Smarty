package com.green.smarty.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginHistoryMapper {
    String insertSentHumanMessageByUserId(String user_id);

}
