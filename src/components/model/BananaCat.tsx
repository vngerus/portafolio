import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        Object_36: THREE.SkinnedMesh;
        _rootJoint: THREE.Bone;
    };
    materials: {
        heheBanana: THREE.MeshStandardMaterial;
    };
};

type ActionName =
    | "bananaBones|hiiiiiiiii"
    | "bananaBones|idle"
    | "bananaBones|walk"
    | "bananaBones|jump"
    | "bananaBones|lookAround"
    | "bananaBones|sitDown"
    | "bananaBones|sit"
    | "bananaBones|standUp"
    | "bananaBones|damaged";

type GLTFActions = Record<ActionName, THREE.AnimationAction>;

interface BananaCatProps {
    actionName?: ActionName;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
}

const BananaCat: React.FC<BananaCatProps> = ({ actionName, ...props }) => {
    const group = useRef<THREE.Group>(null!);
    const { nodes, materials, animations } = useGLTF("/models/bananacat.glb") as GLTFResult;
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (actionName && actions && actions[actionName]) {
            actions[actionName]?.reset().fadeIn(0.5).play();
        }
        return () => {
            if (actionName && actions && actions[actionName]) {
                actions[actionName]?.fadeOut(0.5);
            }
        };
    }, [actions, actionName]);

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
                geometry={nodes.Object_36.geometry}
                material={materials.heheBanana}
                skeleton={nodes.Object_36.skeleton}
            />
        </group>
    );
};

useGLTF.preload("/models/bananacat.glb");

export default BananaCat;
