import React from 'react';
import { Image } from 'antd';

interface ImageAdapterProps {
    width?: number;
    src?: string;
}

const ImageAdapter: React.FC<ImageAdapterProps> = ({ width = 200, src }) => (
    <Image
        width={width}
        src={src ? `https://image.tmdb.org/t/p/w500${src}` : ''}
    />
);

export default ImageAdapter;