import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useContext } from "react"
import { ListContext } from '../contexts';

export const Route = createLazyFileRoute('/search')({
  component: RouteComponent,
})

function RouteComponent() {


    
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [list, setList] = useContext(ListContext)

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
            <Link to="/">Home</Link>
        </div>  
        <div>
            <input type='text' placeholder='Search Anime' value={searchTerm} className='border-black border-2 block mx-auto rounded' 
            onChange={(e) => {setSearchTerm(e.target.value)}} />
        </div>
        <div className='w-8/12 mx-auto'>
            {loading ? <div>Loading...</div> : results.map((anime, index) => (<Link to="/anime/$title" key={index} params={anime} className='search-elem bg-blue-200 rounded border-blue-600 m-0.5 block'>
                <img src={anime.thumbnail} className='inline-block p-1'/>
                <Link to="/anime/$title" params={anime} className='text-blue-700'>{anime.title} </Link>
                <label
                onClick={(e) => {
                    e.stopPropagation();
                }}
                >
                    <input type="checkbox" id={anime.title} className='m-2'
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
            </Link>))}
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
            List: {list.toString().replaceAll(',', ', ')}
        </div>
        <div>
            {list.length ? list.length : ""}
        </div>

    </div>
    )
}
