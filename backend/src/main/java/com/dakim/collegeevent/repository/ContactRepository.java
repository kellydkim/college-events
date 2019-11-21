package com.dakim.collegeevent.repository;

import com.dakim.collegeevent.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    @Query(value = "SELECT * FROM contacts WHERE email=?1", nativeQuery = true)
    Contact getByEmail(String email);
}
