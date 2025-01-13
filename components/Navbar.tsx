'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import cn from 'classnames'
import dayjs from 'dayjs'

import { TbMassage } from 'react-icons/tb'
import { RxDividerVertical } from 'react-icons/rx'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import Calendar from 'react-calendar'

const menus = [
  { id: 1, title: '로그인', url: '/users/login' },
  { id: 2, title: '회원가입', url: '/users/signIn' },
  { id: 3, title: 'FAQ', url: '/faqs' },
]

type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'
interface FilterProps {
  location: string
  checkIn: string
  checkOut: string
  guest: number
}

export default function NavBar() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [detailFilter, setDetailFilter] = useState<null | DetailFilterType>(
    null,
  )
  const [filterValue, setFilterValue] = useState<FilterProps>({
    location: '',
    checkIn: '',
    checkOut: '',
    guest: 0,
  })
  const router = useRouter()

  return (
    <>
      <nav
        className={cn(
          ' border border-b-gray-20 w-full shadow-sm p-4 sm:px-10 flex justify-between  fixed top-0 bg-white',
          {
            '!h-44': showFilter === true,
            'items-start': showFilter === true,
          },
        )}
      >
        <div className="grow basis-0  font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer hidden sm:flex sm:gap-2">
          <TbMassage className="text-4xl my-auto" />
          <div className="my-auto">Massage 통</div>
        </div>
        {showFilter === false ? (
          <div className="w-full sm:w-[290px] py-2.5 border border-gray-200 rounded-full hover:shadow-lg cursor-pointer flex justify-between pl-6 pr-2">
            <div
              role="presentation"
              className="flex justify-center gap-1 cursor-pointer"
              onClick={() => setShowFilter(true)}
            >
              <div className="my-auto font-semibold text-sm">어디든지</div>
              <RxDividerVertical className="my-auto text-2xl text-gray-200" />
              <div className="my-auto font-semibold text-sm">언제든</div>
              <RxDividerVertical className="my-auto text-2xl text-gray-200" />
              <div className="my-auto font-semibold text-sm">게스트</div>
            </div>
            <button
              type="button"
              onClick={() => setShowFilter(true)}
              className=" bg-rose-500 text-white rounded-full w-8 h-8 my-auto"
            >
              <AiOutlineSearch className="mx-auto my-auto text-lg font-bold" />
            </button>
          </div>
        ) : (
          <div className="sm:w-[340px] cursor-pointer w-full relative">
            <div className="flex justify-center gap-7 h-14 text-center items-center">
              <button
                type="button"
                className="font-semibold underline underline-offset-8"
              >
                숙소
              </button>
              <button
                type="button"
                className="text-gray-700 "
                onClick={() => window.alert('서비스 준비 중')}
              >
                체험
              </button>
              <button
                type="button"
                className="text-gray-700 "
                onClick={() => window.alert('서비스 준비 중')}
              >
                온라인 체험
              </button>
              <button
                type="button"
                onClick={() => setShowFilter(false)}
                className="underline underline-offset-8 text-gray-500 hover:text-black"
              >
                필터 닫기
              </button>
            </div>
            <div className="w-[90%] flex flex-col sm:max-w-3xl sm:flex-row border border-gray-200 rounded-lg py-4 sm:py-2 sm:rounded-full shadow-sm bg-white hover:shadow-lg cursor-pointer justify-between fixed top-20 inset-x-0 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-4 w-full relative sm:pl-2 text-sm">
                <button
                  type="button"
                  onClick={() => setDetailFilter('location')}
                  className={cn(
                    'font-semibold textd-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                    {
                      'shadow-lg bg-white': detailFilter === 'location',
                    },
                  )}
                >
                  여행지
                  <div className="text-gray-500 text-xs mt-1">
                    {filterValue?.location || '여행지 검색'}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDetailFilter('checkIn')}
                  className={cn(
                    'font-semibold textd-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                    {
                      'shadow-lg bg-white': detailFilter === 'checkIn',
                    },
                  )}
                >
                  체크인
                  <div className="text-gray-500 text-xs mt-1">
                    {filterValue?.checkIn || '여행 시작 날짜'}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDetailFilter('checkOut')}
                  className={cn(
                    'font-semibold textd-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                    {
                      'shadow-lg bg-white': detailFilter === 'checkOut',
                    },
                  )}
                >
                  체크아웃
                  <div className="text-gray-500 text-xs mt-1">
                    {filterValue?.checkOut || '여행 종료 날짜'}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDetailFilter('guest')}
                  className={cn(
                    'font-semibold textd-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                    {
                      'shadow-lg bg-white': detailFilter === 'guest',
                    },
                  )}
                >
                  여행자
                  <div className="text-gray-500 text-xs mt-1">
                    {filterValue?.guest + ' 명' || '몇 명이서?'}
                  </div>
                </button>
                {detailFilter === 'location' && (
                  <NavBar.LocationFilter
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    setDetailFilter={setDetailFilter}
                  ></NavBar.LocationFilter>
                )}
                {detailFilter === 'checkIn' && (
                  <NavBar.checkInFilter
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    setDetailFilter={setDetailFilter}
                  ></NavBar.checkInFilter>
                )}
                {detailFilter === 'checkOut' && (
                  <NavBar.checkOutFilter
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    setDetailFilter={setDetailFilter}
                  ></NavBar.checkOutFilter>
                )}
                {detailFilter === 'guest' && (
                  <NavBar.guestFilter
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    setDetailFilter={setDetailFilter}
                  ></NavBar.guestFilter>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowFilter(false)
                  setDetailFilter(null)
                }}
                className=" bg-rose-600 rounded-full text-white h-10 mx-4 flex items-center justify-center sm:w-24 my-auto gap-1 px-3 py-2 hover:shadow-lg hover:bg-rose-500"
              >
                <AiOutlineSearch className="text-xl my-auto"></AiOutlineSearch>
                <div className="my-auto">검색</div>
              </button>
            </div>
          </div>
        )}

        <div className="justify-end  grow basis-0 relative hidden md:flex gap-4 align-middle ">
          <button
            type="button"
            className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-100"
          >
            당신의 공간을 등록해주세요.
          </button>
          <button
            type="button"
            onClick={() => setShowMenu((val) => !val)}
            className=" flex gap-2 my-auto align-center  px-4 py-3 rounded-full border border-gray-100 hover:shadow-lg"
          >
            <AiOutlineMenu></AiOutlineMenu>
            <AiOutlineUser></AiOutlineUser>
          </button>
          {showMenu && (
            <div className="border border-gray-200 shadow-lg py-2 flex flex-col absolute top-12 bg-white w-60 rounded-lg right-5">
              {menus?.map((menu) => (
                <button
                  type="button"
                  key={menu.id}
                  onClick={() => router.push(menu.url)}
                  className="h-10 hover:bg-gray-50 text-sm text-gray-700 text-center"
                >
                  {menu.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

const locationValue = [
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

interface FilterComponentProps {
  filterValue: FilterProps
  setFilterValue: React.Dispatch<React.SetStateAction<FilterProps>>
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>
}

NavBar.LocationFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  return (
    <>
      <div className="absolute w-full top-80 sm:top-[74px] border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl md:w-[780px]  rounded-xl left-0">
        <div className="text-sm font-semibold">지역으로 검색하기</div>
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
      </div>
    </>
  )
}

NavBar.checkInFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkIn: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('checkOut')
  }
  return (
    <>
      <div className="absolute w-full top-80 sm:top-[74px] border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl sm:w-[780px]  rounded-xl left-0">
        <div className="text-sm font-semibold">체크인 날짜 설정하기</div>
        {/* <input
          type="date"
          className="mt-4 border border-gray-200 py-3 px-2.5 rounded-lg"
          defaultValue={filterValue.checkIn}
          min={dayjs().format('YYYY-MM-DD')}
          onChange={onChange}
        ></input> */}
        <Calendar
          className="mt-8 mx-auto"
          onChange={onChange}
          minDate={new Date()}
          defaultValue={
            filterValue.checkIn ? new Date(filterValue.checkIn) : null
          }
          formatDay={(locale, date) => dayjs(date).format('DD')}
        ></Calendar>
      </div>
    </>
  )
}

NavBar.checkOutFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkOut: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('guest')
  }
  return (
    <>
      <div className="absolute w-full top-80 sm:top-[74px] border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl sm:w-[780px]  rounded-xl left-0">
        <div className="text-sm font-semibold">체크아웃 날짜 설정하기</div>
        {/* <input
          type="date"
          className="mt-4 border border-gray-200 py-3 px-2.5 rounded-lg"
          defaultValue={filterValue.checkOut}
          min={dayjs(filterValue.checkIn).add(1, 'day').format('YYYY-MM-DD')}
          onChange={(e) => {
            setFilterValue({
              ...filterValue,
              checkOut: e.target.value,
            })
            setDetailFilter('guest')
          }}
        ></input> */}
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
      </div>
    </>
  )
}

NavBar.guestFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const [counter, setCounter] = useState<number>(filterValue.guest || 0)
  return (
    <>
      <div className="absolute w-full top-80 sm:top-[74px] border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl sm:w-[780px]  rounded-xl left-0">
        <div className="text-sm font-semibold">게스트 수 설정</div>
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
      </div>
    </>
  )
}
