package com.story.weavers.service;

import com.alibaba.fastjson.JSONObject;
import com.story.weavers.entity.CSVO;
import com.story.weavers.entity.Chapter;

import java.util.List;

public interface ChapterService {
    
    int saveChapter(JSONObject jsonObject);

    List<JSONObject> getCtitleBySid(JSONObject jsonObject);

    List<Chapter> getCAllBySid(JSONObject jsonObject);
    
    Chapter getChapterByCid(JSONObject jsonObject);

    CSVO findCSVOByAuthor(JSONObject jsonObject);
    
}
