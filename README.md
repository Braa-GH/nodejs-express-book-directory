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