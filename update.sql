USE `twitterjs`;

ALTER TABLE Users MODIFY pictureUrl VARCHAR(255);
ALTER TABLE Users CHANGE `pictureUrl` `pictureUrl` varchar(255) NOT NULL DEFAULT "/JumpyPanda.jpg";