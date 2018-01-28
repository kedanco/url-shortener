var express = require('express');
var router = express.Router();

// Get userinfo page
router.get('/',function(req,res){
  var db = req.db;
  var collection = db.get('collection');
  // collection.find()

  collection.find({},{},function(e,docs){
    res.render('index',{
      'urllist' : docs,
       title : "URL Shortener"
    });

  });

});

router.post('/shorten', function(req,res){

  var db = req.db;
  var collection = db.get('collection');

  console.log("shortening");
  // console.log("subdomains" + req.subdomains);

  var input = req.body.url.url;

  var randomStr = Math.random().toString(36).substring(6);

  // get all values, Check if randomStr exists

  var short = "sho.rt/" + randomStr;

  // Add into db.collection

  collection.insert({"original": input,"shorturl":short});
  // console.log(`inserted ${input}, ${short}`);

  res.render('shorten', {
     'shorturl' : short     
  });

});

router.get('/sho.rt/*', function(req,res){

  var db = req.db;
  var collection = db.get('collection');

  var short = req.originalUrl;
  short = short.substring(1,short.length);
  console.log("short is " + short);

  collection.find({'shorturl' : short}, function(err, data){
      var result;
      if (data.length == 1){
        res.redirect("http://" + data[0].original);
      }
  });
});

  // console.log(result);
      // .then((res) => {res.redirect(res[0]['original'])} );

module.exports = router;
