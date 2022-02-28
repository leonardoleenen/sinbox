import '../styles/globals.css'
// import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Header from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Header>
                <script
                    type="module"
                    src="https://unpkg.com/dmn-js@11.1.2/dist/dmn-modeler.development.js"
                    async={false}
                ></script>
            </Header>
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
