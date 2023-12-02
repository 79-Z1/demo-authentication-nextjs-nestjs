'use client';
import { FormEvent, useState } from 'react';
import { axiosGet } from './helpers/axios.interceptor';
import Link from 'next/link';

export default function Home() {
	const [users, setUsers] = useState([]);

	function Thead() {
		return (
			<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" className="px-6 py-3">
						Id
					</th>
					<th scope="col" className="px-6 py-3">
						Email
					</th>
					<th scope="col" className="px-6 py-3">
						Password
					</th>
				</tr>
			</thead>
		);
	}

	function Trow(id: number, email: string, password: string) {
		return (
			<tr
				key={id}
				className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
			>
				<td className="px-6 py-4">{id}</td>
				<td className="px-6 py-4">{email}</td>
				<td className="px-6 py-4">{password}</td>
			</tr>
		);
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = await axiosGet('/user');
			console.log('::: Danh sách user ', data);
			setUsers(data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="relative flex flex-col items-center overflow-x-auto mt-5">
			<div className="flex justify-evenly items-center">
				<button
					className="text-center mr-5"
					style={{ border: '#000 1px solid', padding: 10 }}
					onClick={handleSubmit}
				>
					Call API
				</button>
				<div className='flex flex-col'>
					<Link
						href="/auth/register"
						className="font-medium text-blue-600 hover:underline"
					>
						Register
					</Link>
					<Link
						href="/auth/login"
						className="font-medium text-blue-600 hover:underline"
					>
						Login
					</Link>
				</div>
			</div>
			{users.length > 0 ? (
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
					<Thead />
					<tbody>
						{users.map((user: any) => {
							return Trow(user.id, user.email, user.password);
						})}
					</tbody>
				</table>
			) : (
				<p className="h-4 m-5 text-center">Chưa có dữ liệu</p>
			)}
		</div>
	);
}
