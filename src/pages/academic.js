import sortByDates from "../utils/sort-by-dates"
import toHumanDate from "../utils/to-human-date"
import copyContent from "../utils/copy-content"


function Academic({ content, lang }) {
	return (content &&
		<div className="start-page">
			<h3>{content.AcademicTitle[lang]}</h3>
			{sortByDates(content.Academic).map((a, ai) => (
				<div className="keep-together academic" key={ai}>
					<div className="date">
						<span className="date-start copy-me">
							{toHumanDate(a.Start, lang)}
						</span>
						<span className="date-end copy-me">
							{a.Start != a.End &&
								" – " + toHumanDate(a.End, lang)}
						</span>
					</div>

					<h4>
						<span className="copy-me" onClick={copyContent}>{a.Instituition}</span>
						<small className="copy-me" onClick={copyContent}>
							{a.Course[lang] ?? a.Course}
						</small>
					</h4>

					<div>
						<span className="copy-me" onClick={copyContent}>
							{a.Description && a.Description[lang]}
						</span>
						<ul className="copy-me" onClick={copyContent}>
							{a.Modules &&
								a.Modules.map((m, mi) => <li key={mi}>{m}</li>)}
						</ul>
					</div>
				</div>
			))}
		</div>
	)
}

export default Academic
