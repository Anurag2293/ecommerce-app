import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/provider'

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000'

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'SwiftKart - Ecommerce App',
	description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-background text-foreground">
				<main className="min-h-screen flex flex-col items-center">
					<Provider>
						<header className='w-screen'>
							<Nav />
						</header>
						{children}
					</Provider>
				</main>
			</body>
		</html>
	)
}
