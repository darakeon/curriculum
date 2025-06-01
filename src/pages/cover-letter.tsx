import { Fragment } from 'react'

import CurriculumLanguage from '../domain/curriculum-language'

import byLang from "../utils/by-lang"
import copyContent from "../utils/copy-content"


function CoverLetter({ content, lang }: CurriculumLanguage) {
	return (content &&
		<section className="cover-letter">
			<h1>{byLang(content.coverLetterTitle, lang)}</h1>
			<h2 className="copy-me" onClick={copyContent}>{content.name}</h2>
			<dl>
				{content.contacts.map((c, ci) => (
					<Fragment key={ci}>
						<dt>{byLang(c.name, lang)}</dt>
						<dd className="copy-me" onClick={copyContent}>{c.value}</dd>
					</Fragment>
				))}
			</dl>

			<article className="copy-me" onClick={copyContent}>
				{content.coverLetter.map((c, ci) => (
					<p key={ci}>{byLang(c.paragraph, lang)}</p>
				))}

				<p>
					{byLang(content.coverLetterClosing, lang)}, <br />
					{content.signature}
				</p>
			</article>
		</section>
	)
}

export default CoverLetter
