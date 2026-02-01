import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-24 px-6 sm:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Featured Event Skeleton */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-white/20 aspect-[16/8]">
                    <Skeleton className="h-full w-full" />
                </div>

                {/* Tabs Skeleton */}
                <div className="flex justify-between items-center h-16 border-b border-gray-100">
                    <Skeleton className="h-10 w-48 rounded-full" />
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
                    <div className="lg:col-span-8 space-y-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[400px] md:h-[300px]">
                                <Skeleton className="w-full md:w-5/12 h-full" />
                                <div className="w-full md:w-7/12 p-8 space-y-6">
                                    <div className="flex gap-4">
                                        <Skeleton className="h-16 w-16 rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-8 w-64" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <div className="flex gap-4 pt-4">
                                        <Skeleton className="h-10 w-32 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden lg:block lg:col-span-4">
                        <Skeleton className="h-96 w-full rounded-3xl" />
                    </div>
                </div>

            </div>
        </div>
    );
}
