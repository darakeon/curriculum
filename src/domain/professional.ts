import Dateable from "./dateable"
import Multilanguage from "./multilanguage"
import Project from "./project"
import Text from "./text"
import Url from "./url"


interface Professional extends Dateable {
	role: Multilanguage
	responsibility?: Multilanguage
	enterprise: string
	enterpriseDescription: Multilanguage
	client: string
	clientDescription: Multilanguage
	details: Text[]
	highlights: Text[]
	urls?: Url[]
	projects: Project[]
}


export default Professional
