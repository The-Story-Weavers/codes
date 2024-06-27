package com.story.weavers.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
        import com.story.weavers.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface UserMapper extends BaseMapper<User> {

     void addUser(@Param("username") String username, @Param("address") String address, @Param("password") String password);

}
