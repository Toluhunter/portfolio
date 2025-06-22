
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useTexture } from '@react-three/drei'

export const Aws = (props) => {
    const { nodes, materials } = useGLTF('/models/aws_logo.glb')
    return (
        <group {...props} dispose={null}>
            <group scale={0.01}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ArrowBody_Material001_0.geometry}
                    position={[-13.076, 155.698, -20.264]}
                    scale={16067.461}
                >
                    <meshStandardMaterial color="#FF9900" />
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.AWS_Material003_0.geometry}
                    position={[41.538, 612.01, -20.264]}
                    scale={16067.461}
                >
                    <meshStandardMaterial color="#232F3E" />

                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.ArrowHead_Material001_0.geometry}
                    position={[593.304, 205.677, -20.264]}
                    scale={16067.461}
                >
                    <meshStandardMaterial color="#FF9900" />
                </mesh>
            </group>
        </group>
    )
}
export const Python = (props) => {
    const { nodes, materials } = useGLTF('/models/python.glb')
    return (
        <group {...props} dispose={null}>
            <group scale={0.01}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Python_Python_0.geometry}
                    material={materials.Python}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={100}
                />
            </group>
        </group>
    )
}

export const Screen = (props) => {
    const { nodes, materials } = useGLTF('/models/screen.glb')
    const profilePic = useTexture('/pic.jpg')
    useEffect(() => {
        //     profilePic.wrapS = THREE.ClampToEdgeWrapping
        //     profilePic.wrapT = THREE.ClampToEdgeWrapping
        profilePic.repeat.set(3.0, 2.0) // try smaller values until the image fits
        profilePic.offset.set(0.9, -0.1) // center the image X , y
        // profilePic.center.set(0.5, 0.5)             // Set pivot to center
        profilePic.rotation = -1.5           // Rotate 90 degrees (clockwise)

        // profilePic.repeat.set(-0.5, 1.5)              // Zoom level
        // profilePic.offset.set(0, -0.5)             // Adjust position
    }, [profilePic])
    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={11.74}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group scale={[1, 0.935, 0.375]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Screen_Default_0.geometry}
                            material={materials.Default}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Screen_Screen_0.geometry}
                            material={materials.Screen}
                        >
                            {/* <planeGeometry args={[1.6, 0.9]} /> */}
                            <meshStandardMaterial map={profilePic} />
                        </mesh>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Screen_Marco_0.geometry}
                            material={materials.Marco}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Screen_Parte_de_atras_0.geometry}
                            material={materials.Parte_de_atras}
                        />
                    </group>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh_Base_0.geometry}
                        material={materials.Base}
                        position={[0, 0.4, 2.68]}
                        scale={[1, 1, 0.791]}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/screen.glb')
useGLTF.preload('/models/python.glb')
useGLTF.preload('/models/aws_logo.glb')