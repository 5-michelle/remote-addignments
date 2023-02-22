const express = require('express');
const app = express();

// new API route: GET /users, returning a list of users
app.get("", (req, res) => {
    res.send("Hello");
});

app.get('/healthcheck', (req, res) => {
    //res.send("OK");
    res.status(200).send('OK')
})

app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
})