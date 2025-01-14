import cn from 'classnames'

export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-full w-full  flex gap-4 justify-center items-center',
        className,
      )}
    >
      <div className="w-2 h-2 rounded-full bg-black animate-ping"></div>
      <div className="w-2 h-2 rounded-full bg-black animate-ping"></div>
      <div className="w-2 h-2 rounded-full bg-black animate-ping"></div>
    </div>
  )
}
