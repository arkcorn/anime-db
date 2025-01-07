import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from "react"


export const Route = createLazyFileRoute('/search')({
  component: RouteComponent,
})

function RouteComponent() {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([])



    async function fetchAnime() {
        const response = await fetch(`/api/search?term=${searchTerm}`); // Todo: add PAGE
        const data = await response.json();
        setResults(data.rows)
    }

    useEffect(() => {
        fetchAnime()
    }, [searchTerm]);


  return (
    <div>
        <div>
            <input type='text' placeholder='Search Anime' value={searchTerm} onChange={
                (e) => {
                    setSearchTerm(e.target.value)
                }
            } />
            {/* <select>
                <option>Alphabetically</option>
                <option>Length</option>
            </select> */}
        </div>
        <div>
            {results.map((anime, index) => (
                <div key={index}>{anime.title}</div>
            ))}
        </div>
    </div>
    )
}
