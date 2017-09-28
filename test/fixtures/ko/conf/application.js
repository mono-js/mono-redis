const { join } = require('path')

module.exports = {
	mono: {
		modules: [
			join(__dirname, '../../../../')
		]
	},
	redis: {
		port: 8047
	}
}
