import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetEachAnime } from '../Queries/Hooks'

const EachAnime = () => {
    const {id} = useParams()
    const {data,isLoading,isError,error} = useGetEachAnime(id)
    
  return (
    <div>{data?.title}</div>
  )
}

export default EachAnime