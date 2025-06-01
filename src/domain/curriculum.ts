import Academic from "./academic"
import Additional from "./additional"
import Contact from "./contact"
import CoverLetter from "./cover-letter"
import Multilanguage from "./multilanguage"
import Professional from "./professional"
import Profile from "./profile"
import Skill from "./skill"


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


export default Curriculum
