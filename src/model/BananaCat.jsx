import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const BananaCat = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/src/assets/models/bananacat.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions['bananaBones|lookAround']) {
      actions['bananaBones|lookAround'].play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={[0.706, 0.706, 0.706]}>
          <group name="803f79afd410443aae291a0b5d1b1854fbx" rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="bananaBones">
                  <group name="Object_5">
                    {nodes && nodes._rootJoint && <primitive object={nodes._rootJoint} />}
                    {nodes && nodes.Object_36 && (
                      <skinnedMesh
                        name="Object_36"
                        geometry={nodes.Object_36.geometry}
                        material={materials.heheBanana}
                        skeleton={nodes.Object_36.skeleton}
                      />
                    )}
                    <group position={[0, -35.606, 0]} scale={[100, 100, 100]} />
                  </group>
                </group>
                {nodes && nodes.body001 && <group position={[0, -35.606, 0]} scale={[100, 100, 100]} />}
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/src/assets/models/bananacat.glb');
export default BananaCat;
