package com.story.weavers.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.story.weavers.entity.CSVO;
import com.story.weavers.entity.Chapter;
import com.story.weavers.entity.Portfolio;
import com.story.weavers.entity.Story;
import com.story.weavers.mapper.ChapterMapper;
import com.story.weavers.mapper.PortfolioMapper;
import com.story.weavers.mapper.StoryMapper;
import com.story.weavers.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class ChapterServiceImpl implements ChapterService {

    @Autowired
    private ChapterMapper chapterMapper;
    @Autowired
    private StoryMapper storyMapper;
    @Autowired
    private PortfolioMapper portfolioMapper;
    
    @Override
    public int saveChapter(JSONObject jsonObject) {
        Chapter chapter = jsonObject.toJavaObject(Chapter.class);
        chapter.setCcreateTime(new Date());
        chapterMapper.insert(chapter);
        Story story = storyMapper.selectById(chapter.getSid());
        Integer isend = jsonObject.getInteger("isend");
        story.setIsend(isend);
        story.setUpdateTime(new Date());
        storyMapper.updateById(story);
        //处理参与者人数
        Portfolio portfolio = portfolioMapper.selectById(story.getPid());
        Integer authornum = portfolio.getAuthornum();
        if (authornum != null){
            portfolio.setAuthornum(authornum + 1);
        } else {
            portfolio.setAuthornum(1);
        }
        portfolioMapper.updateById(portfolio);
        return chapter.getCid();
    }

    @Override
    public List<JSONObject> getCtitleBySid(JSONObject jsonObject) {
        Integer sid = jsonObject.getInteger("sid");
        return chapterMapper.getCtitleBySid(sid);
    }

    @Override
    public List<Chapter> getCAllBySid(JSONObject jsonObject) {
        Integer sid = jsonObject.getInteger("sid");
        return chapterMapper.getCAllBySid(sid);
    }

    @Override
    public Chapter getChapterByCid(JSONObject jsonObject) {
        Integer cid = jsonObject.getInteger("cid");
        return chapterMapper.getChapterByCid(cid);
    }

    @Override
    public CSVO findCSVOByAuthor(JSONObject jsonObject) {
        String author = jsonObject.getString("author");
        return chapterMapper.findCSVOByAuthor(author);
    }


}
