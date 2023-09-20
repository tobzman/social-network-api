# Social Network API


## Description

The Social Network API is a backend application that provides the functionality for a social network. Users can create accounts, post thoughts, react to thoughts, add and remove friends, and more. This API is built using Node.js, Express.js, MongoDB, and Mongoose.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run the Social Network API on your local machine, you will need to:

1. Clone this repository to your local machine.
2. Make sure you have Node.js and MongoDB installed.
3. Install the project's dependencies by running `npm install` in the project directory.
4. Set up your MongoDB database according to the instructions provided in [Set Up MongoDB](#set-up-mongodb).
5. Start the application by running `npm start`.

## Usage

- Make sure the application is running.
- Use a tool like [Insomnia](https://insomnia.rest/) to interact with the API endpoints.
- Refer to the [API Routes](#api-routes) section for information on available routes and how to use them.
- You can watch a demonstration of the API's functionality in [this walkthrough video](#link-to-walkthrough-video).

## API Routes

The Social Network API provides the following API routes:

- `/api/users`
  - `GET` all users
  - `GET` a single user by ID
  - `POST` create a new user
  - `PUT` update a user by ID
  - `DELETE` delete a user by ID

- `/api/users/:userId/friends/:friendId`
  - `POST` add a friend to a user's friend list
  - `DELETE` remove a friend from a user's friend list

- `/api/thoughts`
  - `GET` all thoughts
  - `GET` a single thought by ID
  - `POST` create a new thought
  - `PUT` update a thought by ID
  - `DELETE` delete a thought by ID

- `/api/thoughts/:thoughtId/reactions`
  - `POST` create a reaction for a thought
  - `DELETE` remove a reaction by ID

For more detailed information on each route and examples of how to use them, refer to the [API documentation](#link-to-walkthrough-video).

## Models

The application uses the following Mongoose models:

- `User`: Represents a user with attributes such as `username`, `email`, `thoughts`, and `friends`.

- `Thought`: Represents a thought with attributes such as `thoughtText`, `createdAt`, `username`, and `reactions`.

- `Reaction` (Subdocument): Represents a reaction with attributes such as `reactionId`, `reactionBody`, `username`, and `createdAt`. This model is used as a subdocument within the `Thought` model for handling reactions to thoughts.

## Contributing

If you would like to contribute to the project, please open an issue or create a pull request on the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Link to Walkthrough Video

[Watch the Walkthrough Video](#link-to-walkthrough-video)

