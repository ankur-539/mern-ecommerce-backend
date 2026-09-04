import express from "express";
import { mycontrol, userragistor, userlogin, procontrol, userprev, user, userdelete, useredit, userupdate } from "../controls/control.js";
import verifyToken from "../middleware/middleware.js";

const app = express.Router();

app.get('/', (req, res) => {
    res.send("welcome to express")
})
app.get('/about', mycontrol);
app.get('/product', procontrol);
app.get('/usersinfo', verifyToken, user);
app.post('/ragistor', userragistor);
app.post('/login', userlogin)

app.delete('/delete/:id', userdelete)
app.get('/show/:id', userprev)
app.get('/edit/:id', useredit)
app.patch('/usersinfo/:id', userupdate)

export default app;