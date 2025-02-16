import { Fragment } from 'react'

import copyContent from "../utils/copy-content"

import Professional from "./professional"
import Academic from "./academic"
import Profiles from "./profiles"
import Independent from "./independent"
import Additional from "./additional"


function Curriculum({ content, lang }) {
	return (content &&
		<section className="curriculum">
			<h2 className="copy-me" onClick={copyContent}>{content.Name}</h2>
			<dl>
				{content.Contacts.map((c, ci) => (
					<Fragment key={ci}>
						<dt>{c.Name[lang] ?? c.Name}</dt>
						<dd className="copy-me" onClick={copyContent}>{c.Value}</dd>
					</Fragment>
				))}
			</dl>

			<Professional content={content} lang={lang} />
			<Academic content={content} lang={lang} />
			<Profiles content={content} lang={lang} />
			<Independent content={content} lang={lang} />
			<Additional content={content} lang={lang} />
		</section>
	)
}

export default Curriculum
