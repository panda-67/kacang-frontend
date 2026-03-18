export default function ReportsLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="mx-auto max-w-7xl space-y-4">

      <h1 className="text-xl font-semibold">
        Reports
      </h1>

      {children}

    </div>
  )
}
