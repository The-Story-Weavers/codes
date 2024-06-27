package com.story.weavers.controller;

import com.alibaba.fastjson.JSONObject;
import com.story.weavers.service.PortfolioService;
import com.story.weavers.utils.RestResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {
    
    @Autowired
    private PortfolioService portfolioService;

    @PostMapping("/savePortfolio")
    public RestResult savePortfolio(@RequestBody JSONObject jsonObject){
        int id = portfolioService.savePortfolio(jsonObject);
        return RestResult.success(id,"保存成功");
    }

    @PostMapping("/findAllPortfolio")
    public RestResult findAllPortfolio(@RequestBody JSONObject jsonObject){
        return RestResult.success(portfolioService.findAllPortfolio(jsonObject),"查询成功");
    }

    @PostMapping("/findPortDetail")
    public RestResult findPortDetail(@RequestBody JSONObject jsonObject){
        return RestResult.success(portfolioService.findPortDetail(jsonObject),"查询成功");
    }

}
