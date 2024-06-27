package com.story.weavers.service.impl;

import com.story.weavers.entity.Label;
import com.story.weavers.mapper.LabelMapper;
import com.story.weavers.service.LabelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LabelServiceImpl implements LabelService {
    
    @Autowired
    private LabelMapper labelMapper;
    
    @Override
    public List<String> getLabelByName(String name) {
        return labelMapper.getLabelByName(name);
    }

    @Override
    public void saveLabel(String name) {
        Label label = new Label();
        label.setName(name);
        labelMapper.insert(label);
    }
}
