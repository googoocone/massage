export default function Footer() {
  return (
    <footer className="bg-gray-50 py-2">
      <div className="max-w-screen-xl w-full mx-auto p-4 md:flex md:items-center md:justify-between border-b-gray-200 border-b">
        <div className="text-sm text-gray-800 sm:text-center">
          {' '}
          © 2025 <span className="hover:underline">마사지통</span>. All Right
          Reserved.
        </div>
        <ul className="flex flex-wrap gap-4 md:gap-6 items-center text-sm text-gray-800 mt-2 sm:mt-0">
          <li>
            <a href="#" className="hover:underline">
              개인정보 처리방침
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              이용약관
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              공지사항
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              회사 세부정보
            </a>
          </li>
        </ul>
      </div>
      <div className="text-[12px] text-gray-400 mx-auto p-4 max-w-screen-xl">
        웹사이트 제공자 : 마사지통 | 대표 : 박영호 | 사업자 등록 번호 :
        875-31-01047 | 연락처 : snu910501@naver.com | 마사지통은 통신판매
        중개자로 마사지통 플랫폼을 통하여 게스트와 호스트 사이에 이루어지는
        통신판매의 당사자가 아닙니다.
      </div>
    </footer>
  )
}
