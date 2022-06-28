const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');
const authentication = require('../authentication/authentication');

//book model
/**
 * @swagger
 * components:
 *  schemas:
 *   Book:
 *      type: object
 *      required:
 *          - name
 *          - author
 *          - availability
 *          - description
 *          - type
 *          - bookpicture
 *          - authorpicture
 *      properties:
 *          _id:
 *              type: string
 *              description: Auto-generated id of the book
 *          name:
 *              type: string
 *              description: Name of the given book
 *          author:
 *              type: string
 *              description: Author of the given book
 *          availability:
 *              type: bool
 *              description: Availability of the given book (On creation by default available)
 *          borrower:
 *              type: string
 *              description: Username of the book borrower
 *          description:
 *              type: string
 *              description: Description of the given book
 *          type:
 *              type: string
 *              description: Type of the given book
 *          bookpicture:
 *              type: string
 *              description: Picture URL of the given book
 *          authorpicture:
 *              type: string
 *              description: Picture URL of the given author
 *      example:
 *         _id: 2131f1f12wadg2242
 *         name: Ana Karenjina
 *         author: Lav Nikolajevič Tolstoj
 *         availability: true
 *         borrower: 
 *         description: Ana Karenjina objavljena je u serijskom obliku u razdoblju između 1873. i  1877. godine. Djelo je ostavilo dubok dojam, a suvremena izvješća pokazuju ...
 *         type: Roman
 *         bookpicture: https://i.imgur.com/JNLlYS1.jpg
 *         authorpicture: https://i.imgur.com/FEdlGmF.jpg
 * 
 */

//token cookie
/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          cookieAuth:
 *              type: apiKey
 *              in: cookie
 *              name: token     
 */

//books group
/**
 * @swagger
 *  tags:
 *      name: Books
 *      description: Bookkeeping API
 */

//books group
/**
 * @swagger
 *  tags:
 *      name: View
 *      description: Frontend endpoints
 */

//users group
/**
 * @swagger
 *  tags:
 *      name: User
 *      description: User API
 */

//all books
/**
 * @swagger
 * /api/book:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: Returns the list of all books
 *      tags: [Books]
 *      responses:
 *          200:
 *              description: List of all books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 *          500:
 *              description: Error occured while retreving books
 *          501:
 *              description: Invalid page
 */

//filtered sorted paginated books
/**
 * @swagger
 * /api/book:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: Returns the list of filtered,sorted & paginated books
 *      tags: [Books]
 *      parameters:
 *        - name: size
 *          in: query
 *          schema:
 *              type: string
 *          required: false
 *          description: Number of books per page
 *        - name: page
 *          in: query
 *          schema:
 *              type: string
 *          required: false
 *          description: Current page number
 *        - name: sort
 *          in: query
 *          schema:
 *              type: string
 *          required: false
 *          description: Sorting options
 *        - name: name
 *          in: query
 *          schema:
 *              type: string
 *          required: false
 *          description: Filtering options by name
 *        - name: author
 *          in: query
 *          schema:
 *              type: string
 *          required: false
 *          description: Filtering options by author
 *      responses:
 *          200:
 *              description: List of filtered,sorted & paginated books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 *          500:
 *              description: Error occured while retreving books
 *          501:
 *              description: Invalid page
 */

//books borrowed by a specific user
/**
 * @swagger
 * /api/book:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: Returns a array of books (can be filtered,sorted and or paginate,can be array of borrowed books for a sigle user)
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: username
 *          schema:
 *              type: string
 *          required: false
 *          description: Username of the person who borrowed the books
 *      responses:
 *          200:
 *              description: Response is a array of borrowed books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 *          500:
 *              description: Error occured while retreving books
 *          501:
 *              description: Invalid page
 */

//single book by id
/**
 * @swagger
 * /api/book:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: Returns a array of books (can be filtered,sorted and or paginate,can be array of borrowed books for a sigle user)
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: false
 *          description: The book id
 *      responses:
 *          200:
 *              description: Response is a array of books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Book'
 *          500:
 *              description: Error occured while retreving books
 *          501:
 *              description: Invalid page
 */

//create book
/**
 * @swagger
 * /api/book/:
 *  post:
 *      security:
 *          - cookieAuth: []
 *      summary: Create a new book
 *      tags: [Books]
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          author:
 *                              type: string
 *                          description:
 *                              type: string
 *                          type:
 *                              type: string
 *                          bookimage:
 *                              type: string
 *                              format: base64
 *                          authorimage:
 *                              type: string
 *                              format: base64
 *                  encoding:
 *                      bookimage:
 *                          contentType: image/png, image/jpeg
 *                      authorimage:
 *                          contentType: image/png, image/jpeg 
 *      responses:
 *         200:
 *             description: The book was successfully created
 *         500:
 *             description: Server error
 *         400:
 *             description: Bad request                      
 */

//update book
/**
 * @swagger
 * /api/book/update:
 *  post:
 *      security:
 *          - cookieAuth: []
 *      summary: Update a specific book
 *      tags: [Books]
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          name:
 *                              type: string
 *                          author:
 *                              type: string
 *                          description:
 *                              type: string
 *                          type:
 *                              type: string
 *                          bookimage:
 *                              type: string
 *                              format: base64
 *                          authorimage:
 *                              type: string
 *                              format: base64
 *                  encoding:
 *                      bookimage:
 *                          contentType: image/png, image/jpeg
 *                      authorimage:
 *                          contentType: image/png, image/jpeg 
 *      responses:
 *         200:
 *             description: The book was successfully updated
 *         500:
 *             description: Server error
 *         400:
 *             description: Bad request                      
 */

//delete book
/**
 * @swagger
 * /api/book/delete:
 *  post:
 *      security:
 *          - cookieAuth: []
 *      summary: Delete a single book by
 *      tags: [Books]
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *      responses:
 *          200:
 *              description: Book deleted successfully
 *          500:
 *              description: Internal server error
 *          404:
 *              description: Book with given id does not exist
 */

//borrow book
/**
 * @swagger
 * /api/book/borrow:
 *  post:
 *      security:
 *          - cookieAuth: []
 *      summary: Borrow or return a specified book
 *      tags: [Books]
 *      requestBody:
 *      responses:
 *          200:
 *              description: Borrowed/Returned a specified book
 *          500:
 *              description: Error borrow/return a specified book
 *          404:
 *              description: Book with given id does not exist
 */

//login
/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Authenticate into the API
 *      tags: [User]
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              required: true
 *                          password:
 *                              type: string
 *                              required: true
 *                      required:
 *                          - username
 *                          - password
 *      
 *      responses:
 *          200:
 *              description: Successful login ( Token stored in a cookie named `token`), You will need to include this cookie in subsequent requests.
 *              headers:
 *                  Set-Cookie:
 *                      description: Set header used for setting cookies
 *                      schema:
 *                          type: string
 *                          example: token=exampletoken; Path=/; HttpOnly
 *          500:
 *              description: Internal server error
 *          404:
 *              description: Book with given id does not exist
 */

//view login
/**
 * @swagger
 * /:
 *  get:
 *      summary: Login view
 *      tags: [View]
 *      responses:
 *          200:
 *              description: Login view response
 */

//view gallery
/**
 * @swagger
 * /gallery:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: Gallery view
 *      tags: [View]
 *      responses:
 *          200:
 *              description: Gallery view response
 */

//view borrowed gallery
/**
 * @swagger
 * /gallery/borrowed:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: Borrowed gallery view
 *      tags: [View]
 *      responses:
 *          200:
 *              description: Borrowed gallery view response
 */

//view bo
/**
 * @swagger
 * /bo:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: BO view
 *      tags: [View]
 *      responses:
 *          200:
 *              description: BO view response
 */

//view bo add book
/**
 * @swagger
 * /bo/add-book:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: BO add book view
 *      tags: [View]
 *      responses:
 *          200:
 *              description: BO add book view response
 */

//view bo update book
/**
 * @swagger
 * /bo/update-book:
 *  get:
 *      security:
 *          - cookieAuth: []
 *      summary: BO update specified book view
 *      tags: [View]
 *      parameters:
 *        - name: id
 *          in: query
 *          schema:
 *              type: string
 *          required: true
 *          description: Id of the book for update
 *      responses:
 *          200:
 *              description: BO update book view response
 */


//login route (GET)
route.get('/',services.login)

//gallery route (GET)
route.get('/gallery',authentication.authenticateJWT, services.gallery)

//taken books gallery route (GET)
route.get('/gallery/borrowed',authentication.authenticateJWT, services.gallery_borrowed)

//bo route (GET)
route.get('/bo',authentication.authenticateJWT,services.bo)

//bo add recipe route (GET)
route.get('/bo/add-book',authentication.authenticateJWT, services.bo_add_book)

//bo update recipe route (GET)
route.get('/bo/update-book',authentication.authenticateJWT, services.bo_update_book)

//API
route.post('/api/book',authentication.authenticateJWT, controller.create)
route.get('/api/book',controller.find)
route.post('/api/book/update',authentication.authenticateJWT,controller.update)
route.post('/api/book/delete',authentication.authenticateJWT, controller.delete)
route.post('/api/book/borrow/',authentication.authenticateJWT,controller.borrow)
route.post('/api/login', controller.login)

module.exports = route