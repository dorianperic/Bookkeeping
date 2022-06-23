//login (GET)
exports.login = (req,res)=>{
    res.render('login');
}

//gallery (GET)
exports.gallery = (req,res)=>{
    res.render('gallery');
}

//backoffice (GET)
exports.bo = (req,res)=>{
    res.render('backoffice');
}

//backoffice add (GET)
exports.bo_add_book = (req,res)=>{
    res.render('backofficeaddbook');
}

//backoffice update (GET)
exports.bo_update_book = (req,res)=>{
    res.render('backofficeupdatebook');
}