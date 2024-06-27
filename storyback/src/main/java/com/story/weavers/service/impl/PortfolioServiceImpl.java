package com.story.weavers.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.story.weavers.entity.Label;
import com.story.weavers.entity.PortDetailVo;
import com.story.weavers.entity.Portfolio;
import com.story.weavers.entity.Story;
import com.story.weavers.mapper.LabelMapper;
import com.story.weavers.mapper.PortfolioMapper;
import com.story.weavers.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;


@Service
@Transactional
public class PortfolioServiceImpl implements PortfolioService {
    
    @Autowired
    private PortfolioMapper portfolioMapper;
    
    @Autowired
    private LabelMapper labelMapper;


    @Override
    public int savePortfolio(JSONObject jsonObject) {
        Portfolio portfolio = jsonObject.toJavaObject(Portfolio.class);
        portfolio.setCreateTime(new Date());
        //处理标签
        JSONArray labels = jsonObject.getJSONArray("labels");
        StringBuilder labelsStr = new StringBuilder();
        if (labels != null){
            for (int i = 0; i < labels.size(); i++) {
                String labelName = (String) labels.get(i);
                Integer lid = labelMapper.getLabelIdByName(labelName);
                if (lid == null){
                    //标签不存在，需要先存入标签表
                    Label label = new Label();
                    label.setName(labelName);
                    labelMapper.insert(label);
                }
                //现在标签有了，把数据拼接成一个string
                if (i == 0){
                    labelsStr = new StringBuilder(labelName);
                } else {
                    labelsStr.append(",").append(labelName);
                }
            }
        }
        portfolio.setLabels(labelsStr.toString());
        portfolioMapper.insert(portfolio);
        int pid = portfolio.getId();
       
        return pid;
    }

    @Override
    public Page<Portfolio> findAllPortfolio(JSONObject jsonObject) {
//        String labelName = jsonObject.getString("searchName");
//        String portName = jsonObject.getString("searchName");
//        List<Integer> lids = labelMapper.getLabelIdsByLike(labelName);

        String searchName = jsonObject.getString("searchName");
        String author = jsonObject.getString("author");
        
        Integer pageNum = jsonObject.getInteger("pageNum");
        Integer pageSize = jsonObject.getInteger("pageSize");
        IPage<Portfolio> page = new Page<>(pageNum, pageSize);
        return portfolioMapper.findAllPort(searchName,author,page);
    }

    @Override
    public PortDetailVo findPortDetail(JSONObject jsonObject) {
        Integer pid = jsonObject.getInteger("pid");
        //访问一次接口，浏览量+1
        Portfolio portfolio = portfolioMapper.selectById(pid);
        Integer viewnum = portfolio.getViewnum();
        if (viewnum == null){
            viewnum = 1;
        } else {
            viewnum++;
        }
        portfolio.setViewnum(viewnum);
        portfolioMapper.updateById(portfolio);
        return portfolioMapper.findPortDetailByPid(pid);
    }

}
