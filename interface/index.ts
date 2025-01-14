import { ReactNode } from 'react'

export type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'

export interface FilterProps {
  location: string
  checkIn: string
  checkOut: string
  guest: number
  category: string
}

export interface FilterComponentProps {
  filterValue: FilterProps
  setFilterValue: React.Dispatch<React.SetStateAction<FilterProps>>
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>
}

export const locationValue = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '인천',
  '수원',
  '화성',
]

export interface filterLayoutProps {
  title: string
  children: ReactNode
  isShow: boolean
}

export interface RoomType {
  id: number
  images: string[]
  title: string
  address: string
  price: number
  category: string
}

export interface FaqType {
  id: number
  title: string
  desc: string
}
