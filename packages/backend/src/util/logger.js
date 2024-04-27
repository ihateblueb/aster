const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')
const fs = require('fs')

// log directory path
const logDirectory = path.resolve(__dirname, '../../../../logs')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
const accessLogStream = rfs('requests.log', {
    interval: '1d',
    path: logDirectory
})

module.exports = {
    dev: morgan('dev'),
    combined: morgan('combined', { stream: accessLogStream })
}
