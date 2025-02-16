import copyContent from "../utils/copy-content"


function Profiles({ content, lang }) {
	return (content &&
		<div className="keep-together">
			<h3>{content.ProfilesTitle[lang]}</h3>
			{content.Profiles.map((p, pi) => (
				<div key={pi} className="keep-together profile">
					<h4 className="copy-me" onClick={copyContent}>{p.Name}</h4>

					<p>
						<a href="{{Url}}" target="_blank">
							{p.Url}
						</a>
					</p>
				</div>
			))}
		</div>
	)
}

export default Profiles
