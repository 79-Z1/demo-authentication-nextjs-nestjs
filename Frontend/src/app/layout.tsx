'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ToastProvider from './helpers/toast.provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { push } = useRouter();
	useEffect(() => {
		const refreshToken = localStorage.getItem('RefreshToken') ?? '';
		const accessToken = localStorage.getItem('AccessToken') ?? '';
		const email = localStorage.getItem('email') ?? '';

		
		if (!accessToken && !refreshToken && !email) {
			push('/auth/login');
		}
	}, [])

	return (
		<html lang="en">
			<head>
				<title>Title</title>
				<meta name="description" content="Description" />
			</head>
			<body suppressHydrationWarning={true} className={inter.className}>
			<ToastProvider>
				{children}
			</ToastProvider>
			</body>
		</html>
	);
}
