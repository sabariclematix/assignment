var connection = require('../config/database');
var dateTime = require('node-datetime');
var dt = dateTime.create();

module.exports={
    list:function(callback){         
      let  booksBuild="select id,isbn,book_name,count,author,description from books where delete_status=0 ";                            
      return connection.query(booksBuild,callback);                 
    },
    getBooksDetail:function(bookId,callback){            
      let  booksBuild="select id,isbn,book_name,count,author,description from books where id=?";                            
      return connection.query(booksBuild,[bookId],callback);
    },
    delete:function(bookId,callback){                
      let queryBuild = "update books set delete_status=1 where id=? ";          
      return connection.query(queryBuild,[bookId],callback);
    },    
    create:function(data,callback){    
      let fields={
        isbn:data.isbn,
        book_name:data.bookname,
        count:data.count,
        author:data.author,
        description:data.bookdescription,
        create_date:dt.format('Y-m-d H:M:S')       
      }    
      queryBuild = library.insertQueryBuild('books',fields);     
      return connection.query(queryBuild.query,queryBuild.values,callback);    
    },
    update:function(data,callback){    
      let fields={
        isbn:data.isbn,
        book_name:data.bookname,
        count:data.count,
        author:data.author,
        description:data.bookdescription     
      }   
      queryBuild = library.updateQueryBuild('books',fields,'id',data.bookid);     
      return connection.query(queryBuild.query,queryBuild.values,callback);    
    }    
}