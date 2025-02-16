import { Fragment } from 'react'

import copyContent from "../utils/copy-content"


function CoverLetter({ content, lang }) {
	return (content &&
		<section className="cover-letter">
			<h1>{content.CoverLetterTitle[lang]}</h1>
			<h2 className="copy-me" onClick={copyContent}>{content.Name}</h2>
			<dl>
				{content.Contacts.map((c, ci) => (
					<Fragment key={ci}>
						<dt>{c.Name[lang] ?? c.Name}</dt>
						<dd className="copy-me" onClick={copyContent}>{c.Value}</dd>
					</Fragment>
				))}
			</dl>

			<article className="copy-me" onClick={copyContent}>
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
