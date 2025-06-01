import CurriculumLanguage from "../domain/curriculum-language"

import byLang from "../utils/by-lang"
import copyContent from "../utils/copy-content"


function Additional({ content, lang }: CurriculumLanguage) {
	return (content &&
		<div>
			{content.additional.map((a, ai) => (
				<div className="keep-together" key={ai}>
					<h3>{byLang(a.title, lang)}</h3>

					<ul>
						{a.items.map((i, ii) => (
							<li key={ii}>
								<span className="copy-me" onClick={copyContent}>
									{byLang(i.description, lang)}
								</span>
								<span className="additional-item-url copy-me">
									{i.url && ": " + i.url}
								</span>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default Additional
