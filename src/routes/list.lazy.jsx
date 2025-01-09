import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useContext, useState, useEffect } from 'react'
import { ListContext } from '../contexts'
import AnimeVertList from '../AnimeVertList'

export const Route = createLazyFileRoute('/list')({
  component: RouteComponent,
})

function RouteComponent() {
  const [list, setList] = useContext(ListContext)
  const [anime, setAnime] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)


  async function getAnimeFromList() {
    setLoading(true)
    if (list.length !== 0) { 
      const params = new URLSearchParams({
        list: list,
        page: page
      })

      const response = await fetch(`/api/getList?${params}`)
      const data = await response.json()
      setAnime(data.rows)
    }
    setLoading(false)
  }

  useEffect(() => {
    getAnimeFromList();
  }, [page])

  return (
    <div>
        <div className='text-center'>
          My List
        </div>
        <div>
          {loading ? <div></div> : <AnimeVertList anime={anime} searchBool={false} listBool={true} page={page} setPage={setPage}></AnimeVertList>}
        </div>
    </div>
  )
}
