import cn from 'classnames'

export default function FilterLayout({ children, title, isShow }: any) {
  return (
    <div
      className={cn(
        'absolute w-full top-80 sm:top-[74px] border border-gray-200 px-8 py-10 flex flex-col bg-white sm:max-w-3xl md:w-[780px]  rounded-xl left-0',
        {
          hidden: !isShow,
        },
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  )
}
