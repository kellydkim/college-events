package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.RSO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RSORepository extends JpaRepository<RSO, Integer> {
    @Query(value = "SELECT * FROM rsos WHERE name=?1", nativeQuery = true)
    RSO getByName(String name);
}
