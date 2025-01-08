import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useContext, useState, useEffect } from "react";
import { LoadedContext } from '../contexts';


export const Route = createLazyFileRoute('/anime/$title')({
  component: AnimeComponent,
})

function AnimeComponent() {

  const { title } = Route.useParams()
  const [loaded, setLoaded] = useContext(LoadedContext);
  const [loading, setLoading] = useState(false)

  console.log(loaded[title])
  // console.log(typeof(title))

  function checkLoaded() {
    if (title in loaded) {
      return true
    }

    return false
  }

  useEffect(() => {
    generateDesc()
  }, [])


  async function generateDesc() {
    setLoading(true)
    if (!checkLoaded()) {
      const response = await fetch(`/api/description?title=${title}`);
      const data = await response.json();
      // console.log('raw data', data)

      // console.log('typeof res', typeof(data.response.choices[0].message.content))
      // console.log("data.response[0]", data.response.choices[0].message.content)
      // console.log(data.response)
      setLoaded({...loaded, [title]: data.response.choices[0].message.content.replace(/\[.*?\]/g, '')})
    }
    setLoading(false)
  }


  return (
    <div>
      {title} <br />
      <Link to="/search">To Search</Link>
      <div>
        {loading ? <div>Loading description...</div> : <div>{loaded[title]}</div> }
      </div>
    </div>
  )
}
