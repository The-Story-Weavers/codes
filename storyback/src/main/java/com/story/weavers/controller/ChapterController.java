package com.story.weavers.controller;

import com.alibaba.fastjson.JSONObject;
import com.story.weavers.entity.CSVO;
import com.story.weavers.entity.Chapter;
import com.story.weavers.service.ChapterService;
import com.story.weavers.utils.RestResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chapter")
public class ChapterController {
    
    @Autowired
    private ChapterService chapterService;

    @PostMapping("/saveChapter")
    public RestResult saveChapter(@RequestBody JSONObject jsonObject){
        int cid = chapterService.saveChapter(jsonObject);

        return RestResult.success(cid,"保存成功");
    }

    //根据故事id查章节目录
    @PostMapping("/getCtitleBySid")
    public RestResult getCtitleBySid(@RequestBody JSONObject jsonObject){
        List<JSONObject> ctitleBySid = chapterService.getCtitleBySid(jsonObject);
        return RestResult.success(ctitleBySid,"查询成功");
    }
    
    //根据故事id查询所有章节的全部内容
    @PostMapping("/getCAllBySid")
    public RestResult getCAllBySid(@RequestBody JSONObject jsonObject){
        List<Chapter> cAllBySid = chapterService.getCAllBySid(jsonObject);
        return RestResult.success(cAllBySid,"查询成功");
    }

    //根据章节id查询章节的全部内容
    @PostMapping("/getChapterByCid")
    public RestResult getChapterByCid(@RequestBody JSONObject jsonObject){
        Chapter chapter = chapterService.getChapterByCid(jsonObject);
        return RestResult.success(chapter,"查询成功");
    }

    //根据个人作品
    @PostMapping("/findCSVOByAuthor")
    public RestResult findCSVOByAuthor(@RequestBody JSONObject jsonObject){
        CSVO csvoByAuthor = chapterService.findCSVOByAuthor(jsonObject);
        return RestResult.success(csvoByAuthor,"查询成功");
    }
    
    
}
