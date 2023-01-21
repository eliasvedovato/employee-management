import { BiBrush } from 'react-icons/bi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getUser, getUsers, updateUser } from '../lib/helper'

export default function UpdateUserForm({ formId, formData, setFormData }) {

	const queryClient = useQueryClient()
	const { isLoading, isError, data, error } = useQuery(
		['users', formId], () => getUser(formId)) //single object as a response
	
	const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
		//second argument inside this object
		onSuccess: async (data) => {
			// queryClient.setQueryData('users', (old) => [data])
			queryClient.prefetchQuery('users', getUsers)
		}
	})

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error</div>

	const { name, avatar, salary, date, email, status } = data
	const [firstname, lastname] = name ? name.split(' ') : formData

	const handleSubmit = async (e) => {
		e.preventDefault()
		let userName = `${formData.firstname ?? firstname} 
		${formData.lastname ?? lastname}`

		let updated = Object.assign({}, data, formData, { name: userName })
		/* if we have the same property in this two objects,
		the assign method is going to override both value 
		with this second property value */
		console.log(updated)

		await UpdateMutation.mutate(updated)
	}

	return (
		<form
			className='grid lg:grid-cols-2 w-4/6 gap-4'
			onSubmit={handleSubmit}
		>
			<div className='input-type'>
				<input
					type='text'
					name='firstname'
					defaultValue={firstname}
					placeholder='FirstName'
					className='border w-full px-5 py-3 focus:outline-none rounded-md'
					onChange={setFormData}
				/>
			</div>
			<div className='input-type'>
				<input
					type='text'
					name='lastname'
					defaultValue={lastname}
					placeholder='LastName'
					className='border w-full px-5 py-3 focus:outline-none rounded-md'
					onChange={setFormData}
				/>
			</div>
			<div className='input-type'>
				<input
					type='text'
					name='email'
					defaultValue={email}
					placeholder='Email'
					className='border w-full px-5 py-3 focus:outline-none rounded-md'
					onChange={setFormData}
				/>
			</div>
			<div className='input-type'>
				<input
					type='text'
					name='salary'
					defaultValue={salary}
					placeholder='Salary'
					className='border w-full px-5 py-3 focus:outline-none rounded-md'
					onChange={setFormData}
				/>
			</div>
			<div className='input-type'>
				<input
					type='date'
					name='date'
					defaultValue={date}
					placeholder='Date'
					className='border px-5 py-3 focus:outline-none rounded-md'
					onChange={setFormData}
				/>
			</div>

			<div className='flex gap-10 items-center'>
				<div className='form-check'>
					<input
						type='radio'
						name='status'
						defaultChecked={status == 'Active'} // otherwise return flase
						value='Active'
						onChange={setFormData}
						id='radioDefault1'
						className='form-check-input appearance-none rounded-full h-4 w-4 
            border border-gray-300 bg-white checked:bg-green-500 
            checked:border-green-500 focus:outline-none transition 
            duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain 
            float-left mr-2 cursor-pointer'
					/>
					<label
						htmlFor='radioDefault1'
						className='inline-block text-gray-800'
					>
						Active
					</label>
				</div>
				<div className='form-check'>
					<input
						type='radio'
						name='status'
						defaultChecked={status !== 'Active'}
						value='Inactive'
						onChange={setFormData}
						id='radioDefault2'
						className='form-check-input appearance-none rounded-full h-4 w-4 
            border border-gray-300 bg-white checked:bg-green-500 
            checked:border-green-500 focus:outline-none transition 
            duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain 
            float-left mr-2 cursor-pointer'
					/>
					<label
						htmlFor='radioDefault2'
						className='inline-block text-gray-800'
					>
						Inactive
					</label>
				</div>
			</div>

			<button
				className='flex justify-center text-md w-2/6 bg-yellow-400 
        text-white px-4 py-2 border rounded-md hover:bg-gray-50
        hover:border-green-500 hover:text-green-500'
			>
				Update{' '}
				<span className='px-1'>
					<BiBrush size={24}></BiBrush>
				</span>
			</button>
		</form>
	)
}
