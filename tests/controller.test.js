const controller = require('../controller/controller');

test('Create book funcionality',async() =>{

   const req = {
    user : {
        role: 1 ,
        username : Dorian
    },
    body : {
        name : test_knjiga_1,
        author : test_knjiga_1_author,
        description : test_knjiga_1_description,
    },
    files : {
        bookimage: {
            name: 'test_knjiga_1_bookimage.jpg',
            data: "",
            size: 63874,
            encoding: '7bit',
            tempFilePath: '',
            truncated: false,
            mimetype: 'image/jpeg',
            md5: '3a8ba6e06170f284869673c2a331e7b8',
            mv: ""
          },
          authorimage: {
            name: 'test_knjiga_1_authorimage.jpg',
            data: "",
            size: 63874,
            encoding: '7bit',
            tempFilePath: '',
            truncated: false,
            mimetype: 'image/jpeg',
            md5: '3a8ba6e06170f284869673c2a331e7b8',
            mv: ""
          }}
    } 
  }
)