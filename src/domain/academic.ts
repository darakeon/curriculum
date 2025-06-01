import Dateable from "./dateable"
import Multilanguage from "./multilanguage"


interface Academic extends Dateable {
    institution: string
    description?: Multilanguage
    course: Multilanguage
    modules?: string[]
}


export default Academic
