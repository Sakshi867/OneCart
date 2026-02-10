// Scene 5: Action Button - Simplified Working Version

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';

interface Scene5Props {
    onActionClick: () => void;
}

export const Scene5_Action = ({ onActionClick }: Scene5Props) => {
    const buttonRef = useRef<Group>(null);
    const [isHovered, setIsHovered] = useState(false);

    useFrame((state) => {
        if (!buttonRef.current) return;
        const time = state.clock.getElapsedTime();

        // Pulse animation
        const pulse = 1 + Math.sin(time * 2) * 0.05;
        const hoverScale = isHovered ? 1.1 : 1;
        buttonRef.current.scale.setScalar(pulse * hoverScale);
    });

    return (
        <group>
            {/* Energy wave rings */}
            <mesh>
                <ringGeometry args={[1.8, 2.0, 64]} />
                <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
            </mesh>

            {/* Main button */}
            <group
                ref={buttonRef}
                onClick={onActionClick}
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
            >
                {/* Button background */}
                <mesh>
                    <boxGeometry args={[3.5, 1.2, 0.3]} />
                    <meshStandardMaterial
                        color="#00ff88"
                        metalness={0.3}
                        roughness={0.1}
                        emissive="#00ff88"
                        emissiveIntensity={0.8}
                    />
                </mesh>

                {/* Button icon */}
                <Text position={[-1, 0, 0.2]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                    🛒
                </Text>

                {/* Button text */}
                <Text position={[0.5, 0, 0.2]} fontSize={0.35} color="#1a1a1a" anchorX="center" anchorY="middle">
                    Buy Now
                </Text>

                {/* Alternative text */}
                <Text position={[0.5, -0.45, 0.2]} fontSize={0.15} color="#1a1a1a" anchorX="center" anchorY="middle">
                    🛎️ Book Now
                </Text>
            </group>

            {/* Particles */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 2.5;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
                    >
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshBasicMaterial color="#00ff88" />
                    </mesh>
                );
            })}

            <pointLight position={[0, 0, 3]} intensity={1} color="#00ff88" />
        </group>
    );
};
