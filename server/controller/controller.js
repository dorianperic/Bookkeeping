var Bookdb = require('../model/model');
const axios = require('axios');
const { Buffer } = require('buffer');

async function getImageUrl(data){
    return axios.post('https://api.imgur.com/3/image', data,{
        headers: {
          'Authorization': 'Client-ID 65a7a80220912e6'
        }
        })
        .then(res=>res.data.data.link);   
}

//create and save new book
exports.create = async (req,res)=>{
    
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
        availability : availabilityBool,
        description : req.body.description,
        bookpicture : linkBook,
        authorpicture : linkAuthor
    })  
            
    book.save(book)
        .then(data => {
                res.redirect('/bo/add-book');
            })
        .catch((err) => {
            console.error(err);
            res.status(500).send({
            message : err.message || "Some error occurred on book creation"
        });
    });
}

//get all books & get single book
exports.find = (req,res)=>{
    
    Bookdb.find()
    .then(book => {
        res.send(book)
    })
    .catch(err => {
        res.status(500).send({ message : err.message || "Error Occurred while retriving book" })
    })
}

//update book by id
exports.update = async (req,res)=>{

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
    const id = req.params.id;

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