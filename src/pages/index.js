import content from "./lucas-carol.json"
import CoverLetter from "./cover-letter"
import Knowledge from "./knowledge"
import Curriculum from "./curriculum"

function Home() {
	const lang = "EN"

	return (
		<>
			<CoverLetter content={content} lang={lang} />
			<Knowledge content={content} lang={lang} />
			<Curriculum content={content} lang={lang} />
		</>
	)
}

export default Home
