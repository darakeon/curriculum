import { Fragment } from "react"

function Skills({ content, lang, copier }) {
	return (content &&
		<section className="skills">
			<h2>{content.SkillsTitle[lang]}</h2>

			<div className="copy-me" onClick={copier}>
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
