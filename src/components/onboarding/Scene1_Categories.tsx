// Simplified Test Scene - Working Version
// Tests basic 3D rendering with minimal complexity

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';
import { categories } from '@/data/sceneData';

interface Scene1Props {
    onCategorySelect: (categoryId: string) => void;
}

export const Scene1_Categories = ({ onCategorySelect }: Scene1Props) => {
    const groupRef = useRef<Group>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        // Slow rotation of entire group
        groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
    });

    return (
        <group ref={groupRef}>
            {categories.map((category, index) => {
                // Calculate position in circular layout
                const angle = (index / categories.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 4;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const isHovered = hoveredId === category.id;

                return (
                    <group
                        key={category.id}
                        position={[x, 0, z]}
                        onClick={() => onCategorySelect(category.id)}
                        onPointerEnter={() => setHoveredId(category.id)}
                        onPointerLeave={() => setHoveredId(null)}
                        scale={isHovered ? 1.15 : 1}
                    >
                        {/* Card background */}
                        <mesh>
                            <boxGeometry args={[2, 2.5, 0.2]} />
                            <meshStandardMaterial
                                color={category.color}
                                metalness={0.1}
                                roughness={0.2}
                                transparent
                                opacity={0.9}
                                emissive={category.color}
                                emissiveIntensity={isHovered ? 0.5 : 0.2}
                            />
                        </mesh>

                        {/* Emoji icon */}
                        <Text
                            position={[0, 0.5, 0.15]}
                            fontSize={0.8}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {category.emoji}
                        </Text>

                        {/* Category name */}
                        <Text
                            position={[0, -0.3, 0.15]}
                            fontSize={0.25}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {category.name}
                        </Text>

                        {/* Glow ring on hover */}
                        {isHovered && (
                            <mesh position={[0, 0, -0.1]} rotation={[0, 0, 0]}>
                                <ringGeometry args={[1.2, 1.4, 32]} />
                                <meshBasicMaterial color={category.color} transparent opacity={0.6} />
                            </mesh>
                        )}
                    </group>
                );
            })}

            {/* Lighting */}
            <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
            <pointLight position={[5, 0, 5]} intensity={0.3} color="#00d4ff" />
            <pointLight position={[-5, 0, -5]} intensity={0.3} color="#00ff88" />
        </group>
    );
};
