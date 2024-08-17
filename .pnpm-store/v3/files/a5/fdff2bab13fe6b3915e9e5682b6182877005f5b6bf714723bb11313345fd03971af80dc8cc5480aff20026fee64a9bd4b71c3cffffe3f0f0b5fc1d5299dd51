# express-custom-error
A nodejs module that hacks into express in order to add custom error handling support

## Installation

Install using npm

> npm install express-custom-error --save

## Usage

Just require this module and call it's method **inject** before using express,

this will inject the necessary code into the express module.

````javascript
// Patch express with the inject method
require('express-custom-error').inject();

// Then use express normally
const express = require('express');
````

## Example

````javascript
// Inject express custom error into express with the inject method
const { inject, errorHandler } = require('express-custom-error');
inject();

const express = require('express');
const app = express();

app.get('/error', async (req, res) => {
     
     throw {code: 400, message: 'I dont like you'}; // This is how you throw custom errors
    
     res.json({status: true, data: ['Pablo', 'Perry', 'Jana']]}); // This will not be executed
})

// In order to handle errors, you can use the built in error handler middleware

app.use( errorHandler() ); // If no error is found it will call the next middleware

// Then you might want to handle not found routes
app.use('*', (req, res) => {
 res
 .status(404) // 404 = resource not found
 .json({ status: false, message: 'Route not found' }); // Json response
})

app.listen(3000);
`````

