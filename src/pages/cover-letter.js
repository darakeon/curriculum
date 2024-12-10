import { Fragment } from 'react'

function CoverLetter({ content, lang }) {
	return (content && content.CoverLetterTitle &&
		<section className="cover-letter">
			<h1>{content.CoverLetterTitle[lang]}</h1>
			<h2 className="copy-me">{content.Name}</h2>
			<dl>
				{content.Contacts.map((c, ci) => (
					<Fragment key={ci}>
						<dt>{c.Name[lang] ?? c.Name}</dt>
						<dd className="copy-me">{c.Value}</dd>
					</Fragment>
				))}
			</dl>

			<article className="copy-me">
				{content.CoverLetter.map((c, ci) => (
					<p key={ci}>{c.Paragraph[lang]}</p>
				))}

				<p>
					{content.CoverLetterClosing[lang]}, <br />
					{content.Signature}
				</p>
			</article>
		</section>
	)
}

export default CoverLetter
