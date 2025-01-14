'use client'

import CategoryList from '@/components/CategoryList'
import { GridLayout, RoomItem } from '@/components/RoomList'
import { RoomType } from '@/interface'
import { useQuery } from 'react-query'

import Loader from '@/components/Loader'

export default function Home() {
  const fetchRoom = async () => {
    const data = await fetch('/api/rooms')
    return data.json()
  }

  const { data, isError, isLoading } = useQuery('rooms', fetchRoom)

  if (isLoading) {
    return <Loader className="mt-60 mb-40"></Loader>
  }

  return (
    <>
      <CategoryList></CategoryList>
      <GridLayout>
        {data?.map((room: RoomType) => (
          <RoomItem room={room} key={room.id}></RoomItem>
        ))}
      </GridLayout>
    </>
  )
}

async function getRooms() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, {
      cache: 'force-cache',
    })

    if (!res) {
      throw new Error('failed to fetch')
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw new Error('Failed to fetch rooms')
  }
}
