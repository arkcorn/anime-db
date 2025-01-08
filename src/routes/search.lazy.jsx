import { createLazyFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from "react"


export const Route = createLazyFileRoute('/search')({
  component: RouteComponent,
})

function RouteComponent() {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])

    async function fetchAnime() {
        // setLoading(true) 
        const params = new URLSearchParams({
            term: searchTerm,
            page: page
        })

        const response = await fetch(`/api/search?${params}`);
        const data = await response.json();
        setResults(data.rows)
        setLoading(false)
    }

    useEffect(() => {
        fetchAnime()
    }, [searchTerm, page]);


  return (
    <div>
        <div>
            <input type='text' placeholder='Search Anime' value={searchTerm} 
            onChange={(e) => {setSearchTerm(e.target.value)}} />
        </div>
        <div>
            {loading ? <div>Loading...</div> : results.map((anime, index) => (<div key={index}>
                {anime.title} 
                <label>
                    <input type="checkbox" id={anime.title}
                    onChange={
                        (e) => {
                            if (e.target.checked)
                                setList([...list, anime.title])
                            else 
                                setList(list.filter(title => title !== anime.title))
                        }
                    }
                    checked={list.includes(anime.title)}
                    />
                    Add
                </label>
            </div>))}
        </div>
        <div>
            <button
                onClick={() => {if (page > 0) {setPage(page - 1)}}}
                disabled={page === 0}
            >Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
            <div>Page {page + 1}</div>
        </div>
        <div>
            List: {list}
        </div>

    </div>
    )
}
