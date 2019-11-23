CREATE DATABASE college_events_test;

USE college_events_test;

CREATE TABLE universities(
  name VARCHAR(100) PRIMARY KEY,
  google_place_id VARCHAR(500) NOT NULL,
  univ_description VARCHAR(10000),
  no_of_students INT,
  image_url VARCHAR(255)
);

CREATE TABLE contacts(
  email VARCHAR(100) PRIMARY KEY,
  f_name VARCHAR(50),
  l_name VARCHAR(50),
  phone_no VARCHAR(50) NOT NULL
);

CREATE TABLE users(
  username VARCHAR(100) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  profile_image_url VARCHAR(500) DEFAULT 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png',
  role_type ENUM('super admin', 'admin', 'student') DEFAULT 'student',
  email VARCHAR(100) NOT NULL,
  university VARCHAR(100) NOT NULL,
  FOREIGN KEY (email) REFERENCES contacts(email),
  FOREIGN KEY (university) REFERENCES universities(name)
);

CREATE TABLE rsos(
  name VARCHAR(100) PRIMARY,
  rso_description VARCHAR(10000),
  admin_username VARCHAR(100) NOT NULL,
  university VARCHAR(100) NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES users(id),
  FOREIGN KEY (univ_id) REFERENCE universities(id)
);

CREATE TABLE rso_members(
  rso_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (rso_id) REFERENCES rsos(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (rso_id, user_id)
);

CREATE TABLE events(
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(500) NOT NULL,
  event_description VARCHAR(10000),
  event_category VARCHAR(255),
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  privacy_level ENUM('public', 'private', 'rso event') DEFAULT 'public',
  google_place_id VARCHAR(500) NOT NULL,
  contact_id INT NOT NULL,
  rso_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (contact_id) REFERENCES contacts(id),
  FOREIGN KEY (rso_id) REFERENCES rsos(id)
);

CREATE TABLE comments(
  id INT AUTO_INCREMENT PRIMARY KEY,
  comment_text VARCHAR(1000) NOT NULL,
  rating INT,
  CHECK(
    rating <= 5
    AND rating >= 0
  ),
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);