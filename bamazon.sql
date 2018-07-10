CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(20) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Colgate','Hygiene','3.49','1000'),
       ('Boxing gloves','Sports','49.99','100'),
       ('Bicycle','Sports','129.99','50'),
       ('Blender','Appliances','79.99','50'),
       ('Banana','Food','1.49','700'),
       ('Starbucks Coffee','Food','8.99','500'),
       ('Xbox','Electronics','349.99','200'),
       ('Samsung TV','Electronics','799.99','150'),
       ('iphone 8','Electronics','899.99','200'),
       ('Chiclets','Candy','1.10','1000');

