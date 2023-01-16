import { BiEdit, BiTrashAlt } from 'react-icons/bi'
import { getUsers } from '../lib/helper'
import { useQuery } from 'react-query'
import { useSelector } from "react-redux";

export default function Table() {

	const state = useSelector((state) => state)
	console.log(state)

	const { isLoading, isError, data, error } = useQuery('users', getUsers)

	if (isLoading) return <div>Employee is loading...</div>
	if (isError) return <div>Got an error {error}</div>

	return (
		<table className='min-w-full table-auto'>
			<thead>
				<tr className='bg-gray-800'>
					<th className='px-8 sm:px-6 py-2'>
						<span className='text-gray-200'>Name</span>
					</th>
					<th className='px-16 py-2'>
						<span className='text-gray-200'>Email</span>
					</th>
					<th className='px-4 py-2'>
						<span className='text-gray-200'>Salary</span>
					</th>
					<th className='px-10 py-2'>
						<span className='text-gray-200'>Birthday</span>
					</th>
					<th className='px-2 py-2'>
						<span className='text-gray-200'>Status</span>
					</th>
					<th className='px-4 py-2'>
						<span className='text-gray-200'>Actions</span>
					</th>
				</tr>
			</thead>
			<tbody className='bg-gray-200'>
				{data.map((obj, i) => (
					<Tr {...obj} key={i} />
				))}
			</tbody>
		</table>
	)
}

function Tr({ id, name, avatar, email, salary, date, status }) {
	return (
		<tr className='bg-gray-50 text-center'>
			<td className='px-8 py-2 flex flex-row items-center gap-1'>
				<img
					src={avatar || '#'}
					alt=''
					className='h-8 w-8 rounded-full object-cover'
				/>
				<span className='text-center ml-2 font-semibold'>
					{name || 'unknown'}
				</span>
			</td>
			<td className='px-8 py-2'>
				<span>{email || 'unknown'}</span>
			</td>
			<td className='px-4 py-2'>
				<span>{salary || 'unknown'}</span>
			</td>
			<td className='px-4 py-2'>
				<span>{date || 'unknown'}</span>
			</td>
			<td className='px-4 py-2'>
				<button className='cursor'>
					<span
						className={`${
							status == 'Active'
								? 'bg-green-500'
								: 'bg-rose-500'
						} text-white px-5 py-1 rounded-full`}
					>
						{status || 'unknown'}
					</span>
				</button>
			</td>
			<td className='px-2 py-2 relative'>
				<button className='cursor'>
					<BiEdit size={30} color={'rgb(34,197,94'}></BiEdit>
				</button>
				<button className='cursor'>
					<BiTrashAlt size={30} color={'rgb(244,63,94'}></BiTrashAlt>
				</button>
			</td>
		</tr>
	)
}
