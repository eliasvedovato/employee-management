import Head from 'next/head'
import { BiCheck, BiUserPlus, BiX } from 'react-icons/bi'
import Table from '../components/table'
import Form from '../components/form'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAction, toggleChangeAction } from '../redux/reducer'
import { deleteUser, getUsers } from '../lib/helper'
import { useQueryClient } from 'react-query'

export default function Home() {
	const visible = useSelector(state => state.app.client.toggleForm)
	const deleteId = useSelector(state => state.app.client.deleteId)
	
	const queryClient = useQueryClient()

	const dispatch = useDispatch()

	// if(visible) return !state.app.client.toggleForm

	const handler = () => {
		dispatch(toggleChangeAction())
	}

	const deletehandler = async () => {
		if (deleteId) {
			console.log('fila eliminada')
			await deleteUser(deleteId)
			await queryClient.prefetchQuery('users', getUsers)
			await dispatch(deleteAction(null))
		}
	}

	const cancelhandler = async () => {
		console.log('cancel')
		dispatch(deleteAction(null))
	}

	return (
		<section>
			<Head>
				<title>Crud App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='py-5'>
				<h1 className='text-xl md:text-5xl text-center font-bold py-10'>
					Employee Management
				</h1>

				<div className='container mx-auto flex justify-between py-5 border-b'>
					<div className='left flex gap-3'>
						<button
							className='flex bg-indigo-500 text-white px-4 py-2 
							border rounded-md hover:bg-gray-50 hover:border-indigo-500
							hover:text-gray-800'
							onClick={handler}
						>
							Add Employee{' '}
							<span className='pl-3'>
								<BiUserPlus size={23} />
							</span>
						</button>
					</div>
					{deleteId ? (
						DeleteComponent({ deletehandler, cancelhandler })
					) : (
						<></>
					)}
				</div>

				{visible ? <Form></Form> : <></>}

				<div className='container mx-auto'>
					<Table></Table>
				</div>
			</main>
		</section>
	)
}

function DeleteComponent({ deletehandler, cancelhandler }) {
	return (
		<div className='flex gap-5'>
			<p>Are you sure?</p>
			<button
				onClick={deletehandler}
				className='flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50'
			>
				Delete{' '}
				<span className='px-1'>
					<BiX color='rgb(255 255 255' size={25} />
				</span>
			</button>
			<button
				onClick={cancelhandler}
				className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'
			>
				Cancel{' '}
				<span className='px-1'>
					<BiCheck color='rgb(255 255 255' size={25} />
				</span>
			</button>
		</div>
	)
}