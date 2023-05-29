import 'react-toastify/dist/ReactToastify.css'

const MovieLists = ({ movies, selectedMovieIndex, setSelectedMovieIndex, auth }) => {
	return (
		<div className="mx-4 flex flex-col rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-md sm:mx-8 sm:p-6">
			<h2 className="text-3xl font-bold text-gray-900">Movie Lists</h2>
			<div className="mt-1 flex flex-wrap justify-center gap-4 sm:mt-3">
				{movies?.map((movie, index) => {
					return movies[selectedMovieIndex]?._id === movie._id ? (
						<div
							key={index}
							className="flex w-[108px] flex-col rounded-md bg-gradient-to-br from-indigo-600 to-blue-500 p-1 text-white drop-shadow-md hover:from-indigo-500 hover:to-blue-400 sm:w-[144px]"
							onClick={() => {
								setSelectedMovieIndex(null)
								localStorage.setItem('selectedMovieIndex', null)
							}}
						>
							<img src={movie.img} className="h-36 rounded-md object-cover drop-shadow-md sm:h-48" />
							<p className="truncate pt-1 text-center text-sm font-semibold leading-4">{movie.name}</p>
						</div>
					) : (
						<div
							key={index}
							className="flex w-[108px] flex-col rounded-md bg-white p-1 drop-shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-blue-400 hover:text-white sm:w-[144px]"
							onClick={() => {
								setSelectedMovieIndex(index)
								localStorage.setItem('selectedMovieIndex', index)
							}}
						>
							<img src={movie.img} className="h-36 rounded-md object-cover drop-shadow-md sm:h-48" />
							<p className="truncate pt-1 text-center text-sm font-semibold leading-4">{movie.name}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default MovieLists
