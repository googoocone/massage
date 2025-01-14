'use client'

import Footer from '@/components/Footer'
import NavBar from '@/components/Navbar'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

interface Props {
  children?: React.ReactNode
}

const queryClient = new QueryClient()

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {children}

        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <NavBar></NavBar>
      <div className="mt-20 p-10 min-h-[80vh]">{children}</div>
      <Footer></Footer>
    </>
  )
}
