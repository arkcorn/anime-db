import { Link } from "@tanstack/react-router"


export default function Header() {
  return (
    <div className="p-4 bg-blue-600 border-blue-800 shadow text-white underline mb-2">
      <Link to='/' className="p-2">Home</Link>
      <Link to='/search' className="p-2">Search</Link>
      <Link to='/list' className="p-2">My List</Link>
    </div>
  )
}