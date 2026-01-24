<!-- Answers -->

<!-- 1. Definition of Database Relationship -->

A database relationship is a connection between two or more tables in a Relational Database Management System (RDBMS). These connections are established using Primary Keys (a unique ID for a record) and Foreign Keys (a field in one table that refers to the Primary Key in another). Relationships ensure data integrity and reduce redundancy.


<!-- 2. Types of Database Relationships -->

A. One-to-One (1:1)
In this relationship, a single record in Table A is linked to exactly one record in Table B.

E-commerce Example: A User and their User Profile. One user has only one profile, and one profile belongs to only one user.

Application: This is often used to separate sensitive data (like passwords or government IDs) from general user information.

B. One-to-Many (1:N)
This is the most common relationship. A single record in Table A can be linked to multiple records in Table B, but a record in Table B is linked to only one in Table A.

E-commerce Example: Customer and Orders. One customer can place many orders over time, but each specific order belongs to only one customer.

Another Example: Category and Products. One "Electronics" category can contain many products (phones, laptops), but each product typically belongs to one primary category.

C. Many-to-Many (M:N)
In this case, multiple records in Table A can relate to multiple records in Table B. To implement this in SQL, you must use a "Junction Table" (also called a linking or bridge table).

E-commerce Example: Orders and Products.

One order can contain many different products.

One specific product (e.g., a Blue T-shirt) can be part of many different customers' orders.

Implementation: You would create a table called Order_Items that sits between Orders and Products.

D. Self-Referencing Relationship
This occurs when a table has a relationship with itself.

E-commerce Example: Category Hierarchy. A "Sub-category" (like Laptops) has a parent category (like Electronics). Both exist in the same Categories table, where a parent_id column points back to the id in the same table.

