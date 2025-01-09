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

  async function getAnimeFromList() {
    // TODO
  }

  useEffect(() => {
    getAnimeFromList();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-pink-50">
        <div>
            <Link to="/">Home</Link>
        </div>
        <AnimeVertList anime={[/*  TODO */]} searchBool={false} listBool={true} list={list}></AnimeVertList>
    </div>
  )
}
