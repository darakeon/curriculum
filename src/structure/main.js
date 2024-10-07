const copyContent = async (obj) => {
	try {
		await navigator.clipboard.writeText(obj.innerText);
		console.log(obj.innerText);
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
}

const copiables = document.getElementsByClassName('copy-me')

for(let c = 0; c < copiables.length; c++) {
	const copiable = copiables[c]
	copiable.addEventListener(
		'click',
		async () => await copyContent(copiable)
	)
}
