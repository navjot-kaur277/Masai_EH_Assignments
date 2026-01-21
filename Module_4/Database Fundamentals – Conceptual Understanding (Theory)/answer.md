# Database Fundamentals – Conceptual Understanding

### 1. Why `db.json` is Not Suitable for Real Projects
While `db.json` (often used with `json-server`) is excellent for prototyping, it fails in production for several reasons:

* **File-Based Limitations:** To update one piece of data, the entire file must often be read into memory, modified, and rewritten to disk. This is incredibly inefficient as the dataset grows.
* **Lack of Concurrency:** If two users try to write to the file at the exact same millisecond, the file can become corrupted or one user's data will be overwritten (Race Conditions).
* **Performance & Scalability:** As the file size increases, search operations become slow (O(n) complexity) because there are no "indexes" to speed up lookups.
* **Reliability:** Simple JSON files do not have "Atomicity." If the server crashes halfway through a write operation, the entire database file can be corrupted and lost.

---

### 2. Ideal Characteristics of a Database System
A professional Database Management System (DBMS) provides more than just storage; it ensures the "health" of your data:

* **Performance:** Uses **Indexing** (like a book's index) to find data in milliseconds, even among millions of records.
* **Concurrency:** Allows hundreds of users to read and write simultaneously without interfering with each other through locking mechanisms.
* **Data Integrity:** Enforces rules (Constraints). For example, it prevents a user from creating an order for a Product ID that doesn't exist.
* **Reliability & Fault Tolerance:** Uses transaction logs to recover data even if the hardware fails or power is lost.
* **Scalability:** Can be scaled **vertically** (more power to one server) or **horizontally** (spreading data across multiple servers).

---

### 3. Types of Databases and Use Cases



#### **Relational Databases (SQL)**
These store data in structured tables with fixed rows and columns. They use **SQL** (Structured Query Language) and focus on strict relationships.
* **Examples:** PostgreSQL, MySQL, SQL Server.
* **Use Cases:** * **Banking Systems:** Where data consistency and "ACID" compliance are non-negotiable.
    * **Inventory Management:** Where complex relationships between products, suppliers, and orders exist.

#### **Non-Relational Databases (NoSQL)**
These are flexible and can store data as documents, graphs, or key-value pairs. They don't require a fixed schema.
* **Examples:** MongoDB, Redis, Cassandra.
* **Use Cases:** * **Social Media Feeds:** Where different posts might have different types of content (images, polls, text).
    * **Real-time Analytics:** Where high-speed ingestion of varying data types is more important than strict structure.