package com.dakim.collegeevent.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
@Table(name = "rsos")
public class RSO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String name;

    @Column(name = "rso_description")
    private String description;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "admin_username")
    private User admin;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "university")
    private University university;

    @ManyToMany
    @JoinTable(
            name = "rso_members",
            joinColumns = @JoinColumn(name = "rso_member"),
            inverseJoinColumns = @JoinColumn(name = "rso")
    )
    Set<User> members;

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }
}
