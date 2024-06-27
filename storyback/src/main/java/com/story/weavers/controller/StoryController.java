package com.story.weavers.controller;

import com.alibaba.fastjson.JSONObject;
import com.story.weavers.service.StoryService;
import com.story.weavers.utils.RestResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/story")
public class StoryController {
    
    @Autowired
    private StoryService storyService;

    @PostMapping("/saveStory")
    public RestResult saveStory(@RequestBody JSONObject jsonObject){
        JSONObject res = storyService.saveStory(jsonObject);
        return RestResult.success(res,"保存成功");
    }

    @PostMapping("/findAllStory")
    public RestResult findAllStory(@RequestBody JSONObject jsonObject){
        return RestResult.success(storyService.findAllStory(jsonObject),"保存成功");
    }

}
