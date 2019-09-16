const express = require('express')
const router = express.Router()
var booksController=require('./controller/booksController');
let multer  = require('multer');  
let formData = multer();
let route=[ 
  {
    url:'/api/v1/getbooksdetail',
    controller:booksController.getBooksDetail,
    method:'get'
  },
  {
    url:'/api/v1/bookslist',
    controller:booksController.list,
    method:'get'
  },
  {
    url:'/api/v1/books',
    controller:booksController.post,
    form:formData.none(),
    method:'post'
  },
  {
    url:'/api/v1/deletebook/:id',
    controller:booksController.delete,
    method:'delete'
  }
];
route.map(function(value,key){
  if(value['method']=='post'){
    if(value['form']){
      router.post(value['url'],value['form'],value['controller']);
    }else{
      router.post(value['url'],value['controller']);
    }
  }else if(value['method']=='get'){
    router.get(value['url'],value['controller']);
  }else if(value['method']=='delete'){
    router.delete(value['url'],value['controller']);
  }
  fileCount=0;
});

module.exports = router