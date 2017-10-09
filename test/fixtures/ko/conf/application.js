const { join } = require('path')

module.exports = {
	mono: {
		redis: {
			port: 8047
		},
		modules: [
			join(__dirname, '../../../../')
		]
	}
}
