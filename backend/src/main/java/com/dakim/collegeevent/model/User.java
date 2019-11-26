package com.dakim.collegeevent.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;


@Entity
@Table(name = "users")
public class User {
    @Id
    private String username;

    @NotBlank
    private String password;

    @Column(name = "profile_image_url")
    private String profileImageURL = "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png";

    @Column(name = "role_type")
    private String role = "student";

    @OneToOne
    @JoinColumn(name = "email")
    private Contact contact;

    @ManyToOne
    @JoinColumn(name = "university")
    private University university;

    @ManyToMany(mappedBy = "members")
    Set<RSO> rsos;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    Set<Comment> comments;

    public Set<RSO> getRsos() {
        return rsos;
    }

    public void setRsos(Set<RSO> rsos) {
        this.rsos = rsos;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfileImageURL() {
        return profileImageURL;
    }

    public void setProfileImageURL(String profileImageURL) {
        this.profileImageURL = profileImageURL;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public University getUniversity() {
        return university;
    }

    public void setUniversity(University university) {
        this.university = university;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }
}
