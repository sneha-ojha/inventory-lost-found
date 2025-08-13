# Lost & Found Portal

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![EJS](https://img.shields.io/badge/EJS-100000?style=for-the-badge&logo=ejs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

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

```

│── /controllers
│   ├── itemController.js        # Handles logic for item routes
│   └── claimantController.js    # Handles logic for claimant routes
│
│── /db
│   ├── index.js                 # Database connection setup
│   └── queries.js               # SQL queries for interacting with DB
│
│── /errors
│   └── ClientSideError.js       # Custom client-side error handler
│
│── /routes
│   ├── index.js                 # Main route file
│   ├── items.js                 # Routes for items
│   └── claimants.js             # Routes for claimants
│
│── /views
│   ├── index.ejs                # Homepage view
│   ├── /items
│   │   ├── index.ejs            # List of items
│   │   ├── new.ejs              # Add new item form
│   │   ├── edit.ejs             # Edit item form
│   │   └── show.ejs             # Single item details
│   └── /claimants
│       ├── index.ejs            # List of claimants
│       └── new.ejs              # Add new claimant form
│
├── app.js                       # Main application entry point
├── package.json                 # Project dependencies & scripts
├── package-lock.json            # Dependency lock file
├── .env                         # Environment variables

```

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project-folder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**

   * Create a new database
   * Run SQL scripts to create the tables (see schema below)

4. **Configure environment variables**
   Create a `.env` file:

   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=ims
   DB_PORT=5432
   NODE_ENV=development
   ```

5. **Run the application**

   ```bash
   npm start
   ```

   Or for development:

   ```bash
   npm run dev
   ```

---

## Database Schema

### **claimants**

| Column      | Type      | Nullable | Default | Constraints                      |
| ----------- | --------- | -------- | ------- | -------------------------------- |
| rollno      | bigint    | NO       |         | PK                               |
| name        | varchar   | NO       |         |                                  |
| email       | varchar   | NO       |         | UNIQUE                           |
| updated\_at | timestamp | YES      | now()   |                                  |
| found\_at   | timestamp | YES      |         |                                  |
| item\_id    | integer   | YES      |         | FK → items(id) ON DELETE CASCADE |

---

### **claims**

| Column           | Type      | Nullable | Default                    | Constraints                              |
| ---------------- | --------- | -------- | -------------------------- | ---------------------------------------- |
| id               | integer   | NO       | nextval('claims\_id\_seq') | PK                                       |
| item\_id         | integer   | YES      |                            | FK → items(id) ON DELETE CASCADE         |
| claimant\_rollno | bigint    | YES      |                            | FK → claimants(rollno) ON DELETE CASCADE |
| date\_claimed    | timestamp | YES      | now()                      |                                          |
| notes            | text      | YES      |                            |                                          |
| created\_at      | timestamp | YES      | now()                      |                                          |
| updated\_at      | timestamp | YES      | now()                      |                                          |

---

### **items**

| Column       | Type      | Nullable | Default                   | Constraints                              |
| ------------ | --------- | -------- | ------------------------- | ---------------------------------------- |
| id           | integer   | NO       | nextval('items\_id\_seq') | PK                                       |
| title        | varchar   | NO       |                           |                                          |
| description  | text      | YES      |                           |                                          |
| reported\_at | timestamp | NO       | CURRENT\_TIMESTAMP        |                                          |
| location     | varchar   | YES      |                           |                                          |
| status       | varchar   | YES      | 'lost'                    |                                          |
| roll         | bigint    | YES      |                           | FK → claimants(rollno) ON DELETE CASCADE |
| category     | varchar   | NO       |                           |                                          |

---

## API Endpoints

### Home
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | `/`      | Render homepage (`index.ejs`) |

### Items
| Method | Endpoint             | Description                        |
| ------ | ------------------  | ---------------------------------- |
| GET    | `/items`            | List all items                     |
| GET    | `/items/new`        | Show form to add a new item        |
| POST   | `/items`            | Create a new item                  |
| GET    | `/items/:id`        | View single item details           |
| GET    | `/items/:id/edit`   | Show form to edit an item          |
| POST   | `/items/:id/edit`   | Update item                        |
| POST   | `/items/:id/delete` | Delete item                        |
| GET    | `/items/search`     | Search items (optional)            |

### Claimants
| Method | Endpoint                     | Description                        |
| ------ | ---------------------------- | ---------------------------------- |
| GET    | `/claimants`                 | List all claimants                 |
| GET    | `/claimants/new`             | Show form to add a new claimant    |
| POST   | `/claimants`                 | Create a new claimant              |
| POST   | `/claimants/:rollno/delete` | Delete a claimant                  |
| GET    | `/claimants/search`          | Search claimants (optional)        |

---

## Technologies Used

* **Node.js** & **Express.js**
* **EJS** templating engine
* **PostgreSQL** (with `pg` Node.js client)
* **dotenv** for environment variables
* **HTML**, **CSS / TailwindCSS**, **JavaScript**
---