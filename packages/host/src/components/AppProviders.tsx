import Head from "next/head"
import { CommunicatorProvider } from "./Communicator"

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommunicatorProvider>
      <Head>
        <title>Host App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ maxWidth: 620, margin: "auto", border: "1px solid red", padding: 20 }}>
        <h1>Host app</h1>
        {children}
      </main>
    </CommunicatorProvider>
  )
}
