import Multilanguage from "../domain/multilanguage"


function byLang(multi: Multilanguage, lang: string): string {
	if (!multi || typeof multi === "string")
		return multi
	else
		return multi[lang]
}


export default byLang
