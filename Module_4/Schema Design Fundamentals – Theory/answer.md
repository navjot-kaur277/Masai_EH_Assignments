

1. What schema design is and what a database schema represents?

A database schema is basically a map for your data. It shows how everything's stored and connected. Think of it like a building's blueprint. It tells you where the tables are, what kind of data they hold (like numbers or words), and how those tables talk to each other. It's all about the structure, not the actual data.

2. Why schema design is required before writing backend code?

When building a backend, it's tempting to just jump into writing code. But planning your schema first is super important because:

*   It saves effort: Changing your database later after tons of code is written can mean rewriting everything.
*   It keeps things the same: Everyone knows what a User or Order looks like, so you don't end up with messed-up data.

3. How poor schema design impacts data consistency, maintenance, and scalability

A messy schema can cause big headaches:

*   Data gets mixed up: A user's phone number might be correct in one spot but wrong in another.
*   Changing things is scary: You're afraid of breaking something.
*   Things slow down: As your app grows, searches get really slow and your app might crash.

4. What validations are in schema design and why databases enforce validations (for example: NOT NULL, UNIQUE, DEFAULT, PRIMARY KEY)

Validations are rules that keep junk data out of your system.

*   PRIMARY KEY: A unique ID.
*   NOT NULL: This field can't be empty.
*   UNIQUE: No duplicates allowed.
*   DEFAULT: A backup value.

5. The difference between a database schema and a database table

The schema is the whole library, and a table is a specific book inside it.

6. Why a table should represent only one entity

A table should only be about one thing. A Users table should only have user info. Don't mix products, or you'll make a mess.

7. Why redundant or derived data should be avoided in table design

Don't store the same info in multiple places.

*   Redundant Data: Like storing a customer's address in two tables. Update it in one, and you forget the other.
*   Derived Data: Like a Grand Total. It's better to calculate it than store it, or it might become wrong.

8. The importance of choosing correct data types while designing tables

Choosing between a number and text is a big deal.

*   Storage: The right type saves space.
*   Speed: Numbers are easier to search than text.
*   Accuracy: If you set a column to Date, you won't get Tuesday-ish in there.
