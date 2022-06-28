var { Bookdb , Userdb } = require('../model/model');
const axios = require('axios');
const { Buffer } = require('buffer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

async function getImageUrl(data){
    return axios.post('https://api.imgur.com/3/image', data,{
        headers: {
          'Authorization': 'Client-ID 65a7a80220912e6'
        }
        })
        .then(res=>res.data.data.link);   
}

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha256', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordhash:value
    };
}

//user login
exports.login = (req,res)=>{
    const { username, password } = req.body;
    const queryFilter = {}
    
    queryFilter.name = req.body.username;

    Userdb.find(queryFilter)
        .then(user =>{
            var passwordData = sha512(password, process.env.HASH_SALT);
            
            //console.log(passwordData);
            //console.log(user);

            if(user != 0){
                
                // username je jedinstven
                if(passwordData.passwordhash === user[0].passwordhash)
                {
                    const userData = { role: user[0].role ,
                                       username : user[0].name};

                    //console.log(userData);
                    const accessToken = jwt.sign(userData, process.env.ACCESSTOKENSECRET);

                    if(process.env.NODE_ENV == "development"){
                        const options = {
                            httpOnly : true,
                            expire : new Date(Date.now() + process.env.EXPIRE_TOKEN)
                        }
                        res.cookie('token', accessToken, options ).redirect(200,'/gallery')
                        res.end()
                    }

                }else{
                    res.status(500).send({ message: "Invalid password"})
                }
            }else{
                res.status(500).send({ message: "Invalid username"})
            }
        })
    .catch(err =>{
        console.log(err);
        res.status(500).send({ message: "Internal error"})
    })
}

//borrow book
exports.borrow = async (req,res)=>{
    if(req.body.id){
        const id = req.body.id;

        const createBookQueryFilter = (availability,borrower) => {
            const queryFilter = {}

            queryFilter.availability = availability
            queryFilter.borrower = borrower

            return queryFilter
        }

        if(req.body.availability == "true"){
            var updateModel = createBookQueryFilter(false,req.user.username);
        }
        else if(req.body.availability == "false"){
            //todo add borrower check in model
            updateModel = createBookQueryFilter(true,"");
        }

        console.log(JSON.stringify(updateModel) + "  updatemodel")

        Bookdb.findByIdAndUpdate(id, updateModel, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot find book with ${id}.`})
            }else{
                res.status(200).send({ message : `Succsess ! `})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update book information"})
        })

    }else{
        res.status(500).send({ message: "Internal server error"})
    }
}

//create and save new book
exports.create = async (req,res)=>{
    const { role } = req.user;

    if (role !== true) {
        return res.sendStatus(403);
    }

    //request validation
    if(!req.body.name){
        res.status(400).send({ message : "Book name can not be empty!"});
        return;
    }
    if(!req.body.author){
        res.status(400).send({ message : "Author can not be empty!"});
        return;
    }
    if(!req.body.description){
        res.status(400).send({ message : "Description can not be empty!"});
        return;
    }
    if(!req.body.type){
        res.status(400).send({ message : "Type can not be empty!"});
        return;
    }
    if(!req.files.bookimage){
        res.status(400).send({ message : "Book image can not be emtpy!"});
        return;
    }
    if(!req.files.authorimage){
        res.status(400).send({ message : "Author image can not be emtpy!"});
        return;
    }

    //TODO izdvojit u fju i prepravit da se ne blokiraju
    var imageBufferBook = req.files.bookimage.data
    var imageBufferAuthor = req.files.authorimage.data

    var base64dataBook = Buffer.from(imageBufferBook).toString('base64');
    var base64dataAuthor = Buffer.from(imageBufferAuthor).toString('base64');

    const dataBook = {
        image : base64dataBook
    }

    const dataAuthor = {
        image : base64dataAuthor
    }

    var linkBook = await getImageUrl(dataBook);
    var linkAuthor = await getImageUrl(dataAuthor);

    const book = new Bookdb({
        name : req.body.name,
        author : req.body.author,
        availability : true,
        description : req.body.description,
        type : req.body.type,
        bookpicture : linkBook,
        authorpicture : linkAuthor
    })  
            
    book.save(book)
        .then(data => {
            console.log(data)
                res.redirect('/bo');
            })
        .catch((err) => {
            console.error(err);
            res.status(500).send({
            message : err.message || "Some error occurred on book creation"
        });
    });
}

//get all books & get single book
exports.find = async (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Bookdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "No book with id: "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving book with id " + id})
            })

    }else{
        let {page, size, sort, name, author} = req.query
        
        if(!page){
            page = 1
        }else{
            page = parseInt(req.query.page);
        }
        if(!size){
            size = 10
        }
        
        if(!sort || sort == "az"){
            sort = 1
        }else if(sort == "za"){
            sort = -1
        }
        
        const createBookQueryFilter = (queryString) => {
            const queryFilter = {}

            queryString.author && (queryFilter.author = queryString.author)
            queryString.type && (queryFilter.type = queryString.type)
            queryString.username && (queryFilter.borrower = queryString.username)

            return queryFilter
        }

        const query = createBookQueryFilter(req.query);

        console.log(query)

        const limit = parseInt(size)
        const skip = (page - 1) * size

        const numOfResults = await Bookdb.countDocuments(query);
        const numberOfPages = Math.ceil(numOfResults / limit);

        if(page > numberOfPages){
            res.status(501).send({ message : "Page does not exist (you have already reached last page)" })
            return;
        }else if(page < 1){
            res.status(501).send({ message : "Page does not exist (theres no point counting pages into negative numbers)" })
            return;
        }

        Bookdb.find(query).limit(limit).skip(skip).sort({name:sort})
            .then(books => {
                res.send({books : books, 
                    page : page,
                    numberOfPages : numberOfPages,
                    sort : req.query.sort,
                    name : req.query.name,
                    author : req.query.author,
                    size : limit
                    })
            })
            .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving books" })
        })
    }
}

//update book by id
exports.update = async (req,res)=>{
    const { role } = req.user;

    if (role !== true) {
        return res.sendStatus(403);
    }

    //request validation
    if(!req.body.name){
        res.status(400).send({ message : "Book name can not be empty!"});
        return;
    }
    if(!req.body.author){
        res.status(400).send({ message : "Author can not be empty!"});
        return;
    }
    if(!req.body.availability){
        res.status(400).send({ message : "Availability can not be empty!"});
        return;
    }else{
        var availabilityBool;

        if(req.body.availability.toUpperCase() == 'DOSTUPNA')
            availabilityBool = 0
        else if(req.body.availability.toUpperCase() == 'POSUĐENA')
            availabilityBool = 1
        else{
            res.status(400).send({ message : "Invalid Availability!"});
            return;
        }
    }
    if(!req.body.description){
        res.status(400).send({ message : "Description can not be empty!"});
        return;
    }
    if(!req.body.type){
        res.status(400).send({ message : "Type can not be empty!"});
        return;
    }
    if(!req.files.bookimage){
        res.status(400).send({ message : "Book image can not be emtpy!"});
        return;
    }
    if(!req.files.authorimage){
        res.status(400).send({ message : "Author image can not be emtpy!"});
        return;
    }

    //TODO izdvojit u fju i prepravit da se ne blokiraju
    var imageBufferBook = req.files.bookimage.data
    var imageBufferAuthor = req.files.authorimage.data

    var base64dataBook = Buffer.from(imageBufferBook).toString('base64');
    var base64dataAuthor = Buffer.from(imageBufferAuthor).toString('base64');

    const dataBook = {
        image : base64dataBook
    }

    const dataAuthor = {
        image : base64dataAuthor
    }

    var linkBook = await getImageUrl(dataBook);
    var linkAuthor = await getImageUrl(dataAuthor);

    var updateQuery = {
        name : req.body.name,
        author : req.body.author,
        availability : availabilityBool,
        description : req.body.description,
        type : req.body.type,
        bookpicture : linkBook,
        authorpicture : linkAuthor
    }

    Bookdb.findByIdAndUpdate(req.body.id, updateQuery, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update book with ${id}.`})
            }else{
                res.redirect('/bo');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update book information"})
        })
}

//delete book by id
exports.delete = (req,res)=>{
    const id = req.body.id;
    const { role } = req.user;

    if (role !== true) {
        return res.sendStatus(403);
    }
    
    console.log(id);

    Bookdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot delete book with id ${id}. `})
            }else{
                res.send({
                    message : "Book was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete book with id=" + id
            });
        });
    
}