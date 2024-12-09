import { Fragment } from "react"

function Knowledge({ content, lang }) {
	return (
		<section className="knowledges">
			<h2>{content.KnowledgesTitle[lang]}</h2>

			<div className="copy-me">
				{content.KnowledgesList.map((k, ki) => (
					<Fragment key={ki}>
						<span className={"knowledge level-" + k.Level}>
							{k.Tech}
						</span>
						<span className="knowledge-break"> </span>
					</Fragment>
				))}
			</div>
		</section>
	)
}

export default Knowledge
