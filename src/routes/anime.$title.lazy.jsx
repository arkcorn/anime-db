import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useContext, useState, useEffect } from 'react'
import { LoadedContext } from '../contexts'

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
    <div>
      {title} <br />
      { loading ? (<div>Loading Image...</div>) :
      (<img src={anime.picture} />)}
      <div>
        {loading ? (
          <div>Loading description...</div>
        ) : (
          <div>{loaded[title]}</div>
        )}
      </div>
    </div>
  )
}
