const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
})

app.get('/qs/:spec', (req, res) => {
    const { page } = req.params;
    const sendPath = path.join(__dirname, 'public', 'qs', `${page}.html`);

    res.sendFile(sendPath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, 'error_404.html'))
        }
    })
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'error_404.html'));
  });

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server is running on port 80')
})
