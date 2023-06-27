# Bookscovr 

[![License: MIT](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

## Description

<strong>Introducing Bookscovr!</strong>
<br>
Bookscovr is a full-stack MERN (MongoDB, Express.js, React, and Node.js) application that allows users to search for books using the Google Books API and save them to their account. The application has been refactored to use a GraphQL API built with Apollo Server, providing improved performance and flexibility. It includes authentication using JSON Web Tokens (JWT) and provides a seamless user experience for searching, saving, and managing books.

<br>
    
## Table Of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Tests](#tests)
- [Questions](#questions)
- [Tool URL](#toolurl)
- [Technologies](#technologies)
- [License](#license)

## Installation <a id="installation"></a>

To install and run the Bookscovr locally, follow these steps:

1. Clone the repository.
2. Navigate to the project's root directory.
3. Run `npm install` to install the necessary dependencies.
4. Set up a MongoDB database (you can use MongoDB Compass).
5. Create a `.env` file in the root directory and add the following environment variables:

`JWT_SECRET=<your JWT secret key>`

6. Run `npm run develop` to start the development server.
7. Open your browser and visit http://localhost:3000 to access the application.

## Usage <a id="usage"></a>

Bookscovr allows users to search for books, save them to their account, and manage their saved books. The main features and user interactions include:

1. Searching for books by entering a search term in the search input field and clicking the submit button.
2. Viewing search results that display book information, including the title, author, description, image, and a link to the book on the Google Books site.
3. Authenticating and creating a user account by clicking on the Login/Signup menu option, entering the required information, and clicking the signup button.
4. Logging in with a registered account by clicking on the Login/Signup menu option, entering the email address and password, and clicking the login button.
5. Saving a book to the user's account by clicking the Save button on a book from the search results.
6. Viewing saved books by clicking on the option to see my saved books. Saved books are displayed with their title, author, description, image, and a link to the book on the Google Books site.
7. Removing a book from the saved books list by clicking the Remove button on a book.
8. Logging out of the site by clicking the Logout button.

## Contributions <a id="contributions"></a>

Contributions to the 21 MERN: Book Search Engine are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes in the branch.
4. Commit your changes with descriptive commit messages.
5. Push your changes to your forked repository.
6. Submit a pull request explaining your changes.

## Tests <a id="tests"></a>

This project does not currently have automated tests. Contributions to add tests are welcome.

## Questions <a id="questions"></a>

If you have any questions about this project, please contact the project owner by visiting their GitHub profile at [github.com/Omar4589](https://:github.com/Omar4589).

## Tool URL <a id="toolurl"></a>
    
[(https://bookscovr-bf314a02250c.herokuapp.com/)](https://bookscovr-bf314a02250c.herokuapp.com)
<br>
<br>
    
## Technologies <a id="technologies"></a>
    
The following technologies were used to develop Sample Project Title:<br>
<br>
<strong>Languages</strong>
    
- HTML,  CSS,  Javascript
    
<strong>Frameworks</strong>
    
- React.js, Express.js
    
<strong>Libraries</strong>
    
- Bootstap
    
<strong>APIs</strong>

- Google Books API (https://developers.google.com/books)

<strong>Other</strong>

- Node.js
- MongoDB (Database)
- GraphQL (Apollo Server)
- JSON Web Tokens (JWT) (Authentication)
<br>
    
## License <a id="license"></a>

This project is licensed under the MIT License.

MIT License Notice: A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.
