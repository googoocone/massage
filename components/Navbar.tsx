'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import cn from 'classnames'

import { TbMassage } from 'react-icons/tb'
import { RxDividerVertical } from 'react-icons/rx'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'

import { DetailFilterType, FilterProps } from '@/interface'
import Link from 'next/link'
import { SearchFilter } from './Filter'
import { useRecoilState, useRecoilValue } from 'recoil'
import { detailFilterState, filterState } from '@/atom'

const menus = [
  { id: 1, title: '로그인', url: '/users/login' },
  { id: 2, title: '회원가입', url: '/users/signIn' },
  { id: 3, title: 'FAQ', url: '/faqs' },
]

export default function NavBar() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [detailFilter, setDetailFilter] =
    useRecoilState<null | DetailFilterType>(detailFilterState)

  const filterValue = useRecoilValue(filterState)
  const router = useRouter()

  return (
    <>
      <nav
        className={cn(
          'h-20 z-10 border border-b-gray-20 w-full shadow-sm p-4 sm:px-10 flex justify-between  fixed top-0 bg-white',
          {
            '!h-44': showFilter === true,
            'items-start': showFilter === true,
          },
        )}
      >
        <div className="grow basis-0  font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer hidden sm:flex sm:gap-2">
          <TbMassage className="text-4xl my-auto" />
          <Link href="/" className="my-auto block">
            Massage 통
          </Link>
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
                <SearchFilter></SearchFilter>
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
