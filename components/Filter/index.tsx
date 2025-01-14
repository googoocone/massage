import { FilterComponentProps, FilterProps, locationValue } from '@/interface'
import { useState } from 'react'

import cn from 'classnames'
import dayjs from 'dayjs'
import Calendar from 'react-calendar'

import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { detailFilterState, filterState } from '@/atom'
import FilterLayout from './layout'

export const SearchFilter = () => {
  return (
    <>
      <LocationFilter></LocationFilter>
      <CheckInFilter></CheckInFilter>
      <CheckOutFilter></CheckOutFilter>
      <GuestFilter></GuestFilter>
    </>
  )
}

const LocationFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState<FilterProps>(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)

  return (
    <>
      <FilterLayout
        title="지역으로 검색하기"
        isShow={detailFilter === 'location'}
      >
        <div className="flex flex-wrap gap-4 mt-4">
          {locationValue.map((value) => (
            <button
              key={value}
              type="button"
              className={cn(
                'py-2 px-3 border-gray-100 border rounded-full hover:bg-gray-200 focus:bg-rose-500 focus:text-white',
                {
                  'bg-rose-600 text-white shadow-lg':
                    filterValue.location === value,
                },
              )}
              onClick={() => {
                setFilterValue({
                  ...filterValue,
                  location: value,
                })

                setDetailFilter('checkIn')
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </FilterLayout>
    </>
  )
}

const CheckInFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)

  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkIn: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('checkOut')
  }
  return (
    <>
      <FilterLayout title="입실 날짜 선택" isShow={detailFilter === 'checkIn'}>
        <Calendar
          className="mt-8 mx-auto"
          onChange={onChange}
          minDate={new Date()}
          defaultValue={
            filterValue.checkIn ? new Date(filterValue.checkIn) : null
          }
          formatDay={(locale, date) => dayjs(date).format('DD')}
        ></Calendar>
      </FilterLayout>
    </>
  )
}

const CheckOutFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [detailFilter, setDetailFilter] = useRecoilState(detailFilterState)

  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkOut: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('guest')
  }
  return (
    <>
      <FilterLayout title="퇴실 날짜 선택" isShow={detailFilter === 'checkOut'}>
        <Calendar
          className="mt-8 mx-auto"
          defaultValue={
            filterValue.checkOut ? new Date(filterValue.checkOut) : null
          }
          minDate={
            filterValue.checkIn ? new Date(filterValue.checkIn) : new Date()
          }
          formatDay={(locale, date) => dayjs(date).format('DD')}
          onChange={onChange}
        ></Calendar>
      </FilterLayout>
    </>
  )
}

const GuestFilter = () => {
  const [filterValue, setFilterValue] = useRecoilState(filterState)
  const [counter, setCounter] = useState<number>(filterValue.guest || 0)
  const detailFilter = useRecoilValue(detailFilterState)

  return (
    <>
      <FilterLayout title="게스트 수" isShow={detailFilter === 'guest'}>
        <div className="mt-4 border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center ">
          <div>
            <div className="font-semibold text-sm">게스트 수 추가</div>
            <div className="text-gray-500 text-sm">숙박 인원을 입력</div>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <button
              type="button"
              disabled={counter <= 0}
              onClick={() => {
                setCounter((val) => val - 1)
                setFilterValue({
                  ...filterValue,
                  guest: counter - 1,
                })
              }}
              className="rounded-full  w-8 h-8 disabled:border-gray-200 hover:border-black"
            >
              <AiOutlineMinusCircle
                className={cn('m-auto', {
                  'text-gray-100': counter <= 0,
                })}
              ></AiOutlineMinusCircle>
            </button>
            <div className="w-3 text-center">{counter}</div>
            <button
              type="button"
              disabled={counter >= 20}
              onClick={() => {
                setCounter((val) => val + 1)
                setFilterValue({
                  ...filterValue,
                  guest: counter + 1,
                })
              }}
              className="rounded-full  w-8 h-8 disabled:border-gray-200 hover:border-black"
            >
              <AiOutlinePlusCircle
                className={cn('m-auto', {
                  'text-gray-100': counter >= 20,
                })}
              ></AiOutlinePlusCircle>
            </button>
          </div>
        </div>
      </FilterLayout>
    </>
  )
}
