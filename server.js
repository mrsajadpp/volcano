const express = require('express');
const app = express();
const port = process.env.PORT;
function listen() {
    app.listen(port, () => {
        console.log('Server running on port : '+port+'.');
    });
}
app.get('/', (req,res) => {
    res.send('Server is up.');
});
module.exports = listen;
