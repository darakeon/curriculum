import content from "../content/lucas-carol.json"
import CoverLetter from "./cover-letter"
import Knowledge from "./knowledge"
import Curriculum from "./curriculum"

function Home() {
	const lang = "EN"

	return (content &&
		<>
			<CoverLetter content={content} lang={lang} />
			<Knowledge content={content} lang={lang} />
			<Curriculum content={content} lang={lang} />
		</>
	)
}

export default Home
