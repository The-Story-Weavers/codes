package com.story.weavers.controller;

import com.story.weavers.service.LabelService;
import com.story.weavers.utils.RestResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/label")
public class LabelController {
    
    @Autowired
    private LabelService labelService;

    @PostMapping("/getLabelByName")
    public RestResult getLabelByName(String name){
        List<String> labelByName = labelService.getLabelByName(name);
        return RestResult.success(labelByName,"查询成功");
    }
    
    @PostMapping("/saveLabel")
    public RestResult saveLabel(String name){
        labelService.saveLabel(name);
        return RestResult.success("插入成功");
    }
}
