package com.story.weavers.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class Label {
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String name;
}
