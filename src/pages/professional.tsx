import CurriculumLanguage from "../domain/curriculum-language"
import professional from "../domain/professional"

import byLang from "../utils/by-lang"
import copyContent from "../utils/copy-content"
import sortByDates from "../utils/sort-by-dates"
import toHumanDate from "../utils/to-human-date"


function Professional({ content, lang }: CurriculumLanguage) {
	return (content &&
		<div>
			<h3>{byLang(content.professionalTitle, lang)}</h3>
			{sortByDates(content.professional).map((p: professional, pi) => (
				<div key={pi} className="keep-together professional">
					<div className="date">
						<span className="date-start copy-me">
							{toHumanDate(p.start, lang)}
						</span>
						<span className="date-end copy-me">
							{p.start != p.end &&
								" – " + toHumanDate(p.end, lang)}
						</span>
					</div>

					<h4>
						<span className="copy-me" onClick={copyContent}>
							{p.enterprise}
						</span>
						<small className="copy-me" onClick={copyContent}>
							{byLang(p.enterpriseDescription, lang)}
						</small>
					</h4>

					<h5>
						<span className="copy-me" onClick={copyContent}>
							{byLang(p.role, lang)}
						</span>
						<small className="copy-me" onClick={copyContent}>
							{p.responsibility && byLang(p.responsibility, lang)}
						</small>
					</h5>

					<article className="copy-me" onClick={copyContent}>
						{p.details.map((d, di) => (
							<p key={di}>{byLang(d.text, lang)}</p>
						))}
					</article>

					<ul className="copy-me" onClick={copyContent}>
						{p.highlights.map((h, hi) => (
							<li key={hi}>{byLang(h.text, lang)}</li>
						))}
					</ul>

					<ul className="columns copy-me">
						{p.projects.map((pj, pji) => (
							<li key={pji}>
								{byLang(pj.text, lang)}
								<small>{pj.tools}</small>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default Professional
