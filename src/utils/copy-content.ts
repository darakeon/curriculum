import React from "react"

async function copyContent(event: React.MouseEvent<HTMLElement>) {
	try {
		await navigator.clipboard.writeText(event.currentTarget.innerText)
	} catch (err) {
		console.error("Erro ao copiar para o clipboard:", err)
	}
}

export default copyContent
