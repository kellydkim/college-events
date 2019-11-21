CREATE DATABASE college_events;

USE college_events;

CREATE TABLE universities(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  google_place_id VARCHAR(255) NOT NULL,
  univ_description VARCHAR(255),
  no_of_students INT,
  image_url VARCHAR(255)
);

CREATE TABLE contacts(
  id INT AUTO_INCREMENT PRIMARY KEY,
  f_name VARCHAR(50),
  l_name VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_no VARCHAR(50) NOT NULL
);

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  profile_image_url VARCHAR(255) DEFAULT 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png',
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_type ENUM('super admin', 'admin', 'student') DEFAULT 'student',
  contact_id INT NOT NULL,
  univ_id INT NOT NULL,
  FOREIGN KEY (contact_id) REFERENCES contacts(id),
  FOREIGN KEY (univ_id) REFERENCES universities(id)
);

CREATE TABLE rsos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  rso_description VARCHAR(255),
  admin_id INT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES users(id)
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
  event_name VARCHAR(100) NOT NULL,
  event_description VARCHAR(255),
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  privacy_level ENUM('public', 'private', 'rso event') DEFAULT 'public',
  google_place_id VARCHAR(100) NOT NULL,
  contact_id INT NOT NULL,
  rso_id INT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (contact_id) REFERENCES contacts(id),
  FOREIGN KEY (rso_id) REFERENCES rsos(id)
);

CREATE TABLE categories(
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE tagged_events(
  event_id INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY(category_id) REFERENCES categories(id),
  PRIMARY KEY(event_id, category_id)
);

INSERT INTO
  universities(name, google_place_id)
VALUES
  (
    'University of Central Florida',
    'ChIJZ9k0fGBo54gRMENVJ4UT2kM'
  );

INSERT INTO
  contacts(f_name, l_name, email, phone_no)
VALUES
  (
    'Kelly',
    'Kim',
    'kellydkim@gmail.com',
    '239-745-1767'
  ),
  (
    'Killian',
    'Muollo',
    'killian.muollo@gmail.com',
    '239-850-6441'
  ),
  (
    'Chloe Ann',
    'Barron',
    'ChloeAnn.Barron@gmail.com',
    '904-859-6242'
  ),
  (
    'Kel',
    'Braulio',
    'braulio_kel@yahoo.com',
    '808-295-1865'
  ),
  (
    'Ronald',
    'Rodriguez',
    'RonaldCRodriguez@ucf.edu',
    '425-728-6204'
  ),
  (
    'Grace',
    'Brown',
    '580-856-2435',
    'GraceRBrown@gmail.com'
  ),
  (
    'Michael',
    'Leeuw',
    '343-777-5624',
    'dnleeuw13@gmail.com'
  ),
  (
    'June',
    'Feliciano',
    '646-233-0342',
    'jqjune16@gmail.com'
  ),
  (
    'Jamy',
    'Fiorini',
    '343-077-1863',
    'dffiorini5@ucf.edu'
  ),
  (
    'Olivia ',
    'Hellman',
    '858-722-3265',
    'fnolivia13@gmail.com'
  );

INSERT INTO
  users(username, password, contact_id, univ_id)
VALUES
  ('kellydkim', 'password', 1, 1);

INSERT INTO
  rsos(name, admin_id)
VALUES
  ('ACM-W', 1);

INSERT INTO
  events(
    event_name,
    start_time,
    end_time,
    google_place_id,
    contact_id,
    rso_id
  )
VALUES
  (
    'First General Meeting',
    '2019-11-23 11:00:00',
    '2019-11-23 12:00:00',
    'ChIJV-4yi1xo54gRWdygEqm1dkI',
    1,
    1
  ),
  (
    'Second General Meeting',
    '2019-11-30 11:00:00',
    '2019-11-30 12:00:00',
    'ChIJV-4yi1xo54gRWdygEqm1dkI',
    1,
    1
  );

INSERT INTO
  events(
    event_name,
    start_time,
    end_time,
    event_description,
    google_place_id,
    contact_id,
    rso_id
  )
VALUES
  (
    'Ice Cream Social',
    '2019-11-25 16:00:00',
    '2019-11-25 19:00:00',
    'Come meet our newest members while enjoying some ice cream!',
    'ChIJMU159k9o54gRdk4UnPawsx0',
    1,
    1
  ),
  (
    'Microsoft Interview Prep',
    '2019-11-23 12:00:00',
    '2019-11-23 13:00:00',
    'Come and join us as we prep for upcoming interviews. We highly suggest bringing your resume!',
    'ChIJV-4yi1xo54gRWdygEqm1dkI',
    1,
    1
  );

INSERT INTO
  categories(tag)
VALUES
  ('social'),
  ('general'),
  ('networking');

INSERT INTO
  tagged_events(event_id, category_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (2, 3);