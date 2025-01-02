/// <reference types="react-scripts" />

import * as THREE from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
            group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
            geometry: ReactThreeFiber.Object3DNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>;
            material: ReactThreeFiber.Object3DNode<THREE.Material, typeof THREE.Material>;
        }
    }
}
