INSERT INTO
  universities
VALUES
  (
    'University of Central Florida',
    'ChIJZ9k0fGBo54gRMENVJ4UT2kM',
    'The University of Central Florida is a state university in Orlando, Florida. It has more students enrolled on campus than any other U.S. university.',
    66183,
    'https://www.ucf.edu/news/files/2019/02/UCF-Millican-Hall.jpg'
  ),
  (
    'University of South Florida',
    'EhxFIEZvd2xlciBBdmUsIFRhbXBhLCBGTCwgVVNBIi4qLAoUChIJkWfec9rHwogRlKY4_wNDqNMSFAoSCeHRubOCt8KIEWO0lq-JE1-n',
    'The University of South Florida is a public research university in Tampa, Florida. It is a member institution of the State University System of Florida. Founded in 1956, USF is the fourth-largest public university in the state of Florida, with an enrollment of 50,755 as of the 2018–2019 academic year.',
    49591,
    'https://wusfnews.wusf.usf.edu/sites/wusf/files/styles/medium/public/201708/8-8-17_USF_Stadium_Zone1m.jpg'
  );

INSERT INTO
  contacts
VALUES
  (
    'kellydkim@gmail.com',
    'Kelly',
    'Kim',
    '239-745-1767'
  ),
  (
    '__aedwards@gmail.com',
    'Adam',
    'Edwards',
    '407-532-1457'
  ),
  (
    'littelgreg@gmail.com',
    'Greg',
    'Littel',
    '407-943-1549'
  ),
  (
    'helloellie@gmail.com',
    'Ellie',
    'Schwartz',
    '813-945-2304'
  ),
  (
    'dan_muollens@gmail.com',
    'Daniel',
    'Muollens',
    '312-420-3045'
  );

INSERT INTO
  users(username, password, role_type, email, university)
VALUES
  (
    'kellydkim',
    'password',
    'super admin',
    'kellydkim@gmail.com',
    'University of Central Florida'
  ),
  (
    'aedwards',
    'password',
    'admin',
    '__aedwards@gmail.com',
    'University of Central Florida'
  ),
  (
    'gregl',
    'password',
    'student',
    'littelgreg@gmail.com',
    'University of South Florida'
  ),
  (
    'helloellie',
    'password',
    'student',
    'helloellie@gmail.com',
    'University of Central Florida'
  ),
  (
    'dan_muollens',
    'password',
    'admin',
    'dan_muollens@gmail.com',
    'University of South Florida'
  );

INSERT INTO
  rsos(
    name,
    rso_description,
    admin_username,
    university
  )
VALUES
  (
    'Pride Student Association',
    'Pride Student Association is committed to celebrating and unifying the LGBTQ+ community on the UCF campus. PSA allows students to network and socialize through consistent meetings and events put on by PSA and other local affiliates. PSA will allow LGBTQ+ students to engage in discussion about current events affecting the community along with critical discussion of intersectionality. PSA will strive to include gender and sexual minorities that are often neglected in the larger conversation of the LGBTQ+ community. PSA will allow students to engage in social and political outreach for representatives and candidates that share the goal of LGBTQ+ inclusion and acceptance. PSA aims to host events educating and raising awareness of the LGBTQ+ community for the UCF student body and local residents.',
    'aedwards',
    'University of Central Florida'
  ),
  (
    'CSD Student Steering Committee',
    'The purpose of the Student Steering Committee is to improve student success and engagement via mentoring and building a sense of community. It is the goal of this committee to create ways for all CSD students to connect and empower one another to advocate for their needs and be successful during their undergraduate education at the University of South Florida',
    'dan_muollens',
    'University of South Florida'
  );

INSERT INTO
  rso_members
VALUES
  (1, 'helloellie'),
  (2, 'gregl');

INSERT INTO
  events(
    event_name,
    event_description,
    event_category,
    start_time,
    end_time,
    privacy_level,
    google_place_id,
    contact,
    university,
    rso
  )
VALUES
  (
    'First General Body Meeting',
    'PSA will be hosting its first General Body Meeting in the Social Justice and Advocacy Lounge (located on the 2nd floor of the Student Union, in the back right of OSI) on Wednesday, Sept. 11 from 5-6:30! Come join us to meet our officers, learn about PSA and what we have to offer, and meet new people!',
    'General Meeting',
    '2019-11-27 13:00:00.000',
    '2019-11-27 13:00:00.000',
    'rso event',
    'ChIJV-4yi1xo54gRWdygEqm1dkI',
    '__aedwards@gmail.com',
    'University of Central Florida',
    1
  ),
  (
    'CSD Survival Skills Training',
    'Presenters will be sharing valuable information on Test Taking and Study Strategies, Surviving Stress, Undergraduate Research, Global Issues in CSD, Grad School Applications, Professionalism, Getting Involved in the Deaf Community, and Resume Building. Lunch will be provided',
    'Workshop',
    '2019-11-18 16:00:00.000',
    '2019-11-18 19:00:00.000',
    'rso event',
    '"ChIJ4dG5s4K3wogRY7SWr4kTX6c"',
    'dan_muollens@gmail.com',
    'University of South Florida',
    2
  );

INSERT INTO
  comments(comment_text, user, event_id)
VALUES
  (
    "Can't wait to see y'all! Excited for the new faces",
    'helloellie',
    1
  );

INSERT INTO
  comments(comment_text, rating, user, event_id)
VALUES
  (
    'This was super informational. I got to meet a lot of great people. Thanks for the great time and lunch!',
    5,
    'gregl',
    2
  );