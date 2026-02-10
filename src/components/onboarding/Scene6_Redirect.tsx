// Scene 6: Portal Redirect - Simplified Working Version

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';

interface Scene6Props {
    onTransitionComplete: () => void;
}

export const Scene6_Redirect = ({ onTransitionComplete }: Scene6Props) => {
    const portalRef = useRef<Group>(null);
    const progressRef = useRef(0);

    useFrame((state, delta) => {
        if (!portalRef.current) return;

        const time = state.clock.getElapsedTime();
        progressRef.current += delta * 0.4;

        // Rotate portal
        portalRef.current.rotation.z = time * 2;

        // Expand portal
        const scale = Math.min(progressRef.current * 10, 10);
        portalRef.current.scale.setScalar(scale);

        // Complete after 2.5 seconds
        if (progressRef.current >= 1) {
            setTimeout(() => {
                onTransitionComplete();
                progressRef.current = 0;
            }, 500);
        }
    });

    return (
        <group>
            {/* Portal */}
            <group ref={portalRef} position={[0, 0, -2]}>
                <mesh>
                    <ringGeometry args={[0.8, 1, 64]} />
                    <meshBasicMaterial color="#00d4ff" />
                </mesh>

                <mesh>
                    <circleGeometry args={[0.8, 64]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
                </mesh>
            </group>

            {/* Light tunnel */}
            {[...Array(12)].map((_, i) => {
                const radius = 1.5 + i * 0.3;
                const z = -2 - i * 0.5;
                return (
                    <mesh key={i} position={[0, 0, z]}>
                        <ringGeometry args={[radius, radius + 0.1, 64]} />
                        <meshBasicMaterial
                            color={i % 2 === 0 ? '#00d4ff' : '#00ff88'}
                            transparent
                            opacity={0.6 - i * 0.05}
                        />
                    </mesh>
                );
            })}

            {/* Redirect icon */}
            <Text position={[0, 0, -1.5]} fontSize={0.8} color="white" anchorX="center" anchorY="middle">
                🔗
            </Text>

            {/* Text */}
            <Text position={[0, -1.5, -1]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
                Redirecting to platform...
            </Text>

            <pointLight position={[0, 0, -2]} intensity={3} color="#00d4ff" />
        </group>
    );
};
