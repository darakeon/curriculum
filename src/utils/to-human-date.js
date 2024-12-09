const current = {
	AF: "huidige",
	AM: "ወቅታዊ",
	AR: "حاضِر",
	AZ: "cari",
	BE: "ток",
	BG: "текущ",
	BN: "বর্তমান",
	BS: "struja",
	CA: "actual",
	CEB: "kasamtangan",
	CO: "currente",
	CS: "aktuální",
	CY: "presennol",
	DA: "nuværende",
	DE: "aktuell",
	EL: "ρεύμα",
	EN: "current",
	EO: "aktuala",
	ES: "actual",
	ET: "praegune",
	EU: "korronte",
	FA: "جاری",
	FI: "nykyinen",
	FR: "actuel",
	FY: "aktueel",
	GA: "reatha",
	GD: "gnàthach",
	GL: "actual",
	GU: "વર્તમાન",
	HA: "halin yanzu",
	HAW: "kēia manawa",
	HE: "נוֹכְחִי",
	HI: "मौजूदा",
	HMN: "tam sim no",
	HR: "Trenutno",
	HT: "aktyèl",
	HU: "jelenlegi",
	HY: "ընթացիկ",
	ID: "saat ini",
	IG: "ugbu a",
	IS: "núverandi",
	IT: "attuale",
	IW: "נוֹכְחִי",
	JA: "現在",
	JW: "saiki",
	KA: "მიმდინარე",
	KK: "ток",
	KM: "នា​ពេល​បច្ចុប្បន្ន",
	KN: "ಪ್ರಸ್ತುತ",
	KO: "현재의",
	KU: "vêga",
	KY: "ток",
	LA: "current",
	LB: "aktuell",
	LO: "ປະຈຸບັນ",
	LT: "srovė",
	LV: "strāva",
	MG: "amin'izao fotoana izao",
	MI: "nāianei",
	MK: "струја",
	ML: "നിലവിലെ",
	MN: "Одоогийн",
	MR: "वर्तमान",
	MS: "semasa",
	MT: "kurrenti",
	MY: "လက်ရှိ",
	NE: "वर्तमान",
	NL: "huidig",
	NO: "nåværende",
	NY: "panopa",
	OR: "ସାମ୍ପ୍ରତିକ",
	PA: "ਮੌਜੂਦਾ",
	PL: "aktualny",
	PS: "اوسنی",
	PT: "atual",
	RO: "actual",
	RU: "текущий",
	SD: "موجوده",
	SI: "දැනට",
	SK: "prúd",
	SL: "trenutno",
	SM: "taimi nei",
	SN: "current",
	SO: "hadda",
	SQ: "aktuale",
	SR: "Тренутни",
	ST: "jwale",
	SU: "ayeuna",
	SV: "nuvarande",
	SW: "sasa",
	TA: "தற்போதைய",
	TE: "ప్రస్తుత",
	TG: "ҷорӣ",
	TH: "ปัจจุบัน",
	TL: "kasalukuyang",
	TR: "akım",
	UG: "نۆۋەتتىكى",
	UK: "поточний",
	UR: "موجودہ",
	UZ: "joriy",
	VI: "hiện hành",
	XH: "yangoku",
	YI: "קראַנט",
	YO: "lọwọlọwọ",
	"ZH-CN": "当前的",
	"ZH-TW": "目前的",
	ZU: "okwamanje",
	ZZ: "zzz...",
}

function toHumanDate(date, lang) {
	if (!date) return current[lang].toUpperCase()

	const parts = date.split("-")
	switch (parts.length) {
		case 2:
			const javaMonth = parts[1] - 1
			const month = new Date(parts[0], javaMonth)
				.toLocaleString(lang, { month: "short" })
				.replace(".", "")
				.toUpperCase()

			return `${month}/${parts[0]}`
		default:
			return date
	}
}

export default toHumanDate
