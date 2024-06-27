package com.story.weavers.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.story.weavers.entity.PortDetailVo;
import com.story.weavers.entity.Portfolio;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioMapper extends BaseMapper<Portfolio> {

    Page<Portfolio> findAllPort(@Param("searchName") String searchName,@Param("author") String author, IPage<Portfolio> page);

    PortDetailVo findPortDetailByPid(@Param("pid") int pid);
}
