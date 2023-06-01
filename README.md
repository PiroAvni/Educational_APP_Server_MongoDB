 ## Installation

- Clone the repository to your local machine
- Install the required dependencies by running the following command: ```"npm install"```. This will download and install all the necessary packages and libraries specified in the package.json file.
 
## Environment Variables

Before running the application, you need to set up the following environment variables:

- `PORT`: The desired port number for running the server.
- `MONGODB_URL`: The URL for connecting to your MongoDB database.

To set up these variables, create a new file called `.env`. 

## Database Setup

- To set up the database, run the following command in your terminal: ```"npm run setup-db"```

## How To run the server

- Execute the following command in your terminal to start the server: ```"npm run dev"```

## How To run the test

To run the tests, follow these steps:

- Ensure that all project dependencies are installed by running ```"npm install"```.
- Run the command ```"npm run test"``` in the terminal.
- The tests will be executed, and the results will be displayed in the terminal.

## API Endpoints

### Planning

When designing the database schema for the Flashcard App, we carefully considered the relationships between different entities and the necessary fields to store relevant information. This planning stage ensures a well-structured and organized database model. Below is an overview of the entities and their relationships:

![Screenshot 2023-05-31 at 22 09 46](https://github.com/PiroAvni/Educational_APP_Server_MongoDB/assets/112406576/25b82173-7a45-4cb3-be6c-3b0c2f457bfb)
![Screenshot 2023-05-31 at 22 09 52](https://github.com/PiroAvni/Educational_APP_Server_MongoDB/assets/112406576/434e8134-be0c-44e7-b864-d70924c2013a)

The Flashcard App API provides the following endpoints:


### Users

| Endpoint                 | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `POST /api/users`        | Creates a new user.                                               |
| `POST /api/users/logout` | Authenticates a user and generates an access token.               |
| `POST /api/users/logout` | Logs out the currently authenticated user.                        |
| `GET /api/users/profile` | Retrieves the profile information of the authenticated user       |
| `PUT /api/users/profile` | Updates the profile information of the authenticated user         |

### Categories

| Endpoint                 | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `GET /api/categories`         | Retrieves a list of all categories.                          |
| `POST /api/categories`        | Creates a new category.                                      |
| `GET /api/categories/{id}`.   | Retrieves the categories with the specified `id`.            |
| `PATCH /api/categories/{id}`. | Updates the category with the specified `id`.                |
| `DELETE /api/categories/{idd}`| Deletes the category with the specified `id`.                |

### Decks

| Endpoint                 | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `GET /api/deck`         | Retrieves a list of all decks.                                    |
| `POST /api/deck`        | Creates a new deck.                                               |
| `GET /api/deck/{id}`    | Retrieves the deck with the specified `id`.                       |
| `PATCH /api/deck/{id}`. | Updates the deck with the specified `id`.                         |
| `DELETE /api/deck/{id}` | Deletes the deck with the specified `id`.                         |

### Cards

| Endpoint                 | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `GET /api/cards`         | Retrieves a list of all cards.                                    |
| `POST /api/cards`        | Creates a new cards.                                              |
| `GET /api/cards/{id}`.   | Retrieves the card with the specified `id`.                       |
| `PATCH /api/cards/{id}`. | Updates the card with the specified `id`.                         |
| `DELETE /api/cards/{id}` | Deletes the card with the specified `id`.                         |

### Progress

| Endpoint                 | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `GET /api/progress`         | Retrieves progress information for all users.                  |
| `POST /api/progress`        | Creates a new cards.                                           |
| `GET /api/progress/{id}`.   | Retrieves the progress entry with the specified `id`.          |
| `PATCH /api/progress/{id}`. | Updates the progress entry with the specified `id`.            |
| `DELETE /api/progress/{id}` | DDeletes the progress entry with the specified  `id`.          |

### Bookmarks

| Endpoint                 | Description                                                       |
|--------------------------|-------------------------------------------------------------------|
| `GET /api/bookmarks`         | Retrieves bookmarks information for all users.                |
| `POST /api/bookmarks`        | Creates a new bookmark entry.                                 |
| `GET /api/bookmarks/{id}`.   | Retrieves the bookmark entry with the specified `id`.         |
| `PATCH /api/bookmarks/{id}`. | Updates the bookmark entry with the specified `id`.           |
| `DELETE /api/bookmarks/{id}` | Deletes the bookmark entry with the specified  `id`.          |


# Technologies
  
## Dependencies

* Node
* express
* bcryptjs
* cors
* dotenv
* morgan
* body-parser
* jsonwebtoken
* mongodb
* mongoose
* express-async-handler
* cookie-parser


## Dev Dependencies
- jest
- nodemon
- supertest
