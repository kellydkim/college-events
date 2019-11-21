package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    @Query(value = "SELECT * FROM events WHERE start_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY) ORDER BY start_time", nativeQuery = true)
    List<Event> getUpcoming();

}
