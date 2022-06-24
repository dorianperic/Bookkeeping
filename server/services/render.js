const axios = require('axios');

//login (GET)
exports.login = (req,res)=>{
    res.render('login');
}

//gallery (GET)
exports.gallery = (req,res)=>{
    
    axios.get('http://localhost:3000/api/book')
    .then(function(response){
        console.log(response.data);
        res.render('gallery', { books : response.data });
    })
    .catch(err =>{
        res.send(err);
    })

}

//backoffice (GET)
exports.bo = (req,res)=>{
    
    axios.get('http://localhost:3000/api/book')
    .then(function(response){
        console.log(response.data);
        res.render('backoffice', { books : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}

//backoffice add (GET)
exports.bo_add_book = (req,res)=>{
    res.render('backofficeaddbook');
}

//backoffice update (GET)
exports.bo_update_book = (req,res)=>{

    axios.get('http://localhost:3000/api/book', { params : { id : req.query.id }})
        .then(function(bookdata){
            res.render("backofficeupdatebook", { book : bookdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}