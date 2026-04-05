export default function TableSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Desktop skeleton */}
      <div className="hidden md:block">
        <div className="bg-gray-50 px-6 py-3 flex gap-4">
          {['w-1/3', 'w-1/6', 'w-1/6', 'w-1/6', 'w-1/6'].map((w, i) => (
            <div key={i} className={`h-3 bg-gray-200 rounded ${w}`} />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex items-center gap-4 border-t border-gray-100">
            <div className="flex items-center gap-3 w-1/3">
              <div className="w-9 h-9 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 bg-gray-200 rounded w-3/4" />
                <div className="h-2.5 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
            <div className="h-3.5 bg-gray-200 rounded w-1/6" />
            <div className="h-6 bg-gray-100 rounded-full w-24" />
            <div className="h-3 bg-gray-100 rounded w-1/6" />
            <div className="flex gap-2 ml-auto">
              <div className="h-7 bg-gray-200 rounded-lg w-14" />
              <div className="h-7 bg-gray-200 rounded-lg w-16" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden divide-y divide-gray-100">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded-lg flex-1" />
              <div className="h-8 bg-gray-200 rounded-lg flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
