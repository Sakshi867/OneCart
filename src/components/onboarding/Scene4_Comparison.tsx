// Scene 4: Platform Comparison - Simplified Working Version

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';
import { mockPlatforms } from '@/data/sceneData';

interface Scene4Props {
    onComparisonComplete: () => void;
}

export const Scene4_Comparison = ({ onComparisonComplete }: Scene4Props) => {
    const groupRef = useRef<Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    });

    return (
        <group ref={groupRef}>
            {mockPlatforms.map((platform, index) => {
                const x = (index - 1) * 2.5;
                const y = (index - 1) * 0.3;

                return (
                    <group key={platform.id} position={[x, y, 0]}>
                        {/* Panel */}
                        <mesh>
                            <boxGeometry args={[2.2, 2.8, 0.1]} />
                            <meshStandardMaterial
                                color="#1a1a1a"
                                metalness={0.4}
                                roughness={0.2}
                                transparent
                                opacity={0.85}
                            />
                        </mesh>

                        {/* Logo */}
                        <Text position={[0, 1, 0.08]} fontSize={0.6} color="white" anchorX="center" anchorY="middle">
                            {platform.logo}
                        </Text>

                        {/* Name */}
                        <Text position={[0, 0.5, 0.08]} fontSize={0.22} color="#00d4ff" anchorX="center" anchorY="middle">
                            {platform.name}
                        </Text>

                        {/* Price label */}
                        <Text position={[0, 0.1, 0.08]} fontSize={0.15} color="#aaaaaa" anchorX="center" anchorY="middle">
                            Price
                        </Text>

                        {/* Price value */}
                        <Text position={[0, -0.1, 0.08]} fontSize={0.35} color="#00ff88" anchorX="center" anchorY="middle">
                            {platform.price}
                        </Text>

                        {/* ETA label */}
                        <Text position={[0, -0.7, 0.08]} fontSize={0.15} color="#aaaaaa" anchorX="center" anchorY="middle">
                            ETA
                        </Text>

                        {/* ETA value */}
                        <Text position={[0, -0.9, 0.08]} fontSize={0.3} color="#b388ff" anchorX="center" anchorY="middle">
                            {platform.eta}
                        </Text>
                    </group>
                );
            })}

            {/* Disclaimer */}
            <Text
                position={[0, -2.5, 0]}
                fontSize={0.15}
                color="#888888"
                anchorX="center"
                anchorY="middle"
                maxWidth={6}
                textAlign="center"
            >
                📊 No payment inside app — you'll be redirected
            </Text>

            <pointLight position={[0, 3, 2]} intensity={0.6} color="#00d4ff" />
        </group>
    );
};
