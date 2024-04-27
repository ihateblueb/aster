const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')
const fs = require('fs')

const logDirectory = path.resolve(__dirname, '../../../../logs')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs('requests.log', {
	interval: '1d',
	path: logDirectory
})

module.exports = {
	dev: morgan('dev'),
	combined: morgan('combined', { stream: accessLogStream })
}
