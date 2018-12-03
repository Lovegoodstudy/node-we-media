let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

let ArticlesController = require('../controller/ArticlesController');

router.get('/', urlencodedParser, async (req, res, next) => {
    try {
        let result = await ArticlesController.getArticleList();
        res.json(result);
    } catch(err) {
        next(err);
    }
});

router.get('/:id', urlencodedParser, async (req, res, next) => {
    let params = {
        id: req.params.id
    };
    try {
        let result = await ArticlesController.getArticle(params);
        res.json(result);
    } catch(err) {
        next(err);
    }
});

router.post('/', urlencodedParser, async (req, res, next) => {
    let params = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        introduction: req.body.introduction,
        date: req.body.date
    };
    try {
        let result = await ArticlesController.addArticle(params);
        res.json(result);
    } catch(err) {
        next(err);
    }
});

router.put('/:id', urlencodedParser, async (req, res, next) => {
    let params = {
        id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        introduction: req.body.introduction,
        date: req.body.date
    };
    try {
        let result = await ArticlesController.updateArticle(params);
        res.json(result);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', urlencodedParser, async (req, res, next) => {
    let params = {
        id: req.params.id
    };
    try {
        let result = await ArticlesController.deleteArticle(params);
        res.json(result);
    } catch(err) {
        next(err);
    }
});

module.exports = router;