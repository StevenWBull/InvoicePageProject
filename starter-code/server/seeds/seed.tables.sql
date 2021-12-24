/* 
*   THIS WILL REMOVE ALL ROWS FROM ALL TABLES AND RESET ALL VALUES TO ORIGINAL
*/

/* 
    CREATE TABLE lskin (
        lskinid SERIAL not null primary key,
        refname VARCHAR not NULL,
        street VARCHAR not null,
        city VARCHAR not null,
        postcode VARCHAR not null,
        country VARCHAR not null,
        created_timestamp TIMESTAMP default null
        deactivated_timestamp TIMESTAMP default null
        is_active BIT default b'1'
    );

    CREATE TABLE leclient (
        leclientid SERIAL not null primary key,
        first_name VARCHAR(50) default null,
        last_name VARCHAR(50) default null,
        email VARCHAR(75) default null,
        street VARCHAR(50) default null,
        city VARCHAR(50) default null,
        postcode VARCHAR(30) default null,
        country VARCHAR(50) default null,
        frn_lskinid INT references lskin (lskinid)
    );

    CREATE TABLE leinvoice (
        leinvoiceid SERIAL not null primary key,
        id VARCHAR(6) not null,
        created_timestamp TIMESTAMP default CURRENT_TIMESTAMP,
        payment_due TIMESTAMP default null,
        description VARCHAR(500) default null,
        payment_terms SMALLINT not NULL,
        status VARCHAR(10) default null,
        frn_leclientid INT references leclient (leclientid),
        deleted_timestamp TIMESTAMP default null
    );

    create table leitem (
        leitemid SERIAL not null primary key,
        created_timestamp TIMESTAMP default CURRENT_TIMESTAMP,
        refname VARCHAR(50) default null,
        quantity SMALLINT default 0,
        price float default null,
        frn_leinvoiceid INT references leinvoice (leinvoiceid),
        deleted_timestamp TIMESTAMP default null
    );
*/

BEGIN;

TRUNCATE TABLE lskin CASCADE;

ALTER SEQUENCE lskin_lskinid_seq RESTART WITH 1;
ALTER SEQUENCE leclient_leclientid_seq RESTART WITH 1;
ALTER SEQUENCE leinvoice_leinvoiceid_seq RESTART WITH 1;
ALTER SEQUENCE leitem_leitemid_seq RESTART WITH 1;

INSERT INTO lskin (refname, street, city, postcode, country)
    VALUES 
        ('Graphic Design Co.', '19 Union Terrace', 'London', 'E1 3EZ', 'United Kingdom');

INSERT INTO leclient (first_name, last_name, email, street, city, postcode, country, frn_lskinid)
    VALUES
        ('Jensen', 'Huang', 'jensenh@mail.com', '106 Kendell Street', 'Sharrington', 'NR24 5WQ', 'United Kingdom', 1),
        ('Alex', 'Grim', 'alexgrim@mail.com', '84 Church Way', 'Bradford', 'BD1 9PB', 'United Kingdom', 1),
        ('John', 'Morrison', 'jm@myco.com', '79 Dover Road', 'Westhall', 'IP19 3PF', 'United Kingdom', 1),
        ('Alysa', 'Werner', 'alysa@email.co.uk', '63 Warwick Road', 'Carlisle', 'CA20 2TG', 'United Kingdom', 1),
        ('Mellisa', 'Clarke', 'mellisa.clarke@example.com', '46 Abbey Row', 'Cambridge', 'CB5 6EG', 'United Kingdom', 1),
        ('Thomas', 'Wayne', 'thomas@dc.com', '3964 Queens Lane', 'Gotham', '60457', 'United States of America', 1),
        ('Anita', 'Wainwright', '', '', '', '', '', 1);

INSERT INTO leinvoice (id, created_timestamp, payment_due, payment_terms, description, status, frn_leclientid)
    VALUES 
        ('RT3080', TO_TIMESTAMP('2021-08-18', 'YYYY-MM-DD'), TO_TIMESTAMP('2021-08-19', 'YYYY-MM-DD'), 1, 'Re-branding', 'paid', 1),
        ('XM9141', TO_TIMESTAMP('2021-08-21', 'YYYY-MM-DD'), TO_TIMESTAMP('2021-08-20', 'YYYY-MM-DD'), 30, 'Graphic Design', 'pending', 2),
        ('RG0314', TO_TIMESTAMP('2021-09-24', 'YYYY-MM-DD'), TO_TIMESTAMP('2021-10-01', 'YYYY-MM-DD'), 7, 'Website Redesign', 'paid', 3),
        ('RT2080', TO_TIMESTAMP('2021-10-11', 'YYYY-MM-DD'), TO_TIMESTAMP('2021-10-12', 'YYYY-MM-DD'), 1, 'Logo Concept', 'pending', 4),
        ('AA1449', TO_TIMESTAMP('2021-10-07', 'YYYY-MM-DD'), TO_TIMESTAMP('2021-10-14', 'YYYY-MM-DD'), 7, 'Re-Branding', 'pending', 5),
        ('TY9141', TO_TIMESTAMP('2021-10-01', 'YYYY-MM-DD'), TO_TIMESTAMP('2021-10-31', 'YYYY-MM-DD'), 30, 'Landing Page Design', 'pending', 6),
        ('FV2353', TO_TIMESTAMP('2021-11-05', 'YYYY-MM-DD'), TO_TIMESTAMP('2021-11-12', 'YYYY-MM-DD'), 7, 'Re-branding', 'paid', 7);

INSERT INTO leitem (refname, quantity, price, frn_leinvoiceid)
    VALUES 
        ('Brand Guidelines', 1, 1800.90, 1),
        ('Banner Design', 1, 156.00, 2),
        ('Email Design', 2, 200, 2),
        ('Website Redesign', 1, 14002.33, 3),
        ('Logo Sketeches', 1, 102.04, 4),
        ('New Logo', 1, 1532.33, 5),
        ('Brand Guidelines', 1, 2500.00, 5),
        ('Web Design', 1, 6155.91, 6),
        ('Logo Re-Design', 1, 3102.04, 7);

COMMIT;