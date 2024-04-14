package com.example.memories.service.implement;

import com.example.memories.entity.SearchRecentsEntity;
import com.example.memories.exeption.SearchRecentNotFoundException;
import com.example.memories.model.SearchRecents;
import com.example.memories.repository.repositoryJPA.SearchRecentsRepository;
import com.example.memories.repository.repositoryJPA.UsersRepository;
import com.example.memories.service.interfaces.SearchRecentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class SearchRecentServiceImpl implements SearchRecentService {
    @Autowired
    private final SearchRecentsRepository searchRecentsRepository;
    @Autowired
    private final UsersRepository usersRepository;
    @Override
    public List<SearchRecents> getAllSearch() {
        List<SearchRecentsEntity> searchRecentsEntities = searchRecentsRepository.findAll();
        return searchRecentsEntities.stream().map(
                searchRecent -> new SearchRecents(
                        searchRecent.getSearchId(),
                        searchRecent.getKeyword(),
                        searchRecent.getCreateAt(),
                        searchRecent.getUpdateAt(),
                        searchRecent.getUser()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public List<SearchRecents> getAllSearchByUserId(Long userId) {
            List<SearchRecentsEntity> searchRecentsEntities = searchRecentsRepository.findAll();
            return searchRecentsEntities.stream()
                    .filter(search -> search.getUser().getUser_id().equals(userId))
                    .map(
                            searchRecent -> new SearchRecents(
                                    searchRecent.getSearchId(),
                                    searchRecent.getKeyword(),
                                    searchRecent.getCreateAt(),
                                    searchRecent.getUpdateAt(),
                                    searchRecent.getUser()
                            )
                    ).collect(Collectors.toList());
    }

    @Override
    public SearchRecents createSearch(Long userId, SearchRecents searchRecents) throws Exception {
        try {
            SearchRecentsEntity newSearchRecent = new SearchRecentsEntity();
            searchRecents.setCreateAt(LocalDateTime.now());
            searchRecents.setUpdateAt(LocalDateTime.now());
            searchRecents.setUser(usersRepository.findById(userId).isPresent() ? usersRepository.findById(userId).get() : null);
            BeanUtils.copyProperties(searchRecents, newSearchRecent);
            searchRecentsRepository.save(newSearchRecent);
            return searchRecents;
        }
        catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public SearchRecents updateSearch(Long id, SearchRecents searchRecents) throws SearchRecentNotFoundException {
        try {
            SearchRecentsEntity newSearchRecents = searchRecentsRepository.findById(id).isPresent() ? searchRecentsRepository.findById(id).get() : null;
            assert newSearchRecents != null;
            newSearchRecents.setUpdateAt(LocalDateTime.now());
            searchRecentsRepository.save(newSearchRecents);

            SearchRecents updateSearchRecent = new SearchRecents();
            BeanUtils.copyProperties(newSearchRecents, updateSearchRecent);
            return updateSearchRecent;
        }catch (NoSuchElementException e){
            throw new SearchRecentNotFoundException(String.format("Could not found any search with Id %s", id));
        }
    }

    @Override
    public SearchRecents getSearchById(Long id) throws SearchRecentNotFoundException {
        try {
            SearchRecentsEntity searchRecentsEntity = searchRecentsRepository.findById(id).get();
            SearchRecents searchRecents = new SearchRecents();
            BeanUtils.copyProperties(searchRecentsEntity, searchRecents);
            return searchRecents;
        }
        catch (NoSuchElementException e){
            throw new SearchRecentNotFoundException(String.format("Could not found any search with Id %s", id));
        }
    }

    @Override
    public Boolean deleteSearchRecents(Long id) throws SearchRecentNotFoundException {
        try {
            searchRecentsRepository.deleteById(id);
            return true;
        }
        catch (NoSuchElementException e){
            throw new SearchRecentNotFoundException(String.format("Could not found any search with Id %s", id));
        }
    }
}
