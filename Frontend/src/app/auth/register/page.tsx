'use client';
import { FormEvent, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { RequestBody, authFetch } from '@/app/helpers/fetch';
import AuthForm from '../page';
import { toast } from 'react-toastify';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { push } = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const payload: RequestBody = {
			email,
			password,
		};
		if (!email.trim()) return toast.error('Không được để trống email!');
		if (!password.trim())
			return toast.error('Không được để trống mật khẩu!');
		const url = 'http://localhost:3001/auth/signup';

		const data = await authFetch(url, payload);
		if (data && !data.error) {
			localStorage.setItem(
				'email',
				JSON.stringify(data['user']['email']),
			);
			localStorage.setItem(
				'Authorization',
				JSON.stringify(data['tokens']['accessToken']),
			);
			localStorage.setItem(
				'RefreshToken',
				JSON.stringify(data['tokens']['refreshToken']),
			);
			push('/');
		}
	};

	return (
		<AuthForm
			setEmail={(e: any) => {
				setEmail(e);
			}}
			setPassword={(e: any) => {
				setPassword(e);
			}}
			handleSubmit={(e: any) => {
				handleSubmit(e);
			}}
		/>
	);
}
