
import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Skeleton } from '@/components/ui/skeleton';

interface SplineSceneProps {
  scene: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({ scene }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full min-h-[300px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2 w-full">
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
        </div>
      )}
      <Spline
        scene={scene}
        onLoad={() => setIsLoading(false)}
        style={{ 
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          width: '100%',
          height: '100%',
          minHeight: '300px'
        }}
      />
    </div>
  );
};

export default SplineScene;
