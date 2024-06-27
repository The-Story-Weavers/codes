package com.story.weavers.service;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.story.weavers.entity.PortDetailVo;
import com.story.weavers.entity.Portfolio;

import java.util.List;

public interface PortfolioService {

    int savePortfolio(JSONObject jsonObject);

    Page<Portfolio> findAllPortfolio(JSONObject jsonObject);

    PortDetailVo findPortDetail(JSONObject jsonObject);
}
