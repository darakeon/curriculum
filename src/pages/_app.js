import "../styles/global.css"
import "../styles/lucas-carol.css"
import Head from "next/head";

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
