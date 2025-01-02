import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import DynamicCanvas from './DynamicCanvas';

const BananaCat = () => {
    const { nodes, materials } = useGLTF('/models/bananacat.glb');

    if (!nodes || !nodes.Object_36 || !materials || !materials.heheBanana) {
        console.error('Modelo o materiales no encontrados.');
        return null;
    }

    return (
        <mesh geometry={nodes.Object_36.geometry} material={materials.heheBanana} />
    );
};

const BananaCatScene = () => {
    return (
        <DynamicCanvas>
            <Canvas>
                <Suspense fallback={null}>
                    <BananaCat />
                </Suspense>
            </Canvas>
        </DynamicCanvas>
    );
};

export default BananaCatScene;
