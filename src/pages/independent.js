import toHumanDate from "../utils/to-human-date"

function Independent({ content, lang, copier }) {
	return (content &&
		<div className="start-page">
			<h3>{content.IndependentTitle[lang]}</h3>
			{content.Independent.map((i, ii) => (
				<div className="keep-together" key={ii}>
					<div className="date">
						<span className="date-start copy-me">
							{toHumanDate(i.Start, lang)}
						</span>
						<span className="date-end copy-me">
							{i.Start != i.End &&
								" – " + toHumanDate(i.End, lang)}
						</span>
					</div>

					<h4>
						<span className="copy-me" onClick={copier}>{i.Enterprise}</span>
						<small className="copy-me" onClick={copier}>
							{i.EnterpriseDescription[lang]}
						</small>
					</h4>

					<ul>
						{i.Urls.map((u, ui) => (
							<li className="copy-me" onClick={copier} key={ui}>
								{u.Url}
							</li>
						))}
					</ul>

					<h5>
						<span className="copy-me" onClick={copier}>{i.Role[lang]}</span>
						<small className="copy-me" onClick={copier}>{i.Responsability}</small>
					</h5>

					<article className="copy-me" onClick={copier}>
						{i.Details.map((d, di) => (
							<p key={di}>{d.Text[lang]}</p>
						))}
					</article>

					<ul className="copy-me" onClick={copier}>
						{i.Highlights.map((h, hi) => (
							<li key={hi}>{h.Text[lang]}</li>
						))}
					</ul>

					<ul className="columns copy-me">
						{i.Projects.map((p, pi) => (
							<li key={pi}>
								{p.Text[lang]}
								<small>{p.Tools}</small>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default Independent
