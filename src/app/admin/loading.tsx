export default function AdminLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button placeholder */}
      <div className="w-36 h-9 bg-gray-100 rounded-full animate-pulse mb-5" />

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer card */}
        <div className="bg-white border border-border/60 rounded-xl p-5 shadow-sm">
          <div className="w-24 h-5 bg-gray-100 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3">
                <div className="w-14 h-2.5 bg-gray-100 rounded animate-pulse mb-1.5" />
                <div className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Pricing card */}
        <div className="bg-white border-2 border-green/30 rounded-xl p-5 shadow-sm">
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="w-20 h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
            <div className="border-t border-border/40 pt-3 flex justify-between">
              <div className="w-12 h-6 bg-gray-100 rounded animate-pulse" />
              <div className="w-20 h-6 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Items table */}
      <div className="bg-white border border-border/60 rounded-xl shadow-sm overflow-hidden mt-6">
        <div className="px-4 py-3 border-b border-border/40">
          <div className="w-32 h-4 bg-gray-100 rounded animate-pulse" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 px-4 py-3 border-b border-border/20">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => (
              <div key={j} className="w-14 h-4 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
