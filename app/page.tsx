import Image from 'next/image'
import { PrismaClient } from '@prisma/client'

export default async function Home() {
  const { data } = await getRooms()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20 sm:px-4 md:px-8 lg:px-12">
      {data?.map((room) => (
        <div key={room.id}>
          <img
            src={room?.images?.[0]}
            alt={room.title}
            className="rounded-md w-full h-auto object-fit"
          ></img>
          <div className="mt-2 font-semibold text-sm">{room.title}</div>
          <span className="text-xs px-2 py-1 rounded-full bg-black text-white mt-1">
            {room.category}
          </span>
          <div className="mt-1 text-gray-400 text-sm">{room.desc}</div>
          <div className="mt-1 text-sm">{room.price.toLocaleString()}원</div>
        </div>
      ))}
    </div>
  )
}

async function getRooms() {
  const prisma = new PrismaClient()
  const data = await prisma.room.findMany()

  return { data }
}
