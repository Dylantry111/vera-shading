export default function PortalLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back button placeholder */}
      <div className="w-32 h-9 bg-gray-100 rounded-full animate-pulse mb-5" />

      {/* Welcome */}
      <div className="w-64 h-8 bg-gray-100 rounded-lg animate-pulse mb-2" />
      <div className="w-48 h-4 bg-gray-100 rounded animate-pulse mb-8" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-border/60 rounded-xl p-4 shadow-sm">
            <div className="w-12 h-9 bg-gray-100 rounded animate-pulse mb-2" />
            <div className="w-16 h-3 bg-gray-100 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* New Order button */}
      <div className="w-32 h-10 bg-gray-100 rounded-xl animate-pulse mb-6" />

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 h-9 bg-gray-100 rounded-lg animate-pulse" />
        <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
        <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Order cards */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-border/60 rounded-xl p-4 shadow-sm animate-pulse">
            <div className="flex justify-between items-center mb-2">
              <div className="w-40 h-6 bg-gray-100 rounded" />
              <div className="w-20 h-5 bg-gray-100 rounded" />
            </div>
            <div className="w-60 h-3 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
