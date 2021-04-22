# CRUD app with `.populate()`

<br>

## Context

So far, the main focus was on understanding how CRUD works, and this is the time to check how well you have understood its basics.

**This challenge is about building a basic application containing three models and some CRUD routes.**

<br>

## Getting Started

All your work should be done in the **`Your Solution`** section.
The file already includes the basic Express server setup and all the packages that you need.

Due to the testing environment set up, you should not change the provided setup, which is also indicated by the comments:

```js
/* Environment setup. Do not modify the above code. */
```

<br>
```%info
There is no need to set up the MongoDB connection and mongoose -
`mongoose` is preloaded and already available for you, there is **no need** to `require` it.

Just use it as usual:

- `mongoose.model()` - to create the model and
- `new mongoose.Schema({})` - for creating the Schema.
- `mongoose.Schema.Types.ObjectId` - for setting an id reference field type

````

<br>

To begin working you just need to start writing your code inside the `Your Solution` section.

<br>

## Task & Objectives

All your work should be in the `Your Solution` file. All the tests are saved in the `Sample Tests (Modifiable)` file.

**Hint**: You will work on a single file in all the iterations in this challenge. This implies that you don't have to export and import your models since you will be creating them in the same file where they will be used afterward.

<br>

### Task 1: Create the models `Album`, `User` and `Purchase`
⠀
The `Album` model should have the following properties:

- `performer` - String
- `title` - String
- `cost` - Number

<br>

The `User` model should have the following property:

- `name` - String

<br>

The `Purchase` model should have the following properties:

- `user` - `ObjectId` referring to the `User` model
- `album` - `ObjectId` referring to the `Album` model

<br>


### Task 2: Create routes to perform CRUD operations on the `Album` model
⠀
Before you start working on the tasks, read through the below instructions.
⠀
#### Requests

You can always add a `console.log(req.body)` or `console.log(req.params)` to check the content of the request body or the route parameters. The log will be visible in the **Test Results** on the right.
<br>

#### Responses

All your routes will have to return JSON response. This means we will not use the render method on the Express response but instead, we have to use `res.json()`.


As we just explained, all routes should return an *object* via `res.json()`. The document(s) from the database should be saved in a key named `data`.

Example:

```js
SomeModel.find()
  .then( (someDocuments) => res.json({ data: someDocuments }))
  .catch((err) => console.log(err));
````

<br>
 <hr>

### Task 2.1: Create route `POST /albums`

<br>

This route will receive requests containing the object with the album information: `performer`, `title`, `cost`.

You can access these values through `req.body`.

The route should:

- Create a new album from the values received in the `req.body`, using the `Album` model.
- Return a JSON response including the created album object.

<br>
 <hr>

### Task 2.2: Create route `GET /albums`

<br>

The route should:

- Retrieve all the albums from the database, using the `Album` model.
- Return a JSON response including all of the retrieved album documents.

<br>
 <hr>

### Task 2.3: Create route `GET /albums/:albumId`

<br>

This route will receive the id of the album as the route parameter `albumId`.

The route should:

- Retrieve a single album document by its `_id`, using the `Album` model.
- Return a JSON response including the retrieved album object.

<br>
 <hr>

### Task 2.4: Create route `POST /albums/:albumId`

<br>

The route will receive the id of the album to be _updated_ as the route parameter `albumId`.

The request will contain the album information: `performer`, `title`, `cost`.
You can access these values through `req.body`.

The route should:

- Update an existing album by its `_id`, using the `Album` model.
- Return a JSON response including the updated album object.

<br>
 <hr>

### Task 2.5: Create route `POST /albums/:albumId/delete`

<br>

The route will receive the id of the album to be _deleted_ as the route parameter `albumId`.

The route should:

- Delete an existing album by its `_id`, using the `Album` model.
- Return a response including _only_ the HTTP status code of `204`.

Here you should use the `findOneAndRemove()` mongoose method to delete an existing album by its `_id`. The reason for this, in case you are curious, is that the mongoose version in this environment doesn't support using other methods to remove the document from the collection.

This route should return only an HTTP status, instead of using `res.json()` you should use `res.sendStatus()`.

To return the status code check this part in the Express documentation: http://expressjs.com/de/api.html#res.sendStatus

<br>
 <hr>

### Task 3: Create route `POST /purchases`

<br>

#### Request

This route will receive the `user` and the `album` objects in the request body (`req.body.user` and `req.body.album`).
A single purchase document should have only two properties storing the `_id` references to _user_ and _album_.

<br>

#### Response

This route should return a JSON response containing the newly created `purchase` object.
However, the `user` and the `album` properties of the object are just references (`_id`s) so you will have to **`.populate`** these fields to get more details (not just their ids).

<br>

Good luck!

_Your Ironhack team_