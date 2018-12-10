var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.json('/');
      }
    });
  }
});

router.post('/login', function(req, res, next) {
  // console.log(req.body);
  // res.json(req.body)
  let login = req.body.login,
  password = req.body.password;
  if (login === 'anapaula' && password === 'anabanana') {
    req.session.login = 'sucesso';
    res.json({
      sucesso: 'sucesso',
    });
    // res.end();
  } else {
    res.json({
      sucesso: false,
    });
    // res.end();
  }
});


router.get('/logout', async function (req, res, next) {
  req.session.destroy()
  res.json({ logado: false });
})

module.exports = router;
