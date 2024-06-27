package com.story.weavers.entity;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class CSVO {
    
    private Integer sid;
    private String stitle;
    private String remarks;
    private String screator;
    private Date updateTime;
    private Integer isend;
    private Date screateTime;
    private Integer pid;
    
    private List<Chapter> chapters;
}
