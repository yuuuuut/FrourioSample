import { useRouter } from 'next/dist/client/router'

export default function TodoCreateButton() {
  const router = useRouter()

  const clickButton = () => {
    router.push('/todos/create')
  }

  return (
    <div
      className="bg-blue-500 text-white rounded-full h-20 w-20 flex items-center justify-center"
      onClick={clickButton}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
  )
}
