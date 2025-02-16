async function copyContent(obj) {
	await navigator.clipboard.writeText(obj.target.innerText);
}

export default copyContent
