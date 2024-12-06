package com.green.smarty.service;

import com.green.smarty.dto.ProductRentalMyPageUserDTO;
import com.green.smarty.mapper.UserCouponMapper;
import com.green.smarty.vo.CouponVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserCouponService {

    @Autowired
    private UserCouponMapper usercouponMapper;


//    public void InsertUserNewCoupon(CouponVO couponVO) {
//        System.out.println(couponVO);
//        usercouponMapper.InsertUserNewCoupon(couponVO);
//    }
//
//    public boolean CheckExistingCoupon(String user_id) {
//        System.out.println(user_id);
//        return usercouponMapper.CheckExistingCoupon(user_id);
//    }
//
//    public boolean UserCouponStatus( CouponVO couponVO) {
//        int result = usercouponMapper.UserCouponStatus();
//        return result > 0;
//    }


}
