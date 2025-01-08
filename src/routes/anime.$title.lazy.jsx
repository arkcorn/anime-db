import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/anime/$title')({
  component: AnimeComponent,
})

function AnimeComponent() {

  const { title } = Route.useParams()

  return (
    <div>
      {title} <br />
      <Link to="/search">To Search</Link>

      <div>
        
      </div>
    </div>
  )
}
