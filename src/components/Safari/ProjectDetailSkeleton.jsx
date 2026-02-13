// components/ProjectDetailSkeleton.jsx

import React from "react";

const ProjectDetailSkeleton = () => {
  return (
    <div className="project-detail-skeleton w-full h-full overflow-y-auto">
      {/* Header Skeleton */}
      <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="flex items-center gap-4 p-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-700 rounded animate-pulse" />
            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header Skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-10 w-3/4 bg-gray-800 rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-gray-700 rounded animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-7 w-20 bg-gray-800 rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Hero Image Skeleton */}
        <div className="mb-12">
          <div className="relative w-full h-[500px] bg-gray-800 rounded-2xl animate-pulse border-2 border-gray-700" />
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-12">
          <div className="flex gap-2 border-b border-gray-800 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-800 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Tab Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video bg-gray-800 rounded-xl animate-pulse border-2 border-gray-700"
              />
            ))}
          </div>
        </div>

        {/* Info Panel Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Challenges Skeleton */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="h-6 w-32 bg-gray-700 rounded mb-4 animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-5 w-full bg-gray-700 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Results Skeleton */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="h-6 w-24 bg-gray-700 rounded mb-4 animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-5 w-full bg-gray-700 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="lg:col-span-1 space-y-3">
            <div className="h-12 w-full bg-gray-800 rounded-xl animate-pulse" />
            <div className="h-12 w-full bg-gray-800 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Additional Info Skeleton */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-12">
          <div className="h-8 w-48 bg-gray-700 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="h-5 w-32 bg-gray-700 rounded animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-20 bg-gray-700 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-5 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-5 w-full bg-gray-700 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailSkeleton;
