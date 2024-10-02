const protocol = 'http'

const http = require(protocol)
const fs = require('fs')

const defaultPerson = process.env.PERSON
const defaultLang = process.env.LANGUAGE

const hostname = '0.0.0.0'
const port = 3000

const current = {
	'AF': 'huidige',
	'AM': 'ወቅታዊ',
	'AR': 'حاضِر',
	'AZ': 'cari',
	'BE': 'ток',
	'BG': 'текущ',
	'BN': 'বর্তমান',
	'BS': 'struja',
	'CA': 'actual',
	'CEB': 'kasamtangan',
	'CO': 'currente',
	'CS': 'aktuální',
	'CY': 'presennol',
	'DA': 'nuværende',
	'DE': 'aktuell',
	'EL': 'ρεύμα',
	'EN': 'current',
	'EO': 'aktuala',
	'ES': 'actual',
	'ET': 'praegune',
	'EU': 'korronte',
	'FA': 'جاری',
	'FI': 'nykyinen',
	'FR': 'actuel',
	'FY': 'aktueel',
	'GA': 'reatha',
	'GD': 'gnàthach',
	'GL': 'actual',
	'GU': 'વર્તમાન',
	'HA': 'halin yanzu',
	'HAW': 'kēia manawa',
	'HE': 'נוֹכְחִי',
	'HI': 'मौजूदा',
	'HMN': 'tam sim no',
	'HR': 'Trenutno',
	'HT': 'aktyèl',
	'HU': 'jelenlegi',
	'HY': 'ընթացիկ',
	'ID': 'saat ini',
	'IG': 'ugbu a',
	'IS': 'núverandi',
	'IT': 'attuale',
	'IW': 'נוֹכְחִי',
	'JA': '現在',
	'JW': 'saiki',
	'KA': 'მიმდინარე',
	'KK': 'ток',
	'KM': 'នា​ពេល​បច្ចុប្បន្ន',
	'KN': 'ಪ್ರಸ್ತುತ',
	'KO': '현재의',
	'KU': 'vêga',
	'KY': 'ток',
	'LA': 'current',
	'LB': 'aktuell',
	'LO': 'ປະຈຸບັນ',
	'LT': 'srovė',
	'LV': 'strāva',
	'MG': 'amin\'izao fotoana izao',
	'MI': 'nāianei',
	'MK': 'струја',
	'ML': 'നിലവിലെ',
	'MN': 'Одоогийн',
	'MR': 'वर्तमान',
	'MS': 'semasa',
	'MT': 'kurrenti',
	'MY': 'လက်ရှိ',
	'NE': 'वर्तमान',
	'NL': 'huidig',
	'NO': 'nåværende',
	'NY': 'panopa',
	'OR': 'ସାମ୍ପ୍ରତିକ',
	'PA': 'ਮੌਜੂਦਾ',
	'PL': 'aktualny',
	'PS': 'اوسنی',
	'PT': 'atual',
	'RO': 'actual',
	'RU': 'текущий',
	'SD': 'موجوده',
	'SI': 'දැනට',
	'SK': 'prúd',
	'SL': 'trenutno',
	'SM': 'taimi nei',
	'SN': 'current',
	'SO': 'hadda',
	'SQ': 'aktuale',
	'SR': 'Тренутни',
	'ST': 'jwale',
	'SU': 'ayeuna',
	'SV': 'nuvarande',
	'SW': 'sasa',
	'TA': 'தற்போதைய',
	'TE': 'ప్రస్తుత',
	'TG': 'ҷорӣ',
	'TH': 'ปัจจุบัน',
	'TL': 'kasalukuyang',
	'TR': 'akım',
	'UG': 'نۆۋەتتىكى',
	'UK': 'поточний',
	'UR': 'موجودہ',
	'UZ': 'joriy',
	'VI': 'hiện hành',
	'XH': 'yangoku',
	'YI': 'קראַנט',
	'YO': 'lọwọlọwọ',
	'ZH-CN': '当前的',
	'ZH-TW': '目前的',
	'ZU': 'okwamanje',
	'ZZ': 'zzz...'
}

const server = http.createServer((req, res) => {
	if (req.url == '/favicon.ico')
		return exit(res, 404, 'plain', null)

	if (req.url == '/main.css')
		return exit(res, 200, 'css', getFile('main.css'))

	if (req.url == '/main.js')
		return exit(res, 200, 'javascript', getFile('main.js'))

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

	const original = require(json)
	const data = JSON.parse(JSON.stringify(original))

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

	if (typeof data === 'string') {
		return html.replace(/{{Text}}/g, data)
	}

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
					const rows = Math.ceil(size / columns)

					for (let g = 0; g < size; g += columns) {
						for (let t = 0; t < columns; t++) {
							const i = t * rows + g / columns
							if (content[i]) {
								itemsToShow.push(content[i])
							}
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
	if (!content.length || !content[0].Start) return content

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
	if (!content.length || !content[0].Start) return content

	content = content.map((e) => {
		e.StartText = toDate(e.Start, lang)
		delete e.Start

		e.EndText = e.End
			? toDate(e.End, lang)
			: current[lang].toUpperCase()
		delete e.End

		if (e.StartText == e.EndText)
			delete e.EndText

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
	console.log(`Server running at ${protocol}://${hostname}:${port}/`)
})
