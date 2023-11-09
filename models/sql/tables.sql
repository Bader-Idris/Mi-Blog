CREATE DATABASE blog;
-- install uuid_generate_v4()
-- before inserting anything, its value -> (uuid_generate_v4())
CREATE TABLE user(
  user_uid UUID PRIMARY KEY
);
CREATE TABLE article(
  article_uid UUID PRIMARY KEY
);
CREATE TABLE category(
  category_uid UUID PRIMARY KEY
);
CREATE TABLE Comment(
  Comment_uid UUID PRIMARY KEY
);
CREATE TABLE image(
  image_uid UUID PRIMARY KEY
);
-- UNIQUE(email)