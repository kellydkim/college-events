package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRespository extends JpaRepository<User, String> {
    @Query(value = "SELECT * FROM users WHERE id=?1", nativeQuery = true)
    User getById(int id);

    @Query(value = "SELECT * FROM users WHERE username=?1", nativeQuery = true)
    User getByUsername(String name);

    @Transactional
    @Modifying
    @Query(value = "UPDATE users SET role_type=?1 WHERE username=?2", nativeQuery = true)
    void updateRoleByUsername(String role, String username);

    @Query(value = "SELECT name FROM rsos JOIN rso_members ON rsos.id = rso_members.rso JOIN users ON users.username = rso_members.rso_member WHERE username=?1", nativeQuery = true)
    List<String> getAllRsos(String username);
}
