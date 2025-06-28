import React from 'react';
import { Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

interface ImageAdapterProps {
    width?: number;
    src?: string;
    txtPreview?: string;
}

const ImageAdapter: React.FC<ImageAdapterProps> = ({ width = 200, src, txtPreview }) => (
    <Image
        width={width}
        src={src ? `https://image.tmdb.org/t/p/w500${src}` : ''}
        preview={{
            mask: (
                <span style={{ color: 'white' }}>
                    <EyeOutlined style={{ marginRight: 8 }} />
                    {txtPreview}
                </span>
            ),
        }}
    />
);

export default ImageAdapter;