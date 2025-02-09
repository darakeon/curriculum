import content from "../content/lucas-carol.json"
import CoverLetter from "./cover-letter"
import Skills from "./skills"
import Curriculum from "./curriculum"

async function copier(obj) {
	await navigator.clipboard.writeText(obj.target.innerText);
}

function Home() {
	const lang = "EN"

	return (content &&
		<>
			<CoverLetter content={content} lang={lang} copier={copier} />
			<Skills content={content} lang={lang} copier={copier} />
			<Curriculum content={content} lang={lang} copier={copier} />
		</>
	)
}

export default Home
