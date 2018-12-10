var express = require('express');
var router = express.Router();
const Orientacao = require('../model/orientacao');

router.get('/', async function(req, res, next) {
    if (!req.session || req.session.login !== 'sucesso') {
        res.json({ sucesso: 'erro', auth: 'not' });
    }
    res.json({
        orientacao: await Orientacao.find().populate('professor')
    });
});

router.post('/', async (req, res, next) => {
    if (!req.session || !req.session.login) {
        res.json({ sucesso: 'erro', auth: 'not' });
    }
    // res.json(req.body)
    var aluno = req.body.aluno;
    var titulo = req.body.titulo;
    var professor = req.body.professor;
    if(aluno != '' && titulo != '' && professor != 'Escolha'){
        const ori = new Orientacao(req.body);
        await ori.save();
        res.json({sucesso: 'sucesso', msg: 'cadastrado'});
    }else{
        res.json({sucesso: 'erro', msg: 'erro ao cadastrar'});
    }
});

module.exports = router;
