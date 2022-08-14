const express = require("express");
const cors = require("cors");
const Users = require("./config"); 

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    const usersList = await Users.get();
    const list = usersList.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    res.send(list);
});

app.get("/user", async (req, res, next) => {
    const id = req.body.id;
    const user = await (await Users.doc(id).get()).data();
    res.send(user);
});

app.post("/create", async (req, res, next) => {
    const data = req.body;
    await Users.add(data);
    res.send({msg: "User Added"});
});

app.post("/update", async (req, res, next) => {
    const id = req.body.id;
    const data = req.body.data;
    await Users.doc(id).update(data);
    res.send({msg: "User updated"});
});

app.post("/delete", async (req, res, next) => {
    const id = req.body.id;
    await Users.doc(id).delete();
    res.send({msg: "User Deleted"});
})

app.listen(3000);