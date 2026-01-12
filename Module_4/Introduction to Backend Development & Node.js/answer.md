<!-- Ans 1 : Role of Frontend(FE) -->
The Frontend is the "face" of the website. It is everything a user sees, touches, and experiences directly in their browser.

   **User Interface (UI)**: This is the visual layout—the colors, fonts, buttons, and images. It’s built using HTML (structure), CSS (style), and JavaScript (behavior) to ensure the site looks good on both laptops and phones.

   **User Interaction**: The frontend handles how the site reacts when you click a button, scroll down, or fill out a form. It provides immediate feedback, like a loading spinner or a "thank you" message.

   **Communication with Backend**: The frontend doesn't hold the "brains" of the app. Instead, it sends requests to the backend (like "Hey, log this user in") and waits for a response to **display the data.

<!-- Ans 2 : Role of Backend (BE) -->
If the frontend is the dining room of a restaurant, the Backend is the kitchen. It’s where the heavy lifting happens away from the user’s eyes.

   **Server-side Processing**: This is the logic layer. When you click "buy" on a site, the backend calculates the tax, checks if the item is in stock, and processes the payment.

   **Database Handling**: The backend is responsible for "talking" to the database. It saves your profile info, retrieves your post history, and ensures data is organized and accessible.

   **Security and Authentication**: This is the gatekeeper. The backend verifies passwords, ensures you are who you say you are, and protects sensitive data from being accessed by the wrong people.

<!-- Ans 3 : Business Logic -->
Business Logic is the set of "rules" that dictate how data is handled to solve a specific business problem. It’s the "why" behind the code.

Real-world Examples:

   **E-commerce**: A rule that says "If a customer spends over $50, apply a 10% discount and provide free shipping."

   **Banking**: A rule that checks "Does the user have enough balance to withdraw $100? If yes, deduct the amount; if no, decline the transaction."

   **Social Media**: A logic that determines "Only show this private post to people who are on the user's 'Friends' list."

<!-- Ans 4 : Client–Server Model -->
This is the fundamental way the internet works—a constant conversation between two parties.

   **The Client**: Usually your web browser (Chrome, Safari) or a mobile app. It is the party that requests information.

   **The Server**: A powerful computer sitting in a data center that "serves" the requests. It holds the website’s files and data.

  **Communication**: They talk via HTTP/HTTPS. The client sends a "Request" (e.g., "Show me my profile page") and the server sends back a "Response" (e.g., the HTML and images for that page).

<!-- Ans 5 : Three-Tier Architecture  -->
This is a way of organizing an application into three logical layers so they are easier to manage and scale.

  **Presentation Layer** : The top level (Frontend). It’s what the user interacts with.

  **Application (Business) Layer** : The middle level. This is where the business logic lives; it processes the data and makes decisions.

  **Data Layer**: The bottom level. This consists of databases or file systems where the actual information is stored.

**Why use it?** It makes the app **scalable and secure.** If you need to change your database, you don't have to rewrite your entire UI—you only update the Data Layer.

<!-- Ans 6 : JavaScript as a Backend Language -->
Historically, JavaScript lived only in the browser. But with the invention of Node.js, it moved to the server.

  **Performance**: JavaScript uses an "Event-Driven, Non-blocking I/O" model. This means it can handle thousands of concurrent connections at once without getting stuck, making it incredibly fast for real-time apps like chat or streaming.

  **Ecosystem**: It has NPM (Node Package Manager), which is the largest library of pre-written code in the world. Developers don't have to reinvent the wheel for every feature.

  **Popular Frameworks**: * Express.js: The most popular, minimal framework for building APIs.

      *NestJS*: Great for large-scale, structured enterprise applications.

      *Fastify*: Focused on extremely low overhead and high speed.



<!-- Ans 7 : -->