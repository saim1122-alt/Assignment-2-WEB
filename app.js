const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let expenses = [];
let id = 1;

app.get('/', (req, res) => {
  res.render('index', { expenses });
});

app.post('/add', (req, res) => {
  const { description, amount } = req.body;
  expenses.push({ id: id++, description, amount: parseFloat(amount) });
  res.redirect('/');
});

app.post('/update/:id', (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;
  expenses = expenses.map(exp =>
    exp.id === parseInt(id) ? { ...exp, description, amount: parseFloat(amount) } : exp
  );
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(exp => exp.id !== parseInt(id));
  res.redirect('/');
});

app.get('/report', (req, res) => {
  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  res.render('report', { expenses, total });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
