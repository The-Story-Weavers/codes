package com.story.weavers.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;

@Data
public class Story {
    @TableId(type = IdType.AUTO)
    private Integer sid;
    private String stitle;
    private String remarks;
    private String screator;
    private Date updateTime;
    private Integer isend;
    private Date screateTime;
    private Integer pid;
}
