package com.story.weavers.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.story.weavers.entity.CSVO;
import com.story.weavers.entity.Chapter;
import com.story.weavers.entity.Portfolio;
import com.story.weavers.entity.Story;
import com.story.weavers.mapper.ChapterMapper;
import com.story.weavers.mapper.PortfolioMapper;
import com.story.weavers.mapper.StoryMapper;
import com.story.weavers.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class StoryServiceImpl implements StoryService {

    @Autowired
    private StoryMapper storyMapper;

    @Autowired
    private ChapterMapper chapterMapper;

    @Autowired
    private PortfolioMapper portfolioMapper;

    @Override
    public JSONObject saveStory(JSONObject jsonObject) {
        Story story = jsonObject.toJavaObject(Story.class);
        Chapter chapter = jsonObject.toJavaObject(Chapter.class);
        story.setScreateTime(new Date());
        story.setUpdateTime(new Date());
        storyMapper.insert(story);
        Integer sid = story.getSid();
        chapter.setSid(sid);
        chapter.setCcreateTime(new Date());
        chapterMapper.insert(chapter);
        Integer cid = chapter.getCid();
        JSONObject res = new JSONObject();
        res.put("sid",sid);
        res.put("cid",cid);
        //处理故事分支数
        Portfolio portfolio = portfolioMapper.selectById(story.getPid());
        Integer storynum = portfolio.getStorynum();
        if (storynum != null){
            portfolio.setStorynum(storynum + 1);
        } else {
            portfolio.setStorynum(1);
        }
        portfolioMapper.updateById(portfolio);
        return res; 
    }

    @Override
    public Page<CSVO> findAllStory(JSONObject jsonObject) {
        Integer pageNum = jsonObject.getInteger("pageNum");
        Integer pageSize = jsonObject.getInteger("pageSize");
        String stitle = jsonObject.getString("stitle");
        String author = jsonObject.getString("author");
        Integer pid = jsonObject.getInteger("pid");
        IPage<Story> page = new Page<>(pageNum, pageSize);
//        PageHelper.startPage(pageNum,pageSize);
//        return new PageInfo<>(storyMapper.findAllStory(stitle));
        return storyMapper.findAllStory(stitle,author,pid,page);
    }
}
