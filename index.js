const express = require('express');
const spdy = require('spdy');
const fs = require('fs');
const path = require('path');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {

    // 第一个参数是resource key 对应html 资源路径
    const stream = res.push('/public/user.js', {})
    stream.end(JSON.stringify({ age: 12 }));
    // res.writeHead(200)
    res.end('<div>hello</div><script src="/public/user.js"></script>');
})


spdy.createServer({
    key: fs.readFileSync(path.join(__dirname, './client.key')),
    cert: fs.readFileSync(path.join(__dirname, './client.crt'))
}, app).listen(9000, (err) => {
    if (err) {
        console.log('---- start server error ----');
        process.exit(0);
    }

    console.log('start on %c9000', 'color:red');
})