import '~/styles/globals.css';

import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-sans'
});

export const metadata = {
	title: 'Rates calculator',
	description:
		'Simple app to convert between yearly/monthly/daily/hourly rates in USD/GBP/EUR/CZK currencies.',
	icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html lang="en">
		<body className={`font-sans ${inter.variable}`}>{children}</body>
	</html>
);

export default RootLayout;
