function Additional({ content, lang }) {
	return (
		<div>
			{content.Additional.map((a, ai) => (
				<div className="keep-together" key={ai}>
					<h3>{a.Title[lang]}</h3>

					<ul>
						{a.Items.map((i, ii) => (
							<li key={ii}>
								<span className="copy-me">
									{i.Description[lang] ?? i.Description}
								</span>
								<span className="additional-item-url copy-me">
									{i.Url && ": " + i.Url}
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
