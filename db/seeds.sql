INSERT INTO raffles (title, secret_token, created, winner_id)
VALUES
('NewYork Raffle', 'ghale7', 'April 10, 2024, 2:30 PM', NULL),
('Chicago Raffle', 'lama7', 'April 11, 2024, 3:30 PM', NULL),
('Miami Raffle', 'yonjan7', 'April 12, 2024, 4:30 PM', NULL);



INSERT INTO participants (email, first_name, last_name, phone,raffle_id)
VALUES
('iorton0@imdb.com', 'Ingaberg', 'Orton', '347-656-4563',1), 
('john@imdb.com', 'John', 'Doe', '347-658-9999',1), 
('emma@imdb.com', 'Emma', 'Wright', '347-656-7000',1),
('danyale@imdb.com', 'Danyale', 'Keeper', '347-656-3333',2), 
('katie@imdb.com', 'Katie', 'Simpson', '347-656-4888',2), 
('linda@imdb.com', 'Linda', 'Ray', '347-656-6666',3), 
('anita@imdb.com', 'Anita', 'Grg', '347-000-0003',3);