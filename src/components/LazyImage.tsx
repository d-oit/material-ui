import { useState } from 'react';
import { Skeleton, Box } from '@mui/material';

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <Skeleton variant="rectangular" width="100%" height={200} />}
      <Box
        component="img"
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        sx={{ display: loaded ? 'block' : 'none' }}
      />
    </>
  );
};

export default LazyImage;
