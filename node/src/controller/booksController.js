var booksModel = require('../model/booksModel');
var self =module.exports={
  list:function(request,responses){    
    let statusCode=200;    
    booksModel.list(function (error, results, fields) {            
      if (error) {
            response = {
            status:false,
            message:'Query syntax error: '+error
            }
            statusCode=401;            
        }else{
          response = {
            status:true,
            data:{
              rows : results          
            }
            }         
        }        
          responses.status(statusCode);        
          responses.json(response);                  
        
    });    
},
delete:function(request,responses,next){
  let statusCode=200;      
    booksModel.delete(request.params.id,function (error, results, fields) {            
      if (error) {
            response = {
            status:false,
            message:'Query syntax error: '+error
            }
            statusCode=401;            
        }else{           
          response = {
            status:true,
            }         
        }
        if(responses.headersSent==false){
          responses.status(statusCode);        
          responses.json(response);        
        }  
        
    });  
},

getBooksDetail:function(request,responses,next){
  let statusCode=200;      
    booksModel.getBooksDetail(request.query.bookid,function (error, results, fields) {            
      if (error) {
            response = {
            status:false,
            message:'Query syntax error: '+error
            }
            statusCode=401;            
        }else{          
          response = {
            status:true,
            data:results
            }         
        }        
          responses.status(statusCode);        
          responses.json(response);                  
        
    });
},
post:function(request,responses,next){    
  let postData = request.body    
  let statusCode=200;      
         if(postData.bookid && postData.bookid!=""){
        booksModel.update(postData,function(error, results, fields){
          if (error) {
            response = {
            status:false,
            message:'Query syntax error: '+error
            }   
            statusCode=401;          
          }else{                                
            response = {
              status:true,
              data:{id:postData.bookid}
              }       
          }      
          responses.status(statusCode);
          responses.json(response);        
      });
    }else{
      booksModel.create(postData,function(error, results, fields){
          if (error) {
            response = {
            status:false,
            message:'Query syntax error: '+error
            }
            statusCode=401;    
          }else{
            let bookId = results.insertId;                 
            response = {
              status:true,
              data:{id:bookId}
              }       
          } 
          responses.status(statusCode);
          responses.json(response);         
      });
    } 

}
}