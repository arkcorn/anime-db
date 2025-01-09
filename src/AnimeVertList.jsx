// TODO, create general list for both /list and /search 
// /search : must have "add" button
// /list : more complication, ideally has MAL capabilities
import { Link } from "@tanstack/react-router"
import { ListContext } from "./contexts";
import {useContext} from 'react'

export default function AnimeVertList({ anime, searchBool, listBool }) { // search,list = booleans, animeList = array of anime objects (from psql)
    const [list, setList] = useContext(ListContext)
    
    return (
        <div>
        <div className='w-8/12 mx-auto'>
            {anime.map((anime, index) => (<Link to="/anime/$title" key={index} params={anime} className='search-elem bg-blue-200 rounded border-blue-600 m-0.5 block'>
                <img src={anime.thumbnail} className='inline-block p-1 w-12'/>
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
                     {list.includes(anime.title) ? "Remove" : "Add"}
                </label> : <span></span>}
            </Link>))}
        </div>
    </div>
    )
}