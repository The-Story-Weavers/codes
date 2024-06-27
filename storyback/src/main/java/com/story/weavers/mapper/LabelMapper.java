package com.story.weavers.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.story.weavers.entity.Label;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabelMapper extends BaseMapper<Label> {
    
    List<String> getLabelByName(@Param("name") String name);
    
    Integer getLabelIdByName(@Param("name") String name);

    List<Integer> getLabelIdsByLike(@Param("name") String name);
    
    void savePortLabel(@Param("pid") int pid,@Param("lid") int lid);
}
