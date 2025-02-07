import "../styles/global.css"
import "../styles/lucas-carol.css"

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Lucas Carol</title>
			</Head>
			<Component {...pageProps} />
		</>
	)
}
