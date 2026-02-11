import React from 'react'
import { useUserStore } from '../Store/UserStore'

const Profile = () => {
  const user = useUserStore((state)=>(state.user))
  return (
    <div>
      profile
    </div>
  )
}

export default Profile