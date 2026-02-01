import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 px-6 sm:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header Skeleton */}
                <div className="space-y-6 text-center">
                    <div className="flex justify-center">
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex justify-center">
                        <Skeleton className="h-12 w-3/4 max-w-lg" />
                    </div>
                    <div className="flex justify-center">
                        <Skeleton className="h-6 w-1/2 max-w-md" />
                    </div>
                </div>

                {/* Featured Post Skeleton */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white aspect-[21/9]">
                    <Skeleton className="h-full w-full" />
                </div>

                {/* Posts Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col h-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                            <Skeleton className="aspect-[16/10] w-full" />
                            <div className="p-6 space-y-4 flex-1">
                                <div className="flex gap-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="pt-4 mt-auto">
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
