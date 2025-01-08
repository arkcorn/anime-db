import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { ListContext } from '../contexts'

export const Route = createLazyFileRoute('/list')({
  component: RouteComponent,
})

function RouteComponent() {
  const [list, setList] = useContext(ListContext)

  return (<div>
          <div><Link to='/'>Home</Link></div>
          <div>{list.toString().replaceAll(',', ', ')}</div>
          </div>)
}
