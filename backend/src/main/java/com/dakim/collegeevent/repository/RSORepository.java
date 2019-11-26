package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.RSO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RSORepository extends JpaRepository<RSO, Integer> {
    @Query(value = "SELECT * FROM rsos WHERE name=?1", nativeQuery = true)
    RSO getByName(String name);

    @Query(value = "SELECT * FROM rsos WHERE admin_username=?1", nativeQuery = true)
    List<RSO> getByAdmin(String username);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO rso_members(rso, rso_member) VALUES(?1, ?2)", nativeQuery = true)
    void addRSOMembers(String rso, String rsoMember);
}
