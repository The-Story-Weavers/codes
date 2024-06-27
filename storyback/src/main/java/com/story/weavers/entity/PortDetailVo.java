package com.story.weavers.entity;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PortDetailVo {

    private Integer id;
    private String ptitle;
    private String introduce;
    private String bgcolor;
    private String creator;
    private String labels;
    private Date createTime;
    private Integer viewnum;
    
    List<Story> stories;
    
}
