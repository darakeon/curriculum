type Multilanguage = string | { [key: string]: string }

interface Curriculum {
	name: string
	signature: string

	contacts: Contact[]

	coverLetterTitle: Multilanguage
	coverLetter: CoverLetter[]
	coverLetterClosing: Multilanguage

	skillsTitle: Multilanguage
	skillsList: Skill[]

	professionalTitle: Multilanguage
	professional: Professional[]

	freelanceTitle: Multilanguage
	freelance: Professional[]

	profilesTitle: Multilanguage
	profiles: Profile[]

	independentTitle: Multilanguage
	independent: Professional[]

	academicTitle: Multilanguage
	academic: Academic[]

	additional: Additional[]
}

interface Contact {
	name: Multilanguage
	value: string
}

interface CoverLetter {
	paragraph: Multilanguage
}

interface Skill {
	tech: string
	level: number
}

interface Professional extends Dateable {
	enterprise: string
	enterpriseDescription: Multilanguage
	role: Multilanguage
	responsibility?: Multilanguage | null
	details: Text[]
	highlights: Text[]
	urls?: Url[] | null
	projects: Project[]
}

interface Text { // remove
	text: Multilanguage
}

interface Project {
	text: Multilanguage
	tools: string // make string[]
}

interface Profile {
	name: string
	url: string
}

interface Url { // remove
	url: string
}

interface Academic extends Dateable {
	institution: string
	description: Multilanguage
	course: Multilanguage
	modules: string[]
}

interface Additional {
	title: Multilanguage
	items: AdditionalItem[]
}

interface AdditionalItem { // remove
	description: Multilanguage
	url: string
}

interface Dateable {
	start: string // yyyy-MM
	end: string // yyyy-MM
}
