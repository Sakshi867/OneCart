// Scene 3: Item Selection - Simplified Working Version

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';
import { getSampleItem } from '@/data/sceneData';

interface Scene3Props {
    categoryId: string;
    subCategoryId: string;
    onItemSelect: () => void;
}

export const Scene3_ItemSelection = ({ categoryId, subCategoryId, onItemSelect }: Scene3Props) => {
    const meshRef = useRef<Group>(null);
    const [isHovered, setIsHovered] = useState(false);
    const item = getSampleItem(categoryId, subCategoryId);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    });

    if (!item) {
        return (
            <Text position={[0, 0, 0]} fontSize={0.3} color="white">
                No item available
            </Text>
        );
    }

    return (
        <group>
            <group
                ref={meshRef}
                position={[0, 0, 2]}
                onClick={onItemSelect}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                scale={isHovered ? 1.15 : 1}
            >
                {/* Back layer */}
                <mesh position={[0, 0, -0.2]}>
                    <boxGeometry args={[3, 3.5, 0.1]} />
                    <meshStandardMaterial color="#1a1a1a" transparent opacity={0.6} />
                </mesh>

                {/* Middle layer */}
                <mesh position={[0, 0, -0.1]}>
                    <boxGeometry args={[2.8, 3.3, 0.15]} />
                    <meshStandardMaterial color="#2a2a2a" transparent opacity={0.8} />
                </mesh>

                {/* Front layer */}
                <mesh>
                    <boxGeometry args={[2.6, 3.1, 0.2]} />
                    <meshStandardMaterial
                        color="#00d4ff"
                        metalness={0.1}
                        roughness={0.2}
                        transparent
                        opacity={0.95}
                        emissive="#00d4ff"
                        emissiveIntensity={0.4}
                    />
                </mesh>

                {/* Item emoji */}
                <Text position={[0, 0.8, 0.15]} fontSize={1.2} color="white" anchorX="center" anchorY="middle">
                    {item.emoji}
                </Text>

                {/* Item name */}
                <Text position={[0, -0.2, 0.15]} fontSize={0.35} color="white" anchorX="center" anchorY="middle">
                    {item.name}
                </Text>

                {/* Target icon */}
                <Text position={[0, -0.8, 0.15]} fontSize={0.5} color="#00ff88" anchorX="center" anchorY="middle">
                    🎯
                </Text>

                {/* Glow ring */}
                <mesh position={[0, 0, -0.05]}>
                    <ringGeometry args={[1.5, 1.7, 64]} />
                    <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
                </mesh>
            </group>

            <pointLight position={[3, 3, 3]} intensity={0.5} color="#ffffff" />
            <pointLight position={[-3, -3, 2]} intensity={0.3} color="#00ff88" />
        </group>
    );
};
