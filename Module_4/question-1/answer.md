<!-- Ans 1 : Node.js Architecture -->
 Node.js isn't just a language; it’s a runtime environment that allows JavaScript to run on servers. Its architecture is built like a well-oiled machine with several moving parts:

  **JavaScript Engine (V8)**: This is the "brain" developed by Google. It takes the JavaScript code you write and compiles it directly into machine code that the computer's processor can understand instantly.

  **Node.js Core APIs**: These are built-in libraries (like fs for files or http for networking) that give JavaScript the power to do things it normally can't do in a browser, like talking to your hard drive.

  **Native Bindings**: Since the core of Node is written in C++, and your code is in JavaScript, bindings act as the "glue" or "translator" that lets the two languages talk to each other.

  **Event Loop**: The "heartbeat" of Node.js. It constantly checks if there are tasks to perform and decides when to execute each piece of code, ensuring that the main thread doesn't get stuck on one heavy task.


<!-- Ans 2 : libuv -->
  **libuv** is a multi-platform C library that provides support for asynchronous I/O operations. It serves as the primary engine that enables Node.js to perform non-blocking operations.

   **Definition**: libuv is the underlying library responsible for managing the event loop and handling system-level tasks such as networking, file system access, and child processes.

   **Necessity**: Since the V8 engine is single-threaded, it cannot handle concurrent operations on its own. libuv allows Node.js to delegate these operations to the system kernel or its internal thread pool, ensuring the main execution thread is never blocked while waiting for I/O tasks to complete.

   **Responsibilities:**

    **Event Loop Management**: Orchestrates the execution of callbacks and the order of operations.

    **Asynchronous I/O**: Provides a consistent API for file system and network polling across different operating systems.

    **Thread Pool Management**: Handles tasks that cannot be performed asynchronously at the OS level.

<!-- Ans 3 : Thread Pool -->

    While the Event Loop is single-threaded, libuv maintains a "waiting room" of extra threads called the Thread Pool (usually 4 threads by default).

    *What is it?* A collection of worker threads that can perform tasks in the background.

   * Why use it?* Some tasks are "blocking" or too heavy for the Event Loop to handle without freezing the whole application.

   **Operations handled**: * File I/O: Reading/writing to your disk.

    **Cryptograph**y: Hashing passwords (like bcrypt).

    **Compression**: Zipping files (like zlib).

    **DNS Lookups**: Turning a URL into an IP address.

<!-- Ans 4 : Worker Threads -->
   **Worker Threads** (via the worker_threads module) allow Node.js to execute JavaScript code in parallel on multiple threads.

   **Definition**: They are independent execution environments that run their own instances of V8 and libuv, sharing the same process memory but operating on separate CPU cores.

   **Purpose**: While Node.js excels at I/O-bound tasks, it historically struggled with CPU-intensive operations (e.g., data processing or image manipulation), which would block the main thread. Worker threads allow these heavy computations to be offloaded, maintaining the responsiveness of the main application.

  **Difference between Thread Pool and Worker Threads:**

   **Thread Pool (libuv)**: Managed automatically by the runtime to handle low-level system I/O (like fs or crypto). Developers do not write the code that runs on these threads; they only receive the result.

   **Worker Threads**: Managed explicitly by the developer to run custom JavaScript logic. They are designed for parallelizing application-level logic rather than system-level I/O.




<!-- Ans 5 : Event Loop Queues -->
    To keep things organized, Node.js uses different "buckets" for different types of tasks.

   **Micro Task Queue:** This is the "VIP" queue. It handles things like Process.nextTick() and Promises. Node checks this queue after every single operation. If there is something here, it does it immediately before moving on.

   **Macro Task Queue (or Callback Queue)**: This is the general queue. It handles things like setTimeout, setInterval, and I/O callbacks.

   **Execution Priority: Micro Tasks always win**. If both queues have tasks, Node will finish every single item in the Micro Task queue before it even looks at the Macro Task queue.

    Examples:

    **Micro**: Promise.resolve().then(), queueMicrotask().

    **Macro**: setTimeout(), setImmediate(), fs.readFile() callbacks.



