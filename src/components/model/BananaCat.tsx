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

export type ActionName =
    | "bananaBones|hiiiiiiiii"
    | "bananaBones|idle"
    | "bananaBones|walk"
    | "bananaBones|jump"
    | "bananaBones|lookAround"
    | "bananaBones|sitDown"
    | "bananaBones|sit"
    | "bananaBones|standUp"
    | "bananaBones|damaged";

interface BananaCatProps {
    actionName?: ActionName;
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
}

const ONE_SHOT_ACTIONS: ReadonlySet<ActionName> = new Set([
    "bananaBones|hiiiiiiiii",
    "bananaBones|jump",
    "bananaBones|sitDown",
    "bananaBones|standUp",
    "bananaBones|damaged",
]);

const BananaCat: React.FC<BananaCatProps> = ({ actionName, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], ...props }) => {
    const group = useRef<THREE.Group>(null!);
    const { nodes, materials, animations } = useGLTF("/models/bananacat.glb") as unknown as GLTFResult;
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        const action = actionName ? actions[actionName] : undefined;
        if (action) {
            // Imperative three.js AnimationAction API, not React state.
            if (actionName && ONE_SHOT_ACTIONS.has(actionName)) {
                action.setLoop(THREE.LoopOnce, 1);
                // eslint-disable-next-line react-hooks/immutability
                action.clampWhenFinished = true;
            } else {
                action.setLoop(THREE.LoopRepeat, Infinity);
                action.clampWhenFinished = false;
            }
            action.reset().fadeIn(0.5).play();
        }

        return () => {
            if (actionName && actions[actionName]) {
                actions[actionName]?.fadeOut(0.5);
            }
        };
    }, [actions, actionName]);

    return (
        <group ref={group} {...props} position={position} rotation={rotation} scale={scale} dispose={null}>
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
