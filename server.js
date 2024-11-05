const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

const jsonData = fs.readFileSync("./data.json");
const data = JSON.parse(jsonData);

app.get("/users", (req, res) => {
  res.send(data);
});






const checkingUserId = (req, res, next) => {
  const body = req.body;
  const id = body.id;
  const currentUser = data.find((user) => Number(user.id) === Number(id));
  if (currentUser) {
    console.log(currentUser);
    return res.send(currentUser);
  }
  next();
}

app.post("/login", checkingUserId, (req, res) => {
    res.send({ message: "user not found!" });

});






const signingUser = (req, res, next) => {
  const newUser = {
    ...req.body,
    id: data.length + 1,
  };
  data.push(newUser);
  res.send(newUser);
  fs.writeFile("data.json", JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    }});
  next();
}

app.post("/signup", signingUser, (req, res) => {
  res.send("complete");
});






app.delete("/delete", (req, res) => {
const reqId = req.body.id
console.log(reqId)
const users = data.filter((user) => Number(reqId) !== Number(user.id));
fs.writeFile("data.json", JSON.stringify(users), (err) => console.log(err));
res.send("ustgagdsan");
})

app.listen(3000);