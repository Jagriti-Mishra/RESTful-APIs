# 📮 RESTful Posts Platform (Quora Clone)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)](https://ejs.co/)
[![REST API](https://img.shields.io/badge/Architecture-RESTful%20APIs-blue?style=for-the-badge)](https://restfulapi.net/)
[![Git](https://img.shields.io/badge/Version%20Control-Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)

A full-stack, server-side rendered (SSR) web application simulating a **Quora-style social posting platform**. Built using **Node.js**, **Express.js**, and **EJS**, this project demonstrates industry-standard **RESTful architectural design**, standard HTTP verbs, and complete **CRUD** (Create, Read, Update, Delete) workflows.

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Core Concepts & Learnings](#-core-concepts--learnings)
- [RESTful Routing Architecture](#-restful-routing-architecture)
- [Protocols & HTTP Methods](#-protocols--http-methods)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Connect With Me](#-connect-with-me)

---

## 🌟 Project Overview

The primary purpose of this project is to master how modern web servers communicate with clients via HTTP requests following **REST (Representational State Transfer)** conventions. It provides a complete interface where users can:
- Browse all published community posts.
- View individual posts in detail.
- Create new posts with dynamic, unique identifiers (`UUID`).
- Edit and update existing post contents via `PATCH` requests.
- Safely delete posts using `DELETE` requests.

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime Environment** | **Node.js** | Asynchronous, event-driven JavaScript backend runtime |
| **Backend Framework** | **Express.js** (v5) | Routing, middleware pipeline, and HTTP server management |
| **Template Engine** | **EJS (Embedded JavaScript)** | Server-side rendering (SSR) of dynamic HTML views |
| **Middleware** | **method-override** | Enables HTML forms to utilize `PATCH` and `DELETE` methods |
| **Data Parsing** | `express.urlencoded` | Decodes incoming URL-encoded form submissions (`req.body`) |
| **Identifiers** | **UUID (v4)** | Generates cryptographically secure, universally unique IDs |
| **Frontend Styling** | **CSS3 & HTML5** | Visual styling, responsive layout, and semantic markup |

---

## 🧠 Core Concepts & Learnings

### 1. RESTful Architecture
* **Resource-Oriented Design:** Everything revolves around resources (in this case, `posts`). Routes are noun-based (`/posts`), and actions are determined strictly by HTTP methods rather than arbitrary URLs (e.g., using `DELETE /posts/:id` instead of `/delete-post?id=...`).
* **Statelessness:** Each request from the client contains all the information the server needs to fulfill it.

### 2. Full CRUD Implementation
* **Create:** Capturing form data via `POST /posts` and appending a newly created object to the store.
* **Read:** Fetching all resources (`GET /posts`) or isolating a single resource by its identifier (`GET /posts/:id`).
* **Update:** Incrementally updating resource contents using `PATCH /posts/:id`.
* **Delete:** Pruning resources using array manipulation (`posts.filter(...)`) via `DELETE /posts/:id`.

### 3. Overcoming HTML Form Limitations (`method-override`)
* Standard HTML forms only support `GET` and `POST` actions.
* Integrated `method-override` middleware to intercept requests with query parameters (e.g., `?_method=PATCH` or `?_method=DELETE`) over a `POST` request, transforming them into authentic RESTful actions on the server.

### 4. Dynamic Server-Side Rendering (SSR) with EJS
* Seamlessly injected JavaScript logic into HTML views using `<% %>` scriptlet tags.
* Rendered dynamic data using `<%= %>` tags.
* Handled scoped iterations (`for (let post of posts)`) to maintain clean local scoping without leaking global variables.

### 5. URL Parameters vs. Request Body
* **Route Parameters (`req.params`):** Used to capture variable path values such as post IDs (`/posts/:id`).
* **Request Body (`req.body`):** Used to transmit payload data from submitted forms using `express.urlencoded({ extended: true })`.

### 6. Robust Error Handling & Defensive Programming
* Validating resource existence (`if (!post) return res.status(404).send("Post not found");`) before rendering detail and edit views to prevent `Cannot read properties of undefined` runtime crashes.
* Managing array operations immutably and defensively using `.filter()` and `.find()`.

---

## 🛣 RESTful Routing Architecture

| Name | HTTP Verb | Route Path | Purpose | Response / View |
| :--- | :---: | :--- | :--- | :--- |
| **Index** | `GET` | `/posts` | Display all posts | Renders `index.ejs` |
| **New** | `GET` | `/posts/new` | Form to create a new post | Renders `new.ejs` |
| **Create** | `POST` | `/posts` | Add new post to server database | Redirects to `/posts` |
| **Show** | `GET` | `/posts/:id` | Display specific post in detail | Renders `show.ejs` |
| **Edit** | `GET` | `/posts/:id/edit` | Form to edit an existing post | Renders `edit.ejs` |
| **Update** | `PATCH` | `/posts/:id` | Update specific post content | Redirects to `/posts` |
| **Destroy** | `DELETE` | `/posts/:id` | Remove a specific post by ID | Redirects to `/posts` |

---

## 🌐 Protocols & HTTP Methods

- **HTTP/1.1 (HyperText Transfer Protocol):** Client-server communication protocol utilized for all request-response cycles.
- **GET (Safe & Idempotent):** Retrieves data without modifying the server state.
- **POST (Non-Idempotent):** Sends data payload in the body to create new resources.
- **PATCH (Non-Idempotent):** Applies partial modifications to a resource (updating only `content` while preserving `id` and `username`).
- **DELETE (Idempotent):** Removes the specified resource permanently from the collection.

---

## 📁 Project Structure

```text
RESTful-APIs/
├── assets/                  # Application screenshots and demo media
│   ├── Screenshot 2026-09-10 233619.png
│   ├── Screenshot 2026-09-10 233638.png
│   └── Screenshot 2026-09-10 233649.png
├── public/                  # Static assets served by Express
│   └── style.css            # Styles for posts, cards, and UI components
├── views/                   # Server-side EJS templates
│   ├── edit.ejs             # Post editing form interface
│   ├── index.ejs            # Feed of all posts with action controls
│   ├── new.ejs              # New post creation form
│   └── show.ejs             # Detailed single post view
├── .gitignore               # Excluded files (node_modules, logs, env)
├── index.js                 # Express server configuration & REST routes
├── package.json             # Project dependencies and metadata
└── README.md                # Comprehensive documentation
```

---

## 📸 Screenshots

| All Posts Feed | Detailed View & Actions |
| :---: | :---: |
| ![All Posts Feed](./assets/Screenshot%202026-09-10%20233619.png) | ![Post Details](./assets/Screenshot%202026-09-10%20233638.png) |

| Edit Post Interface |
| :---: |
| ![Edit Post](./assets/Screenshot%202026-09-10%20233649.png) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jagriti-Mishra/RESTful-APIs.git
   cd RESTful-APIs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   # Using nodemon for hot-reload:
   npx nodemon index.js

   # Or standard node execution:
   node index.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080/posts
   ```

---

## 🤝 Connect With Me

Connect with me on GitHub: [https://github.com/Jagriti-Mishra](https://github.com/Jagriti-Mishra)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Jagriti-Mishra"><b>Jagriti Mishra</b></a>
</p>

