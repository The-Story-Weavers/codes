package com.story.weavers.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;

@Data
public class Portfolio {

    @TableId(type = IdType.AUTO)
    private Integer id;
    private String ptitle;
    private String introduce;
    private String bgcolor;
    private String creator;
    private String labels;
    private Date createTime;
    private Integer viewnum;
    private Integer authornum;
    private Integer storynum;
}
