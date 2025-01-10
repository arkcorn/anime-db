import { Link } from "@tanstack/react-router"


export default function Header() {
  return (
    <div className="p-4 bg-blue-600 border-blue-800 shadow text-white underline mb-2 flex justify-between items-center">
      <div className="flex-1">
        <Link to='/' className="p-2">Home</Link>
        <Link to='/search' className="p-2">Search</Link>
        <Link to='/list' className="p-2">My List</Link>
      </div>
      <div className="text-xl font-bold flex-1 text-center">
        <Link to='/'>The Anime DB</Link> 
      </div>
      <div className="flex-1 text-right"> 
        <Link to='/register' className="p-2">Register</Link>
        <Link to='/login' className="p-2">Login</Link>
      </div>
    </div>
  )
}