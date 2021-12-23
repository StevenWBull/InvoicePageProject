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
    VALUES ('Graphic Design Co.', '19 Union Terrace', 'London', 'E1 3EZ', 'United Kingdom');

INSERT INTO leclient (first_name, last_name, email, street, city, postcode, country, frn_lskinid)
    VALUES ('Jensen', 'Huang', 'jensenh@mail.com', '106 Kendell Street', 'Sharrington', 'NR24 5WQ', 'United Kingdom', 1);

INSERT INTO leinvoice (id, created_timestamp, payment_due, payment_terms, description, status, frn_leclientid)
    VALUES ('RT3080', TO_TIMESTAMP('2021-08-18', 'YYYY-MM-DD'), TO_TIMESTAMP('2021-08-19', 'YYYY-MM-DD'), 1, 'Re-branding', 'paid', 1);

INSERT INTO leitem (refname, quantity, price, frn_leinvoiceid)
    VALUES ('Brand Guidelines', 1, 1800.90, 1);

COMMIT;