// TODO, create general list for both /list and /search 
// /search : must have "add" button
// /list : more complication, ideally has MAL capabilities
import { Link } from "@tanstack/react-router"
import { ListContext } from "./contexts";
import {useContext} from 'react'

export default function AnimeVertList({ anime, searchBool, listBool, page, setPage }) { // search,list = booleans, animeList = array of anime objects (from psql)
    const [list, setList] = useContext(ListContext)
    
    return (
        <div>
        <div className='w-8/12 mx-auto'>
            {anime.map((anime, index) => (<Link to="/anime/$title" key={index} params={anime} className='search-elem bg-blue-200 rounded border-blue-600 m-0.5 block'>
                <img src={anime.thumbnail} className='inline-block p-1 w-12 h-18'/>
                <span className='text-blue-700 underline'>{anime.title} </span>
                {searchBool ? <label
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
                     {list.includes(anime.title) ? "Remove From Your List" : "Add To Your List"}
                </label> : <span></span>}
            </Link>))}
        </div>
        <div>
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
        </div>
    </div>
    )
}