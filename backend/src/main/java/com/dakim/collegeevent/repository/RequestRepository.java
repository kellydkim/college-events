package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface RequestRepository extends JpaRepository<Request, Integer> {
    @Modifying
    @Query(value = "DELETE FROM requests WHERE id=?1", nativeQuery = true)
    void deleteById(Integer id);
}
