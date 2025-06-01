import academic from "../domain/academic"
import CurriculumLanguage from "../domain/curriculum-language"

import byLang from "../utils/by-lang"
import copyContent from "../utils/copy-content"
import sortByDates from "../utils/sort-by-dates"
import toHumanDate from "../utils/to-human-date"


function Academic({ content, lang }: CurriculumLanguage) {
	return (content &&
		<div className="start-page">
			<h3>{byLang(content.academicTitle, lang)}</h3>
			{sortByDates(content.academic).map((a: academic, ai) => (
				<div className="keep-together academic" key={ai}>
					<div className="date">
						<span className="date-start copy-me">
							{toHumanDate(a.start, lang)}
						</span>
						<span className="date-end copy-me">
							{a.start != a.end &&
								" – " + toHumanDate(a.end, lang)}
						</span>
					</div>

					<h4>
						<span className="copy-me" onClick={copyContent}>
							{a.institution}
						</span>
						<small className="copy-me" onClick={copyContent}>
							{byLang(a.course, lang)}
						</small>
					</h4>

					<div>
						<span className="copy-me" onClick={copyContent}>
							{a.description && byLang(a.description, lang)}
						</span>
						<ul className="copy-me" onClick={copyContent}>
							{a.modules &&
								a.modules.map((m, mi) => <li key={mi}>{m}</li>)}
						</ul>
					</div>
				</div>
			))}
		</div>
	)
}

export default Academic
