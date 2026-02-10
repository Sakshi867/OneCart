// Premium Onboarding Experience with Glassmorphism
// Main Category → Sub-Category hierarchy with 3D depth

import { useState } from 'react';
import { categories } from '@/data/sceneData';
import './OnboardingExperience.css';

type SceneType = 'categories' | 'subcategories';

export const OnboardingExperience = () => {
    const [currentScene, setCurrentScene] = useState<SceneType>('categories');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        setCurrentScene('subcategories');
    };

    const handleReset = () => {
        setCurrentScene('categories');
        setSelectedCategoryId(null);
    };

    const selectedCategory = categories.find(c => c.id === selectedCategoryId);

    return (
        <div className="onboarding-container">
            {/* Header */}
            <div className="onboarding-header">
                <div>
                    <h1 className="onboarding-title">OneCart</h1>
                    <p className="onboarding-subtitle">Compare. Choose. Save.</p>
                </div>
                <div className="scene-indicator">
                    <p className="scene-label">Scene</p>
                    <p className="scene-name">{currentScene}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="onboarding-content">
                {/* Scene 1: Categories */}
                {currentScene === 'categories' && (
                    <div className="categories-grid">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className="category-card"
                                onClick={() => handleCategoryClick(category.id)}
                                style={{
                                    '--category-color': category.color,
                                    '--animation-delay': `${index * 0.1}s`,
                                } as React.CSSProperties}
                            >
                                <div className="card-glass" />
                                <div className="card-glow" />
                                <div className="card-content">
                                    <div className="category-emoji">{category.emoji}</div>
                                    <p className="category-name">{category.name}</p>
                                </div>
                                <div className="neon-edge" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Scene 2: Sub-Categories with Central Main Category */}
                {currentScene === 'subcategories' && selectedCategory && (
                    <div className="subcategories-scene">
                        {/* Central Main Category Card - Stable & Glowing */}
                        <div
                            className="central-category-card"
                            style={{
                                '--category-color': selectedCategory.color,
                            } as React.CSSProperties}
                        >
                            <div className="card-glass" />
                            <div className="card-glow central-glow" />
                            <div className="card-content">
                                <div className="central-emoji">{selectedCategory.emoji}</div>
                                <p className="central-name">{selectedCategory.name}</p>
                            </div>
                            <div className="neon-edge" />
                            <div className="volumetric-light" />
                        </div>

                        {/* Orbital Sub-Category Cards */}
                        <div className="subcategories-orbital">
                            {selectedCategory.subCategories.map((sub, index) => {
                                const angle = (index / 6) * Math.PI * 2 - Math.PI / 2;
                                const radius = 320;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                const depth = index * 15; // Z-depth for hierarchy

                                return (
                                    <div
                                        key={sub.id}
                                        className="subcategory-card"
                                        style={{
                                            '--category-color': selectedCategory.color,
                                            '--x-pos': `${x}px`,
                                            '--y-pos': `${y}px`,
                                            '--z-depth': `${depth}px`,
                                            '--animation-delay': `${index * 0.15}s`,
                                            '--rotation-offset': `${index * 60}deg`,
                                        } as React.CSSProperties}
                                    >
                                        <div className="card-glass" />
                                        <div className="card-glow" />
                                        <div className="card-content">
                                            <div className="subcategory-emoji">{sub.emoji}</div>
                                            <p className="subcategory-name">{sub.name}</p>
                                        </div>
                                        <div className="neon-edge" />
                                        <div className="liquid-metal-accent" />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Depth of Field Effect */}
                        <div className="dof-overlay" />
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="onboarding-controls">
                <button className="reset-button" onClick={handleReset}>
                    ← Reset
                </button>
                <div className="scene-dots">
                    <div className={currentScene === 'categories' ? 'dot active' : 'dot'} />
                    <div className={currentScene === 'subcategories' ? 'dot active' : 'dot'} />
                </div>
            </div>

            {/* Instructions */}
            <div className="onboarding-instructions">
                {currentScene === 'categories' && 'Click any category to explore sub-categories'}
                {currentScene === 'subcategories' && 'Hover over cards • Click Reset to return'}
            </div>
        </div>
    );
};
