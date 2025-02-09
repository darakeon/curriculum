import sortByDates from "../utils/sort-by-dates"
import toHumanDate from "../utils/to-human-date"

function Professional({ content, lang, copier }) {
	return (content &&
		<div>
			<h3>{content.ProfessionalTitle[lang]}</h3>
			{sortByDates(content.Professional).map((p, pi) => (
				<div key={pi} className="keep-together professional">
					<div className="date">
						<span className="date-start copy-me">
							{toHumanDate(p.Start, lang)}
						</span>
						<span className="date-end copy-me">
							{p.Start != p.End &&
								" – " + toHumanDate(p.End, lang)}
						</span>
					</div>

					<h4>
						<span className="copy-me" onClick={copier}>{p.Enterprise}</span>
						<small className="copy-me" onClick={copier}>
							{p.EnterpriseDescription[lang]}
						</small>
					</h4>

					<h5>
						<span className="copy-me" onClick={copier}>{p.Role[lang]}</span>
						<small className="copy-me" onClick={copier}>
							{p.Responsability[lang]}
						</small>
					</h5>

					<article className="copy-me" onClick={copier}>
						{p.Details.map((d, di) => (
							<p key={di}>{d.Text[lang]}</p>
						))}
					</article>

					<ul className="copy-me" onClick={copier}>
						{p.Highlights.map((h, hi) => (
							<li key={hi}>{h.Text[lang]}</li>
						))}
					</ul>

					<ul className="columns copy-me">
						{p.Projects.map((pj, pji) => (
							<li key={pji}>
								{pj.Text[lang]}
								<small>{pj.Tools}</small>
							</li>
						))}
					</ul>

					<div>
						{p.SkillsTitle && p.SkillsTitle[lang]}
						{p.Skills &&
							p.Skills.map((s) => <span>{p.Text};</span>)}
					</div>
				</div>
			))}
		</div>
	)
}

export default Professional
