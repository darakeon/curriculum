import Dateable from "./dateable"
import Multilanguage from "./multilanguage"
import Project from "./project"
import Text from "./text"
import Url from "./url"


interface Professional extends Dateable {
	enterprise: string
	enterpriseDescription: Multilanguage
	role: Multilanguage
	responsibility?: Multilanguage
	details: Text[]
	highlights: Text[]
	urls?: Url[]
	projects: Project[]
}


export default Professional
