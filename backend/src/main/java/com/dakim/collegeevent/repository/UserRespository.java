package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRespository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT * FROM users WHERE id=?1", nativeQuery = true)
    User getById(int id);

    @Query(value = "SELECT * FROM users WHERE username=?1", nativeQuery = true)
    User getByUsername(String name);
}
