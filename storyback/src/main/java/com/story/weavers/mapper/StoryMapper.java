package com.story.weavers.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.story.weavers.entity.CSVO;
import com.story.weavers.entity.Label;
import com.story.weavers.entity.Story;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoryMapper extends BaseMapper<Story> {

    Page<CSVO> findAllStory(@Param("stitle") String stitle,@Param("author") String author, @Param("pid") Integer pid, IPage<Story> page);
    
}
