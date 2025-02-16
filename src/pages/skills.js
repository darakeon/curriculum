import { Fragment } from "react"

import copyContent from "../utils/copy-content"


function Skills({ content, lang }) {
	return (content &&
		<section className="skills">
			<h2>{content.SkillsTitle[lang]}</h2>

			<div className="copy-me" onClick={copyContent}>
				{content.SkillsList.map((k, ki) => (
					<Fragment key={ki}>
						<span className={"skill level-" + k.Level}>
							{k.Tech}
						</span>
						<span className="skill-break"> </span>
					</Fragment>
				))}
			</div>
		</section>
	)
}

export default Skills
