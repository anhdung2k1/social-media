package com.example.memories.service.interfaces;

import com.example.memories.exeption.SearchRecentNotFoundException;
import com.example.memories.model.SearchRecents;

import java.util.List;

public interface SearchRecentService {
    List<SearchRecents> getAllSearch();
    List<SearchRecents> getAllSearchByUserId(Long userId);
    SearchRecents createSearch(Long userId, SearchRecents searchRecents) throws Exception;
    SearchRecents updateSearch(Long id, SearchRecents searchRecents) throws SearchRecentNotFoundException;
    SearchRecents getSearchById(Long id) throws SearchRecentNotFoundException;
    Boolean deleteSearchRecents(Long id) throws SearchRecentNotFoundException;
}
