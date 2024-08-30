// Requires
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const express = require("express");
const app = express();

// Vars
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      let userData = parsedData["users"].map(({ password, ...reset }) => reset);
      res.status(200).json({
        data: userData,
      });
    }
  });
});

app.post("/", (req, res) => {
  const { name, email, password } = req.body;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      const last_id = parsedData["last_id"] + 1;
      let users = parsedData["users"];
      users.push({
        id: last_id,
        name,
        email,
        password,
      });

      fs.writeFile(
        "database.json",
        JSON.stringify({
          users,
          last_id,
        }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).json({ msg: "User has been added" });
          }
        }
      );
    }
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      let userData = parsedData["users"].map(({ password, ...reset }) => reset);
      const user = userData.filter((e) => e.id == id);
      res.status(200).json({
        data: user,
      });
    }
  });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) console.log(err);
    if (data) {
      const parsedData = JSON.parse(data);
      const users = parsedData['users'].filter((e) => e.id != id);
      const last_id = parsedData["last_id"];
      fs.writeFile("database.json", JSON.stringify({
        users,
        last_id,
      }), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            msg: "User has been deleted",
          });
        }
      });
    }
  });
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  fs.readFile("database.json", "utf8", (err, data) => {
      if (err) {
          return res.status(400).json({ msg: "Error reading database" });
      }

      if (data) {
          let parsedData = JSON.parse(data);
          let users = parsedData["users"];

          const user = users.findIndex((e) => e.id == id);

          if (user === -1) {
            return res.status(404).json({ msg: "User not found" });
        }


          users[user] = {
            ...users[user], 
            name: name || users[user].name, 
            email: email || users[user].email, 
            password: password || users[user].password, 
          };
          fs.writeFile("database.json", JSON.stringify({users, last_id:parsedData["last_id"]} ), (err) => {
              if (err) {
                  return res.status(400).json({ msg: "Error writing to database" });
              }
              res.status(201).json({ msg: "User updated successfully"});
          });
      }


  });
});

// Server
app.listen(port, () => console.log(`Server is running on port ${port}`));
