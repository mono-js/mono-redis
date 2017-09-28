const { join } = require('path')

module.exports = {
	mono: {
		http: {
			port: 5678
		},
		modules: [
			join(__dirname, '../../../../')
		]
	}
}
