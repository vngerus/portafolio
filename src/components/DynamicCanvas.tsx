import React, { useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

const DynamicCanvas: React.FC<Props> = ({ children }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return <>{children}</>;
};

export default DynamicCanvas;
