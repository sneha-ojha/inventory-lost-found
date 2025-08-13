```md
# Lost & Found Portal

A Node.js + Express application for managing lost and found items.  
This app allows users to add lost items, claim them, and manage claimants.  
It uses EJS for templating and follows an MVC-like folder structure.

---

## Features

- Add new lost items
- View a list of all items
- Edit or delete items
- Add claimants for items
- View claimants
- Environment variable support with `.env`

---

## Project Structure
│── /controllers
│ ├── itemController.js # Handles logic for item routes
│ └── claimantController.js # Handles logic for claimant routes
│
│── /db
│ ├── index.js # Database connection setup
│ └── queries.js # SQL queries for interacting with DB
│
│── /errors
│ └── ClientSideError.js # Custom client-side error handler
│
│── /routes
│ ├── index.js # Main route file
│ ├── items.js # Routes for items
│ └── claimants.js # Routes for claimants
│
│── /views
│ ├── index.ejs # Homepage view
│ ├── /items
│ │ ├── index.ejs # List of items
│ │ ├── new.ejs # Add new item form
│ │ ├── edit.ejs # Edit item form
│ │ └── show.ejs # Single item details
│ └── /claimants
│ ├── index.ejs # List of claimants
│ └── new.ejs # Add new claimant form
│
├── app.js # Main application entry point
├── package.json # Project dependencies & scripts
├── package-lock.json # Dependency lock file
├── .env # Environment variables


---

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project-folder
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**

   * Create a new database
   * Run the SQL scripts to create the required tables (see schema below)

4. **Configure environment variables**
   Create a `.env` file in the root directory:

   ```env
   DB_HOST=localhost
   DB_USER=yourusername
   DB_PASSWORD=yourpassword
   DB_NAME=lostfound
   DB_PORT=5432
   ```

5. **Run the application**

   ```bash
   npm start
   ```

---

## Database Schema

### Users Table

| Column      | Data Type    | Constraints                |
| ----------- | ------------ | -------------------------- |
| id          | SERIAL       | PRIMARY KEY                |
| name        | VARCHAR(100) | NOT NULL                   |
| email       | VARCHAR(255) | UNIQUE, NOT NULL           |
| password    | VARCHAR(255) | NOT NULL                   |
| created\_at | TIMESTAMP    | DEFAULT CURRENT\_TIMESTAMP |

### Items Table

| Column         | Data Type    | Constraints                |
| -------------- | ------------ | -------------------------- |
| id             | SERIAL       | PRIMARY KEY                |
| user\_id       | INTEGER      | REFERENCES users(id)       |
| title          | VARCHAR(255) | NOT NULL                   |
| description    | TEXT         | NOT NULL                   |
| status         | VARCHAR(10)  | NOT NULL (lost/found)      |
| location       | VARCHAR(255) | NOT NULL                   |
| date\_reported | DATE         | NOT NULL                   |
| created\_at    | TIMESTAMP    | DEFAULT CURRENT\_TIMESTAMP |

---

## Usage

1. Report a lost item or find a lost one by filling in the required details.
2. Browse or search the list of reported items and claimants
3. Contact the claimant through the claimant info if any item wrongly claimed

---

## Technologies Used

* **Node.js** & **Express.js**
* **EJS** templating engine
* **PostgreSQL** (with `pg` Node.js client)
* **CSS / TailwindCSS**

---


