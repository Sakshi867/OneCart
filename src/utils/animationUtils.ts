// Animation utilities for 3D onboarding experience
// Physics-based easing functions and motion helpers

import { Vector3 } from 'three';

/**
 * Antigravity float animation
 * Creates a gentle floating motion with subtle drift
 */
export const antigravityFloat = (
    time: number,
    amplitude: number = 0.3,
    frequency: number = 0.5
): number => {
    return Math.sin(time * frequency) * amplitude;
};

/**
 * Magnetic snap easing
 * Smooth acceleration towards target with magnetic pull effect
 */
export const magneticSnap = (
    current: number,
    target: number,
    strength: number = 0.1
): number => {
    return current + (target - current) * strength;
};

/**
 * Inertia easing
 * Smooth deceleration with natural physics feel
 */
export const inertiaEasing = (t: number): number => {
    // Cubic ease-out
    return 1 - Math.pow(1 - t, 3);
};

/**
 * Orbital motion calculator
 * Returns position on circular path
 */
export const orbitalMotion = (
    time: number,
    radius: number,
    speed: number,
    offset: number = 0
): { x: number; y: number; z: number } => {
    const angle = time * speed + offset;
    return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.3, // Elliptical orbit
        z: Math.sin(angle) * radius,
    };
};

/**
 * Smooth step function
 * Hermite interpolation for smooth transitions
 */
export const smoothStep = (edge0: number, edge1: number, x: number): number => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
};

/**
 * Elastic ease-out
 * Bouncy effect for playful animations
 */
export const elasticEaseOut = (t: number): number => {
    const p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
};

/**
 * Camera dolly movement
 * Smooth camera movement along Z axis
 */
export const cameraDolly = (
    progress: number,
    startZ: number,
    endZ: number
): number => {
    const eased = inertiaEasing(progress);
    return startZ + (endZ - startZ) * eased;
};

/**
 * Parallax offset calculator
 * Creates depth-based parallax effect
 */
export const parallaxOffset = (
    mouseX: number,
    mouseY: number,
    depth: number
): { x: number; y: number } => {
    return {
        x: mouseX * depth * 0.05,
        y: mouseY * depth * 0.05,
    };
};

/**
 * Energy wave pulse
 * Creates expanding wave effect for buttons
 */
export const energyWave = (
    time: number,
    frequency: number = 2
): { scale: number; opacity: number } => {
    const t = (time * frequency) % 1;
    return {
        scale: 1 + t * 0.5,
        opacity: 1 - t,
    };
};

/**
 * Magnetic pull force
 * Calculates attraction force between two points
 */
export const magneticPull = (
    position: Vector3,
    target: Vector3,
    strength: number = 0.05
): Vector3 => {
    const direction = new Vector3().subVectors(target, position);
    const distance = direction.length();
    const force = Math.min(1, strength / (distance + 0.1));
    return direction.normalize().multiplyScalar(force);
};

/**
 * Rotation with inertia
 * Smooth rotation with momentum
 */
export const rotationWithInertia = (
    currentRotation: number,
    targetRotation: number,
    velocity: number,
    damping: number = 0.9
): { rotation: number; newVelocity: number } => {
    const diff = targetRotation - currentRotation;
    const newVelocity = (velocity + diff * 0.1) * damping;
    return {
        rotation: currentRotation + newVelocity,
        newVelocity,
    };
};

/**
 * Portal expansion
 * Circular expansion effect for portal transition
 */
export const portalExpansion = (
    progress: number
): { radius: number; opacity: number } => {
    const eased = elasticEaseOut(progress);
    return {
        radius: eased * 10,
        opacity: 1 - progress * 0.5,
    };
};

/**
 * Glow intensity calculator
 * Pulsing glow effect
 */
export const glowIntensity = (
    time: number,
    baseIntensity: number = 1,
    pulseSpeed: number = 1
): number => {
    return baseIntensity + Math.sin(time * pulseSpeed) * 0.3;
};

/**
 * Layered depth positioning
 * Calculates Z positions for layered cards
 */
export const layeredDepth = (
    index: number,
    totalItems: number,
    spacing: number = 0.5
): number => {
    const center = (totalItems - 1) / 2;
    return (index - center) * spacing;
};

/**
 * Spiral emergence pattern
 * Cards emerge in spiral pattern
 */
export const spiralEmergence = (
    index: number,
    time: number,
    radius: number = 3
): { x: number; y: number; z: number } => {
    const angle = (index * Math.PI * 2) / 6 + time * 0.5;
    const spiralRadius = radius + Math.sin(time + index) * 0.5;
    return {
        x: Math.cos(angle) * spiralRadius,
        y: Math.sin(time + index * 0.5) * 0.5,
        z: Math.sin(angle) * spiralRadius,
    };
};
