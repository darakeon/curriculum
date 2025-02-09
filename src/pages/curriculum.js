import { Fragment } from 'react'

import Professional from "./professional"
import Academic from "./academic"
import Profiles from "./profiles"
import Independent from "./independent"
import Additional from "./additional"

function Curriculum({ content, lang, copier }) {
	return (content &&
		<section className="curriculum">
			<h2 className="copy-me" onClick={copier}>{content.Name}</h2>
			<dl>
				{content.Contacts.map((c, ci) => (
					<Fragment key={ci}>
						<dt>{c.Name[lang] ?? c.Name}</dt>
						<dd className="copy-me" onClick={copier}>{c.Value}</dd>
					</Fragment>
				))}
			</dl>

			<Professional content={content} lang={lang} copier={copier} />
			<Academic content={content} lang={lang} copier={copier} />
			<Profiles content={content} lang={lang} copier={copier} />
			<Independent content={content} lang={lang} copier={copier} />
			<Additional content={content} lang={lang} copier={copier} />
		</section>
	)
}

export default Curriculum
