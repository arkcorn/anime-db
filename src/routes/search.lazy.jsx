import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useContext } from "react"
import { ListContext } from '../contexts';
import AnimeVertList from '../AnimeVertList';

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
        <div className='w-8/12 mx-auto'>
            <input type='text' placeholder='Search Anime...' value={searchTerm} className='border-black border-2 block rounded bg-pink-50' 
            onChange={(e) => {setSearchTerm(e.target.value)}} />
        </div>



        <div>
            {loading ? <div>Loading...</div> : <AnimeVertList anime={results} searchBool={true} listBool={false}></AnimeVertList>}
        </div>



        <div>
            <div className='w-8/12 mx-auto text-center'>
                <button className={`m-2 border-2 p-2 rounded bg-pink-200 ${page === 0 ? '' : 'border-gray-500'}` }
                    onClick={() => {if (page > 0) {setPage(page - 1)}}}
                    disabled={page === 0}
                >Previous</button> 
                <button onClick={() => setPage(page + 1)} className='m-2 border-2 py-2 px-5 rounded bg-pink-200 border-gray-500'>Next</button>
            </div>
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
