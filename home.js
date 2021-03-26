const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
	if (req.url == '/favicon.ico')
		return exit(res, 404, 'text', null)

	if (req.url == '/main.css')
		return exit(res, 200, 'css', getFile('main.css'))
		
	const path = req.url.split('/')
	const person = path[1]
	const lang = path[2]

	const json = `./${person}.json`
	if (!fs.existsSync(json)) {
		const message = `not found ${json}`
		return exit(res, 404, 'text', message)
	}

	let html = process(
		getHtml('main'),
		require(json),
		lang
	)

	return exit(res, 200, 'html', html)
})

function exit(res, code, type, result) {
	res.statusCode = code
	res.setHeader('Content-Type', `text/${type}`)
	res.end(result)
}

function getFile(name) {
	name = `content/${name.toLowerCase()}`

	if (fs.existsSync(name))
		return fs.readFileSync(name).toString()

	console.log(`not found ${name}`)
	return null
}

function process(html, data, lang, parent) {
	parent = !parent ? '' : `${parent}_`

	for (const key in data) {
		const processing = `${parent}${key}`

		const content = data[key]
		const regex = new RegExp(`{{${key}}}`, 'g')

		if (typeof(content) != 'string' && content.length) {
			const childHtml = getHtml(processing)

			const children = []

			for(const i in content) {
				children.push(
					process(
						childHtml, 
						content[i], 
						lang, 
						processing
					)
				)
			}
			html = html.replace(regex, children.join('\n'))

		} else {

			if (html.indexOf(key) < 0) {
				console.log(`not find ${processing}`)
			} else {
				if (content[lang])
					html = html.replace(regex, content[lang])
				else
					html = html.replace(regex, content)
			}
		}
	}

	return html.replace(/{{.+}}/g, '');
}

function getHtml(name) {
	return getFile(`${name}.html`)
}

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})
