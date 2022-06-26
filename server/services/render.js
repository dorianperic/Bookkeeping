const axios = require('axios');

//login (GET)
exports.login = (req,res)=>{
    res.render('login');
}

//gallery (GET)
exports.gallery = (req,res)=>{
    
    axios.get('http://localhost:3000/api/book', {params : { page : req.query.page,
                                                            size : req.query.size}})
    .then(function(response){
        console.log(response.data);
        res.render('gallery', { books : response.data.books ,
                                page : response.data.page ,
                                numberOfPages : response.data.numberOfPages,
                                size : response.data.size});
    })
    .catch(err =>{
        res.send(err);
    })

}

//backoffice (GET)
exports.bo = (req,res)=>{
   
    const { role } = req.user;

    console.log(role);

    if (role != true) {
        return res.sendStatus(403);
    }


    axios.get('http://localhost:3000/api/book', {params : { page : req.query.page,
                                                            size : req.query.size,
                                                            type : req.query.type,
                                                            author : req.query.author,
                                                            sort : req.query.sort}})
    .then(function(response){
        res.render('backoffice', { books : response.data.books ,
                                   page : response.data.page ,
                                   numberOfPages : response.data.numberOfPages,
                                   sort : response.data.sort,
                                   type : response.data.type,
                                   author : response.data.author,
                                   size : response.data.size});
    })        
    .catch(err =>{
        res.send(err);
    })
}

//backoffice add (GET)
exports.bo_add_book = (req,res)=>{
    const { role } = req.user;

    if (role !== true) {
        return res.sendStatus(403);
    }

    res.render('backofficeaddbook');
}

//backoffice update (GET)
exports.bo_update_book = (req,res)=>{
    const { role } = req.user;

    if (role !== true) {
        return res.sendStatus(403);
    }
    
    axios.get('http://localhost:3000/api/book', { params : { id : req.query.id }})
        .then(function(bookdata){
            res.render("backofficeupdatebook", { book : bookdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}