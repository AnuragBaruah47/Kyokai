import React from 'react'
import { useParams } from 'react-router-dom'

const EachAnime = () => {
    const param=useParams()
  return (
    <div>{param.id}</div>
  )
}

export default EachAnime