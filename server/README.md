# AI-Content-Generator Backend

This is where we come across the server side of our project.

## Installation
Firstly, we need to install the following packages:
  ```bash
  npm i axios bcryptjs cookie-parser cors dotenv express express-async-handler jsonwebtoken mongoose node-cron stripe nodemon
  ```
Now in the package.json file, we need to do a few changes:
1. Under main, we need to use our server file ie. server.js
2. Under scripts paste the following to start our server file and use nodemon package:
   ```bash
   "start": "node server.js",
   "server": "nodemon server.js"
   ```

