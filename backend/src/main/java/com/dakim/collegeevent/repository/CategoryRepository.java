package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
