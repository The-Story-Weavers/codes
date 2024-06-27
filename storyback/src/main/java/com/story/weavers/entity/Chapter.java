package com.story.weavers.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.Date;

@Data
public class Chapter {

    @TableId(type = IdType.AUTO)
    private Integer cid;
    private Integer sid;
    private String ctitle;
    private String content;
    private String author;
    private Date ccreateTime;
    
}
