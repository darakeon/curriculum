import CurriculumLanguage from "../domain/curriculum-language"

import byLang from "../utils/by-lang"
import copyContent from "../utils/copy-content"
import toHumanDate from "../utils/to-human-date"


function Independent({ content, lang }: CurriculumLanguage) {
	return (content &&
		<div className="start-page">
			<h3>{byLang(content.independentTitle, lang)}</h3>
			{content.independent.map((i, ii) => (
				<div className="keep-together" key={ii}>
					<div className="date">
						<span className="date-start copy-me">
							{toHumanDate(i.start, lang)}
						</span>
						<span className="date-end copy-me">
							{i.start != i.end &&
								" – " + toHumanDate(i.end, lang)}
						</span>
					</div>

					<h4>
						<span className="copy-me" onClick={copyContent}>{i.enterprise}</span>
						<small className="copy-me" onClick={copyContent}>
							{byLang(i.enterpriseDescription, lang)}
						</small>
					</h4>

					<ul>
						{i.urls?.map((u, ui) => (
							<li className="copy-me" onClick={copyContent} key={ui}>
								{u.url}
							</li>
						))}
					</ul>

					<h5>
						<span className="copy-me" onClick={copyContent}>
							{byLang(i.role, lang)}
						</span>
						<small className="copy-me" onClick={copyContent}>
							{i.responsibility && byLang(i.responsibility, lang)}
						</small>
					</h5>

					<article className="copy-me" onClick={copyContent}>
						{i.details.map((d, di) => (
							<p key={di}>{byLang(d.text, lang)}</p>
						))}
					</article>

					<ul className="copy-me" onClick={copyContent}>
						{i.highlights.map((h, hi) => (
							<li key={hi}>{byLang(h.text, lang)}</li>
						))}
					</ul>

					<ul className="columns copy-me">
						{i.projects.map((p, pi) => (
							<li key={pi}>
								{byLang(p.text, lang)}
								<small>{p.tools}</small>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default Independent
