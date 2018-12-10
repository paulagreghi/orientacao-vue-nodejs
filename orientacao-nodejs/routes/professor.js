var express = require('express');
var router = express.Router();
const Professor = require('../model/professor');

router.post('/', async (req, res, next) => {
    if (!req.session || !req.session.login) {
        res.json({ sucesso: 'Erro, usuário não logado' });
    }
    var nome = req.body.nome;
    var dep = req.body.departamento;
    if(nome != '' && dep != 'Escolha'){
        const prof = new Professor(req.body);
        await prof.save();
        res.json({sucesso: 'sucesso', msg: 'cadastrado'});
    } else {
        res.json({sucesso: 'erro', msg: 'erro ao cadastrar'});
    }
});

router.get('/', async function(req, res, next) {
    if (!req.session || !req.session.login) {
        res.json({ sucesso: 'erro', auth: 'not' });
    }
    res.json({
        profs: await Professor.find()
    });
});

module.exports = router;
