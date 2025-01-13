type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'
interface FilterProps {
  location: string
  checkIn: string
  checkOut: string
  guest: number
}
