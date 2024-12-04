package com.green.smarty.mapper;

import com.green.smarty.dto.TotalMembershipDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMembershipMapper {
    List<TotalMembershipDTO>getPaymentDetailsByUserId(String user_id);
}
