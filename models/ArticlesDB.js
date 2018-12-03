let ConfigSet = require('../configs/config_set.json');
let MongoDB = require('mongodb');
let MongoClient = MongoDB.MongoClient;
let ObjectID = require('mongodb').ObjectID;

let db;
MongoClient.connect(ConfigSet.DATABASE_URL, (err, client) => {
    if (err) {
        throw err;
    } else {
        db = client.db(ConfigSet.ARTICLE_DATABASE_NAME);
    }
});

exports.getArticleList = async function(params) {
    let articleCollection = db.collection(ConfigSet.ARTICLE_COLLECTION_NAME);
    let result = await articleCollection.find().toArray();
    return result;
};

exports.addArticle = async function(params) {
    let counterCollection = db.collection('counters');
    let seqDocument = await counterCollection.findAndModify(
        {_id: 'article_id'},
        [],
        {$inc:{seq:1}},
        {new: true}
    );
    let articleCollection = db.collection(ConfigSet.ARTICLE_COLLECTION_NAME);
    let result = await articleCollection.insertOne({
        _id: seqDocument.value.seq,
        title: params.title,
        author: params.author,
        content: params.content,
        introduction: params.introduction,
        date: params.date
    });
    return result.ops[0];
};

exports.getArticle = async function(params) {
    let articleCollection = db.collection(ConfigSet.ARTICLE_COLLECTION_NAME);
    let result = await articleCollection.findOne({
        _id: Number(params.id)
    });
    return result;
};

exports.deleteArticle = async function(params) {
    let articleCollection = db.collection(ConfigSet.ARTICLE_COLLECTION_NAME);
    let result = await articleCollection.deleteOne({
        _id: Number(params.id)
    });
    return result;
};

exports.updateArticle = async function(params) {
    let articleCollection = db.collection(ConfigSet.ARTICLE_COLLECTION_NAME);
    let result = await articleCollection.updateOne({
        _id: Number(params.id)
    }, {
        $set: {
            _id: Number(params.id),
            title: params.title,
            author: params.author,
            content: params.content,
            introduction: params.introduction,
            date: params.date
        }
    });
    return result;
};