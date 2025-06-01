import CurriculumLanguage from "../domain/curriculum-language"

import byLang from "../utils/by-lang"
import copyContent from "../utils/copy-content"


function Profiles({ content, lang }: CurriculumLanguage) {
	return (content &&
		<div className="keep-together">
			<h3>{byLang(content.profilesTitle, lang)}</h3>
			{content.profiles.map((p, pi) => (
				<div key={pi} className="keep-together profile">
					<h4 className="copy-me" onClick={copyContent}>{p.name}</h4>

					<p>
						<a href="{{Url}}" target="_blank">
							{p.url}
						</a>
					</p>
				</div>
			))}
		</div>
	)
}

export default Profiles
