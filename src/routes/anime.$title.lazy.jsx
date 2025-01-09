import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useContext, useState, useEffect } from 'react'
import { LoadedContext } from '../contexts'
import { ListContext } from '../contexts'

export const Route = createLazyFileRoute('/anime/$title')({
  component: AnimeComponent,
})

function AnimeComponent() {
  // TODO access postgres instead of routing... 
  const params = Route.useParams() // TODO: find out why JUST TITLE is being passed in
  const { title } = params
  const [loaded, setLoaded] = useContext(LoadedContext)
  const [loading, setLoading] = useState(false)
  const [anime, setAnime] = useState({})
  const [list, setList] = useContext(ListContext)

  // console.log(loaded[title])
  // console.log(typeof(title))

  function checkLoaded() {
    if (title in loaded) {
      return true
    }
    return false
  }

  useEffect(() => {
    generateDesc()
    getDB()
  }, [])

  async function getDB() {
    const response = await fetch(`/api/animeData?title=${title}`)
    const { rows } = await response.json()
    setAnime(rows[0])
  }

  async function generateDesc() {
    setLoading(true)
    if (!checkLoaded()) {
      const response = await fetch(`/api/description?title=${title}`)
      const data = await response.json()
      setLoaded({
        ...loaded,
        [title]: data.response.choices[0].message.content.replace(
          /\[.*?\]/g,
          '',
        ),
      })
    }
    setLoading(false)
  }

  return (
    <div className='w-8/12 mx-auto font-bold'>
      {title} <br />
      <div className='w-2/12 inline-block border-black border-2'>
        { loading ? (<div>Loading Image...</div>) :
        (<img src={anime.picture} />)}
      </div>
      <div className='inline-block w-10/12 p-2'>
        {loading ? (
          <div>Loading description...</div>
        ) : (
          <div className='inline-block'>{loaded[title]}</div>
        )}
      </div>
      <div>
      <label>
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
      </label>
      </div>
    </div>
  )
}
