export default function UserCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="col-start-1 mx-auto mt-5">
        <div className="animate-pulse text-3xl font-extrabold">Loading...</div>
      </div>
    </div>
  )
}
