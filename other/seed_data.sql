USE vms_db_ag;

-- disable foreign key checks to allow clearing tables
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM appointments;
DELETE FROM slots;
DELETE FROM vaccines_stock;
DELETE FROM vaccines;
DELETE FROM hospitals;
-- only delete sample users to avoid locking yourself out if you have other accounts
DELETE FROM users WHERE email IN ('staff@vaxify.com', 'rahul@example.com', 'priya@example.com', 'amit@example.com', 'sneha@example.com');
SET FOREIGN_KEY_CHECKS = 1;

-- 1. create a staff user (login: staff@vaxify.com / password: Abhishek@123)
-- password hash is bcrypt for 'Abhishek@123'
INSERT INTO users (name, email, password, phone, role, created_at) VALUES 
('Abhishek Sharma', 'staff@vaxify.com', '$2a$12$epeG3CWA8zKiFgXC2.PTKOseKZBfJhUp.D/o6s9/BS5e2oOZ0ZQqS', '9876543210', 'STAFF', NOW());

-- 2. create patient users
INSERT INTO users (name, email, password, phone, role, created_at) VALUES 
('Rahul Verma', 'rahul@example.com', '$2a$12$epeG3CWA8zKiFgXC2.PTKOseKZBfJhUp.D/o6s9/BS5e2oOZ0ZQqS', '9000000001', 'USER', NOW()),
('Priya Singh', 'priya@example.com', '$2a$12$epeG3CWA8zKiFgXC2.PTKOseKZBfJhUp.D/o6s9/BS5e2oOZ0ZQqS', '9000000002', 'USER', NOW()),
('Amit Patel', 'amit@example.com', '$2a$12$epeG3CWA8zKiFgXC2.PTKOseKZBfJhUp.D/o6s9/BS5e2oOZ0ZQqS', '9000000003', 'USER', NOW()),
('Sneha Reddy', 'sneha@example.com', '$2a$12$epeG3CWA8zKiFgXC2.PTKOseKZBfJhUp.D/o6s9/BS5e2oOZ0ZQqS', '9000000004', 'USER', NOW());

-- 3. create a hospital (linked to staff user id 1)
INSERT INTO hospitals (name, address, license_number, city, state, pincode, staff_user_id, status, created_at) VALUES
('City Central Vaccination Center', '45th Health Street, Worli', 'LIC-VMS-2024-001', 'Mumbai', 'Maharashtra', '400018', (SELECT id FROM users WHERE email='staff@vaxify.com'), 'APPROVED', NOW());

-- 4. create global vaccines
INSERT INTO vaccines (name, type, manufacturer, stock, capacity, hospital_id, created_at) VALUES
('Covishield', 'Viral Vector', 'Serum Institute of India', 1000, 5000, (SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), NOW()),
('Covaxin', 'Inactivated Virus', 'Bharat Biotech', 800, 3000, (SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), NOW()),
('Sputnik V', 'Viral Vector', 'Gamaleya Research Institute', 150, 1000, (SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), NOW()),
('Corbevax', 'Protein Subunit', 'Biological E. Limited', 45, 1000, (SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), NOW());

-- 5. initialize vaccine stock for hospital 1
INSERT IGNORE INTO vaccines_stock (hospital_id, vaccine_id, quantity, created_at) VALUES
((SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), (SELECT id FROM vaccines WHERE name='Covishield'), 450, NOW()),
((SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), (SELECT id FROM vaccines WHERE name='Covaxin'), 280, NOW()),
((SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), (SELECT id FROM vaccines WHERE name='Sputnik V'), 120, NOW()),
((SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), (SELECT id FROM vaccines WHERE name='Corbevax'), 15, NOW());

-- 6. create time slots for today and tomorrow
INSERT IGNORE INTO slots (hospital_id, slot_date, start_time, end_time, capacity, booked_count, status, created_at) VALUES
((SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), CURDATE(), '09:00:00', '10:00:00', 10, 1, 'AVAILABLE', NOW()),
((SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), CURDATE(), '10:00:00', '11:00:00', 10, 1, 'AVAILABLE', NOW()),
((SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), CURDATE(), '14:00:00', '15:00:00', 10, 1, 'AVAILABLE', NOW()),
((SELECT id FROM hospitals WHERE name='City Central Vaccination Center'), DATE_ADD(CURDATE(), INTERVAL 1 DAY), '09:00:00', '10:00:00', 10, 1, 'AVAILABLE', NOW());

-- 7. create sample appointments
INSERT IGNORE INTO appointments (user_id, slot_id, vaccine_id, status, created_at) VALUES 
((SELECT id FROM users WHERE email='rahul@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') AND slot_date=CURDATE() AND start_time='09:00:00' LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covishield'), 'BOOKED', NOW()),

((SELECT id FROM users WHERE email='priya@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') AND slot_date=CURDATE() AND start_time='10:00:00' LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covishield'), 'BOOKED', NOW()),

((SELECT id FROM users WHERE email='amit@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') AND slot_date=CURDATE() AND start_time='14:00:00' LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covaxin'), 'BOOKED', NOW()),

((SELECT id FROM users WHERE email='sneha@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') AND slot_date=DATE_ADD(CURDATE(), INTERVAL 1 DAY) AND start_time='09:00:00' LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Sputnik V'), 'BOOKED', NOW());

-- 8. add some historical data for the charts (completed & cancelled)
-- distributed across the last 30 days to make the 5-day interval charts look good
INSERT IGNORE INTO appointments (user_id, slot_id, vaccine_id, status, created_at) VALUES 
-- 1-5 days ago (bucket 6)
((SELECT id FROM users WHERE email='rahul@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covishield'), 'COMPLETED', DATE_SUB(NOW(), INTERVAL 2 DAY)),
((SELECT id FROM users WHERE email='priya@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covishield'), 'COMPLETED', DATE_SUB(NOW(), INTERVAL 4 DAY)),

-- 6-10 days ago (bucket 5)
((SELECT id FROM users WHERE email='amit@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covaxin'), 'COMPLETED', DATE_SUB(NOW(), INTERVAL 8 DAY)),

-- 11-15 days ago (bucket 4)
((SELECT id FROM users WHERE email='sneha@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Sputnik V'), 'COMPLETED', DATE_SUB(NOW(), INTERVAL 13 DAY)),

-- 16-20 days ago (bucket 3)
((SELECT id FROM users WHERE email='rahul@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covaxin'), 'COMPLETED', DATE_SUB(NOW(), INTERVAL 18 DAY)),

-- 21-25 days ago (bucket 2)
((SELECT id FROM users WHERE email='priya@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covishield'), 'COMPLETED', DATE_SUB(NOW(), INTERVAL 23 DAY)),

-- 26-30 days ago (bucket 1)
((SELECT id FROM users WHERE email='amit@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Sputnik V'), 'COMPLETED', DATE_SUB(NOW(), INTERVAL 28 DAY)),

-- few cancellations to make the pie chart interesting
((SELECT id FROM users WHERE email='sneha@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covishield'), 'CANCELLED', DATE_SUB(NOW(), INTERVAL 10 DAY)),
((SELECT id FROM users WHERE email='rahul@example.com'), 
 (SELECT id FROM slots WHERE hospital_id=(SELECT id FROM hospitals WHERE name='City Central Vaccination Center') LIMIT 1), 
 (SELECT id FROM vaccines WHERE name='Covaxin'), 'CANCELLED', DATE_SUB(NOW(), INTERVAL 20 DAY));
