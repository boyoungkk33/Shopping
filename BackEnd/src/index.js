const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

console.log(path.join(__dirname, '/uploads'));
app.use(express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`${port}번에서 실행되었습니다.`);
});
