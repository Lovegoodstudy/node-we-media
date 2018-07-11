let ArticlesDB = require('../models/ArticlesDB');
let ErrorUtil = require('../utils/errorUtil');

exports.getArticleList = async params => {
    let data = await ArticlesDB.getArticleList();
    data.forEach(element => {
        element.id = element._id;
        delete element._id;
        delete element.content;
    });
    return {result: data};
};

exports.addArticle = async params => {
    if (!await _validateAddArticleParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ArticlesDB.addArticle(params);
    data.id = data._id;
    delete data._id;
    return {result: data};
};

async function _validateAddArticleParams(params) {
    if (!params.title) {
        return false;
    } else {
        return true;
    }
}

exports.getArticle = async params => {
    if (!await _validateGetArticleParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ArticlesDB.getArticle(params);
    data.id = data._id;
    delete data._id;
    return {result: data};
};

async function _validateGetArticleParams(params) {
    if (!params.id) {
        return false;
    } else {
        return true;
    }
}

exports.deleteArticle = async params => {
    if (!await _validateDeleteArticleParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ArticlesDB.deleteArticle(params);
    return {result: data};
};

async function _validateDeleteArticleParams(params) {
    if (!params.id) {
        return false;
    } else {
        return true;
    }
}

exports.updateArticle = async params => {
    if (!await _validateUpdateArticleParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ArticlesDB.updateArticle(params);
    return {result: data};
};

async function _validateUpdateArticleParams(params) {
    if ((!params.id) || (!params.title)) {
        return false;
    } else {
        return true;
    }
}