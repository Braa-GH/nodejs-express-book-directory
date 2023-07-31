# Create .env file
create an **.env** file and insert following to it:
```
PORT=[replace this with your specific port]
```

# Database configuration

### Create MySQL Database
you should create a mySql database with name **"book_directory"** .
```
CREATE DATABASE IF NOT EXISTS book_directory
```

### Create Book Table
after creating a database, inside database create a table with name **"book"**, with SQL query:
```
CREATE TABLE IF NOT EXISTS Book(
        id int AUTO_INCREMENT PRIMARY KEY,
        title varchar(250) unique not null,
        author varchar(250) not null,
        edition int
)
```

### add connection inputs to .env
inside **.env** file insert the following:
```
DB_HOST=
DB_USERNAME=
PASSWORD=
DB_NAME=
```

### Create User Table
```
CREATE TABLE IF NOT EXISTS `User`(
    id int AUTO_INCREMENT PRIMARY KEY,
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    email varchar(250) UNIQUE NOT NULL,
    password varchar(250) NOT NULL,
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP
)
```

# How To Use
## Authentication routes
#### First: Signup
POST http://localhost:9000/auth/signup
- send user data inside post body request as a JSON raw
- user data are : { "firstName", "lastName", "email", "password" }
- there are validation rules.

#### Secound: Login
- you must login to get a token, that gives you authorization to book routes.
- route: POST http://localhost:9000/auth/login
- send login data in post body request as a JSON raw.
- login data are { "email", "password" }
- there are validation rules.
- successful login request will return a token, this token is used in the Authorization header with type of "Bearer Token" with **Book** routes.

## Book routes
- **Don't Forget to set the token that you got from login request**
#### To Get All Books
- route: GET http://localhost:9000/book
- token required.

#### To Get a Specific Book
- route: GET http://localhost:9000/book/[bookId]
- replace [book id] with your book id, ex: GET http://localhost:9000/book/1
- there is a validation rules on bookId
- token required.

 #### To Add a New Book
- route: POST http://localhost:9000/book
- send book data in post body request as a type of JSON raw.
- book data are { "title", "author", "edition" }.
- there is a validation rules on book data.
- token required.

 #### To Update a Specific Book
- route: PUT http://localhost:9000/book/[bookId]
- replace [book id] with your book id, ex: PUT http://localhost:9000/book/1
- send new book data in PUT body request as a type of JSON raw.
- new book data are { "title", "author", "edition" }.
- there is a validation rules on book data.
- token required.
  
 #### To Delete a Specific Book
- route: Delete http://localhost:9000/book/[bookId]
- replace [book id] with your book id, ex: DELETE http://localhost:9000/book/1
- there is a validation rules on bookId.
- token required.

