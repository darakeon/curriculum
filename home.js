const http = require('http')
const fs = require('fs')

const defaultPerson = process.env.PERSON
const defaultLang = process.env.LANGUAGE
const defaultHost = process.env.HOSTNAME

const hostname = defaultHost || '127.0.0.1'
const port = 3000

const current = {
	'EN': 'current',
	'PT': 'atual',
}

const server = http.createServer((req, res) => {
	if (req.url == '/favicon.ico')
		return exit(res, 404, 'plain', null)

	if (req.url == '/main.css')
		return exit(res, 200, 'css', getFile('main.css'))

	let path = req.url.split('/')

	if (path.length < 3) {
		if (defaultPerson && defaultLang) {
			path = [path[0], defaultPerson, defaultLang]
		} else {
			const message = `call ${hostname}:${port}/{name}/{lang}`
			return exit(res, 400, 'plain', message)	
		}
	}

	const person = path[1]
	const lang = path[2]

	const json = `./${person}.json`
	if (!fs.existsSync(json)) {
		const message = `not found ${json}`
		return exit(res, 404, 'plain', message)
	}

	const data = require(json)

	if (!data['Marker'])
		data['Marker'] = '&ndash;'

	let html = processParent(
		getHtml('main'),
		data,
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

	console.log(`file '${name}' not found`)
	return null
}

function processParent(html, data, lang, parent) {
	parent = !parent ? '' : `${parent}_`

	for (const key in data) {
		const content = data[key]
		if (!content) continue

		const childHtmlName = `${parent}${key}`
		const regex = new RegExp(`{{${key}(?::([HV])(\\d))?}}`)

		const hasKey = regex.test(html); regex.lastIndex = 0

		if (!hasKey) {
			console.log(`key '${key}' not found in ${html}${parent.replace('_', '')}`)
		} else if (Array.isArray(content)) {
			let groups

			while (groups = regex.exec(html)) {
				const alignment = groups[1]

				let itemsToShow = []

				if (alignment === 'H') {
					const size = content.length
					const columns = groups[2] * 1
					const rows = size / columns

					for (let g = 0; g < size; g += columns) {
						for (let t = 0; t < columns; t++) {
							const i = t * rows + g / columns
							itemsToShow.push(content[i])
						}
					}
				} else {
					itemsToShow = content
				}

				html = processChildren(html, childHtmlName, regex, itemsToShow, lang)
			}
		} else {
			while (groups = regex.exec(html)) {
				let text = content[lang] || content
				if (text === "-") text = ""
				html = html.replace(regex, text)
			}
		}
	}

	return html.replace(/{{.+}}/g, '')
}

function processChildren(html, childHtmlName, regex, content, lang) {
	const sorted = sort(content)
	const translated = translateAndAddDates(sorted, lang)

	const childHtml = getHtml(childHtmlName)
	const children = []

	for (let i in translated) {
		children.push(
			processParent(
				childHtml,
				translated[i],
				lang,
				childHtmlName
			)
		)
	}

	return html.replace(regex, children.join('\n'))
}

function sort(content) {
	if (!content[0].Start) return content

	content = content.sort((a, b) => {
		if (a.End == b.End) {
			if (a.Start < b.Start)
				return +1
			if (a.Start > b.Start)
				return -1
			return 0
		}

		if (!b.End || a.End < b.End)
			return +1
		if (!a.End || a.End > b.End)
			return -1
	})

	return content
}

function translateAndAddDates(content, lang) {
	if (!content[0].Start) return content

	content = content.map((e) => {
		e.StartText = toDate(e.Start, lang)
		delete e.Start

		e.EndText = e.End
			? toDate(e.End, lang)
			: current[lang].toUpperCase()
		delete e.End

		return e
	})

	return content
}

function toDate(text, lang) {
	const parts = text.split('-')
	switch (parts.length) {
		case 2:
			const javaMonth = parts[1] - 1;
			const month = new Date(parts[0], javaMonth)
				.toLocaleString(lang, { month: 'short' })
				.replace(".", "")
				.toUpperCase()

			return `${month}/${parts[0]}`
		default:
			return text
	}
}

function getHtml(name) {
	return getFile(`${name}.html`)
}

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)
})
