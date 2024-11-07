package com.green.smarty.mapper.product;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class ProductStatusMapperTests {
    @Autowired
    private ProductStatusMapper productStatusMapper;

    @Autowired
    private QuantityMapper quantityMapper;

    @Test
    public void dummpProductStatusInsert(){
        String statusIdPrefix = "status_";
        String status = "대여 가능";

        List<String> quantityIds = quantityMapper.getAllQuantityIds();

        for(int i=0; i<quantityIds.size();i++){
            String statusId = statusIdPrefix + (i+1);
            String quantityId = quantityIds.get(i);

            productStatusMapper.insertProductStatus(statusId, quantityId, status);
        }

    }
}
