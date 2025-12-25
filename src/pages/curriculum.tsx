import { Fragment } from 'react'

import CurriculumLanguage from '../domain/curriculum-language'

import byLang from "../utils/by-lang"
import copyContent from "../utils/copy-content"

import Professional from "./professional"
import Academic from "./academic"
import Profiles from "./profiles"
import Independent from "./independent"
import Additional from "./additional"


function Curriculum({ content, lang }: CurriculumLanguage) {
	return (content &&
		<section className="curriculum">
			<h2 className="copy-me" onClick={copyContent}>{content.name}</h2>
			<dl>
				{content.contacts.map((c, ci) => (
					<Fragment key={ci}>
						<dt>{byLang(c.name, lang)}</dt>
						<dd className="copy-me" onClick={copyContent}>{c.value}</dd>
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
