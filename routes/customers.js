const express = require('express');
const router = express.Router();

const db = require('../db');
db.getCustomers(); // carregamento da lista de customers

/* GET customers page. */
router.get('/', (req, res, next) => {
  const data = db.getCustomers();
  res.render('customers', { title: 'Listagem de clientes', data: data });
  // pode passar somente data, já que é o mesmo nome da propriedade
  // res.render('customers', { title: 'Customers List', data });
});

router.post('/new', (req, res, next) => {
    if (req.body.id) {
      db.updateCustomer(req.body.id, { name: req.body.name, address: req.body.address, cpf: req.body.cpf })
    } else {
      db.addCustomer(req.body.name, req.body.address, req.body.cpf);
    }
    res.redirect("/customers");
  });

router.get('/new/:id?', (req, res, next) => {
    const id = req.params.id;
    if (id) {
      const customer = db.getCustomer(id);
      res.render('newCustomer', { title: 'Edição de Cliente', customer });
    } else {
      res.render('newCustomer', { title: 'Cadastro de cliente', customer: {} });
    }
  });

router.delete('/:id', (req, res, next) => {
  db.deleteCustomer(req.params.id);
  res.sendStatus(204);
  // não redireciona porque será redirecionado por script dinâmico
})

module.exports = router;


// domínio = http://localhost:3000
// path nível 1 = / (app.js)
// path nível 2 = customers (router): router, nesse caso é o customers.js