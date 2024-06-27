package com.story.weavers.mapper;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.story.weavers.entity.CSVO;
import com.story.weavers.entity.Chapter;
import com.story.weavers.entity.Label;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChapterMapper extends BaseMapper<Chapter> {
    
    List<JSONObject> getCtitleBySid(@Param("sid") Integer sid);

    List<Chapter> getCAllBySid(@Param("sid") Integer sid);

    Chapter getChapterByCid(@Param("cid") Integer cid);
    
    CSVO findCSVOByAuthor(@Param("author") String author);
    
}
