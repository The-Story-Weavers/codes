package com.story.weavers.controller;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.story.weavers.entity.User;
import com.story.weavers.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import cn.hutool.core.lang.Dict;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class testUser {

    @Autowired
    private UserMapper userMapper;

    @GetMapping("/test")
    public String test(){
        //lambdaQuery
        List<User> users = userMapper.selectList(Wrappers.<User>lambdaQuery()
                .eq(User::getAge,22));

        //selectById
        User user = userMapper.selectById(1);

        //普通条件查询
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.ge("age",21);
        userMapper.selectList(wrapper);

        //根据条件更新
        LambdaUpdateWrapper<User> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.eq(User::getId,1)
                .set(User::getAge,19);

        User user1 = new User();
        user1.setEmail("qq.com");

        userMapper.update(user1,updateWrapper);

        //分页，需要config文件
        Page<User> page = new Page<>(1, 2);
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.ge("age",21);

        IPage<User> mapIPage = userMapper.selectPage(page, queryWrapper);
        System.out.println(mapIPage.getRecords());


        //System.out.println(user);


        //System.out.println(dict);

        return "te";
    }

    @GetMapping("/tester")
    public String tester(){
        userMapper.addUser("jack","tt","123");
        return "er";
    }

}
