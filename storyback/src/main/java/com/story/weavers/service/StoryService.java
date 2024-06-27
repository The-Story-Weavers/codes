package com.story.weavers.service;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.story.weavers.entity.CSVO;
import com.story.weavers.entity.Story;

import java.util.List;

public interface StoryService {

    JSONObject saveStory(JSONObject jsonObject);

    Page<CSVO> findAllStory(JSONObject jsonObject);
    
}
