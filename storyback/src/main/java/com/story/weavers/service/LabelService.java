package com.story.weavers.service;

import java.util.List;

public interface LabelService {
    
    List<String> getLabelByName(String name);
    
    void saveLabel(String name);
}
