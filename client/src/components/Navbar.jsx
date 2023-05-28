import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { FilmIcon, HomeModernIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'

const Navbar = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const [username, setUsername] = useState('')
	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const navigate = useNavigate()

	const onLogout = async () => {
		try {
			const response = await axios.get('/auth/logout')
			console.log(response)
			setAuth({ username: null, email: null, role: null, token: null })
			setUsername('')
			navigate('/')
			toast.success('Logout successful!', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} catch (error) {
			console.error(error)
			toast.error('Error', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		}
	}

	const menuLists = () => {
		return (
			<>
				<Link
					to={'/cinema'}
					className="flex justify-center gap-2 rounded-md bg-gray-600 py-1 px-2 text-white hover:bg-gray-500"
				>
					<HomeModernIcon className="h-6 w-6" />
					<p>Cinema</p>
				</Link>
				<Link
					to={'/movie'}
					className="flex justify-center gap-2 rounded-md bg-gray-600 py-1 px-2 text-white hover:bg-gray-500"
				>
					<VideoCameraIcon className="h-6 w-6" />
					<p>Movie</p>
				</Link>
			</>
		)
	}

	return (
		<nav className="flex flex-col items-center justify-between gap-2 bg-gray-900 py-3 px-5 drop-shadow-lg sm:flex-row">
			<div className="flex w-full grow flex-col flex-wrap justify-between gap-2 sm:w-fit sm:flex-row sm:justify-start">
				<div className="flex flex-row justify-between">
					<button className="flex flex-row items-center gap-2" onClick={() => navigate('/')}>
						<FilmIcon className="h-8 w-8 text-white" />
						<h1 className="mr-2 text-xl text-white">Cinema</h1>
					</button>
					<button
						className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-700 sm:hidden"
						onClick={() => toggleMenu()}
					>
						<Bars3Icon className="h-6 w-6 text-white" />
					</button>
				</div>
				<div className="hidden gap-2 sm:flex">{menuLists()}</div>
				{menuOpen && <div className="flex grow flex-col gap-2 sm:hidden">{menuLists()}</div>}
			</div>
			<div className="flex grow flex-wrap items-center justify-center gap-3 sm:justify-end">
				{auth.username && <p className="text-md leading-none text-white">Welcome {auth.username}!</p>}
				{auth.token ? (
					<button
						className="rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 py-1 px-2 text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400"
						onClick={() => onLogout()}
					>
						<p>Logout</p>
					</button>
				) : (
					<button className="rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 py-1 px-2 text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400">
						<Link to={'/login'}>Login</Link>
					</button>
				)}
			</div>
		</nav>
	)
}

export default Navbar
