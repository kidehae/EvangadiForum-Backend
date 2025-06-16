// export let users = `CREATE TABLE IF NOT EXISTS users(
//     userid INT(20) NOT NULL AUTO_INCREMENT,
//     username VARCHAR(20) NOT NULL,
//     firstname VARCHAR(20) NOT NULL,
//     lastname VARCHAR(20) NOT NULL,
//     email VARCHAR(40) NOT NULL,
//     password VARCHAR(100) NOT NULL,
//     PRIMARY KEY (userid)
// )`;

// export let questions = `CREATE TABLE IF NOT EXISTS questions(
//     questionid INT NOT NULL AUTO_INCREMENT,
//     userid INT(20) NOT NULL,
//     title VARCHAR(50) NOT NULL,
//     description VARCHAR(200) NOT NULL,
//     tag VARCHAR(50),
//     createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (questionid),
//     FOREIGN KEY(userid) REFERENCES users(userid)
// )`;

// export let answers = `CREATE TABLE IF NOT EXISTS answers(
//     answerid INT(20) NOT NULL AUTO_INCREMENT,
//     userid INT(20) NOT NULL,
//     questionid INT NOT NULL,
//     answer VARCHAR(200) NOT NULL,
//     createdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (answerid),
//     FOREIGN KEY(userid) REFERENCES users(userid),
//     FOREIGN KEY (questionid) REFERENCES questions(questionid)
// )`;
// schema.js (PostgreSQL version)
const users = `
  CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

const questions = `
  CREATE TABLE IF NOT EXISTS questions (
    questionid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(userid) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tag VARCHAR(255),
    createdate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

const answers = `
  CREATE TABLE IF NOT EXISTS answers (
    answerid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(userid) ON DELETE CASCADE,
    questionid INTEGER REFERENCES questions(questionid) ON DELETE CASCADE,
    answer TEXT NOT NULL,
    createdate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

module.exports = { users, questions, answers };
