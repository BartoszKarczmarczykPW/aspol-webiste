export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="h-20 bg-gray-200 mb-8"></div>
      
      {/* Hero Skeleton */}
      <div className="h-96 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl mb-12"></div>
      
      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-full"></div>
        <div className="h-8 bg-gray-200 rounded w-5/6"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl p-6">
              <div className="h-16 w-16 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
