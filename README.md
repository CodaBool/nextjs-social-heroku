# nextjs-social-heroku

## DB

drop table users CASCADE;
UPDATE users SET admin=true WHERE id=1;
INSERT INTO address(stripe_id, name, line1, line2, postal_code, city, country, state, phone) VALUES ('cus_IUzmfGYBDEX81N', 'new around', '1 big meaty', 'claws', '82343', 'ornasd', 'US', 'WY', '');
INSERT INTO users(email, id, name, password, joined, updated) VALUES ('d@d.com', 'cus_IUzmfGYBDEX81N','dd', 'pass', current_timestamp, current_timestamp);

create table users (
  id           serial                   not null     ,
  email        varchar(255)             not null     ,
  name         varchar(255)             not null     ,
  password     varchar(255)             not null     ,
  active       bool                     default true ,
  admin        bool                     default false,
  joined       timestamp with time zone not null     ,
  updated      timestamp with time zone not null     ,
  UNIQUE(email)                                      ,
  PRIMARY KEY(id)
);

