# Node.js Express Application   BITONIC-WEB
## 1. Dependencies and Modules:
### `require` Statements:
- `path`: Handling file paths.
- `express`: Web application framework for Node.js.
- `hbs`: Handlebars templating engine for Express.
- `uuid`: Generating universally unique identifiers.
- `dotenv`: Loading environment variables from a file.
- `mysql`: MySQL database driver.
- `conn`: Importing a database connection from a file (`"./database/db"`).
- `body-parser`: Parsing incoming request bodies.
- `bcrypt`: Hashing passwords securely.
- `cookie-parser`: Parsing cookie headers.

## 2. Express App Setup:

- **Initializing Express App:** Creating an instance of the Express application (`app`).
- **Setting Up Middleware:**
  - `cookieParser`: Parsing cookies from incoming requests.
  - `express.static`: Serving static files from the "public" directory.
  - `bodyParser.urlencoded`: Parsing URL-encoded data from forms.
  - Configuring the views and template engine (Handlebars).
  - Registering Handlebars partials.

## 3. Routes:

- Defining routes for different pages:
  - Home, about, contact, login, student homepage, teacher homepage, etc.

## 4. Authentication Routes:

- Login routes for students, teachers, admin, and sudo user.
- Logout routes for students, teachers, admin, and sudo user.
- Authentication logic using MySQL queries and bcrypt for hashing passwords.

## 5. SudoUser Files Route:

- A route for serving SudoUser files.

## 6. Common Routes:

- A common route for user signup.

## 7. Authentication Logic:

- There is a route (`/auth/student`) handling the authentication of student logins. It checks the provided email/username and password against the database.

## 8. Server Initialization:

- Setting up the server to listen on port 8888.
- Console logs indicating the server is running.

## 9. General Notes:

- The application seems to use cookies (`bitonicID`) for maintaining user sessions.
- There is error handling in some parts of the code (e.g., handling database query errors).

### Note:

- The provided code assumes the existence of certain directories and files, such as a "public" directory for static files, a "template" directory for views, and a "database/db.js" file for the database connection.
- The actual behavior and features of the application would depend on the content of the templates, the database schema, and other files not provided here.
