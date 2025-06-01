import curriculum from "../domain/curriculum"

import json from "../content/lucas-carol.json"
import CoverLetter from "./cover-letter"
import Skills from "./skills"
import Curriculum from "./curriculum"


function Home() {
	const lang = "EN"

	const content: curriculum = json

	return (content &&
		<>
			<CoverLetter content={content} lang={lang} />
			<Skills content={content} lang={lang} />
			<Curriculum content={content} lang={lang} />
		</>
	)
}

export default Home
