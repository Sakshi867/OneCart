// Scene 2: Sub-Category Emergence - Simplified Working Version

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';
import { getCategoryById } from '@/data/sceneData';

interface Scene2Props {
    categoryId: string;
    onSubCategorySelect: (subCategoryId: string) => void;
}

export const Scene2_SubCategories = ({ categoryId, onSubCategorySelect }: Scene2Props) => {
    const groupRef = useRef<Group>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const category = getCategoryById(categoryId);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.3;
    });

    if (!category) return null;

    return (
        <group ref={groupRef}>
            {category.subCategories.map((subCategory, index) => {
                // Circular layout
                const angle = (index / 6) * Math.PI * 2;
                const radius = 3.5;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const isHovered = hoveredId === subCategory.id;

                return (
                    <group
                        key={subCategory.id}
                        position={[x, 0, z]}
                        onClick={() => onSubCategorySelect(subCategory.id)}
                        onPointerEnter={() => setHoveredId(subCategory.id)}
                        onPointerLeave={() => setHoveredId(null)}
                        scale={isHovered ? 1.2 : 1}
                    >
                        {/* Card */}
                        <mesh>
                            <boxGeometry args={[1.8, 2, 0.15]} />
                            <meshStandardMaterial
                                color={category.color}
                                metalness={0.2}
                                roughness={0.3}
                                transparent
                                opacity={0.85}
                                emissive={category.color}
                                emissiveIntensity={isHovered ? 0.6 : 0.3}
                            />
                        </mesh>

                        {/* Emoji */}
                        <Text
                            position={[0, 0.4, 0.1]}
                            fontSize={0.6}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {subCategory.emoji}
                        </Text>

                        {/* Name */}
                        <Text
                            position={[0, -0.3, 0.1]}
                            fontSize={0.18}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={1.5}
                            textAlign="center"
                        >
                            {subCategory.name}
                        </Text>

                        {/* Glow */}
                        {isHovered && (
                            <mesh position={[0, 0, -0.08]}>
                                <ringGeometry args={[1.0, 1.15, 32]} />
                                <meshBasicMaterial color={category.color} transparent opacity={0.7} />
                            </mesh>
                        )}
                    </group>
                );
            })}

            <pointLight position={[0, 0, 5]} intensity={0.8} color={category.color} />
            <pointLight position={[0, 5, 0]} intensity={0.4} color="#ffffff" />
        </group>
    );
};
