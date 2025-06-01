import { Fragment } from "react"

import CurriculumLanguage from "../domain/curriculum-language"

import byLang from "../utils/by-lang"
import copyContent from "../utils/copy-content"


function Skills({ content, lang }: CurriculumLanguage) {
	return (content &&
		<section className="skills">
			<h2>{byLang(content.skillsTitle, lang)}</h2>

			<div className="copy-me" onClick={copyContent}>
				{content.skillsList.map((k, ki) => (
					<Fragment key={ki}>
						<span className={"skill level-" + k.level}>
							{k.tech}
						</span>
						<span className="skill-break"> </span>
					</Fragment>
				))}
			</div>
		</section>
	)
}

export default Skills
