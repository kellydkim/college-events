package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UniversityRepository extends JpaRepository<University, Integer> {
    @Query(value = "SELECT * FROM universities WHERE name=?1", nativeQuery = true)
    University getByName(String name);
}
