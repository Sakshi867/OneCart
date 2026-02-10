// Scene data for 3D onboarding experience
// All categories, sub-categories, and sample items with emojis

export interface SubCategory {
    id: string;
    name: string;
    emoji: string;
}

export interface Category {
    id: string;
    name: string;
    emoji: string;
    color: string;
    gradient: string;
    subCategories: SubCategory[];
}

export interface SampleItem {
    id: string;
    name: string;
    emoji: string;
    categoryId: string;
    subCategoryId: string;
}

export interface Platform {
    id: string;
    name: string;
    logo: string;
    price?: string;
    eta?: string;
}

// Main Categories with Sub-Categories
export const categories: Category[] = [
    {
        id: 'grocery',
        name: 'Grocery',
        emoji: '🛒',
        color: '#00ff88',
        gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
        subCategories: [
            { id: 'fruits-vegetables', name: 'Fruits & Vegetables', emoji: '🥕' },
            { id: 'dairy-eggs', name: 'Dairy & Eggs', emoji: '🥛' },
            { id: 'staples-grains', name: 'Staples & Grains', emoji: '🌾' },
            { id: 'cooking-essentials', name: 'Cooking Essentials', emoji: '🍳' },
            { id: 'snacks-beverages', name: 'Snacks & Beverages', emoji: '🍿' },
            { id: 'household-cleaning', name: 'Household & Cleaning', emoji: '🧽' },
        ],
    },
    {
        id: 'cosmetics',
        name: 'Cosmetics',
        emoji: '💄',
        color: '#b388ff',
        gradient: 'linear-gradient(135deg, #b388ff 0%, #ff88e8 100%)',
        subCategories: [
            { id: 'skincare', name: 'Skincare', emoji: '🧴' },
            { id: 'makeup', name: 'Makeup', emoji: '💄' },
            { id: 'haircare', name: 'Haircare', emoji: '💇' },
            { id: 'personal-care', name: 'Personal Care', emoji: '🧼' },
            { id: 'fragrances', name: 'Fragrances', emoji: '🌸' },
            { id: 'beauty-tools', name: 'Beauty Tools', emoji: '🛠️' },
        ],
    },
    {
        id: 'shopping',
        name: 'Shopping',
        emoji: '🛍️',
        color: '#ff8844',
        gradient: 'linear-gradient(135deg, #ff8844 0%, #ffaa44 100%)',
        subCategories: [
            { id: 'fashion-apparel', name: 'Fashion & Apparel', emoji: '👗' },
            { id: 'electronics-gadgets', name: 'Electronics & Gadgets', emoji: '📱' },
            { id: 'home-kitchen', name: 'Home & Kitchen', emoji: '🏠' },
            { id: 'footwear-accessories', name: 'Footwear & Accessories', emoji: '👟' },
            { id: 'beauty-personal-care', name: 'Beauty & Personal Care', emoji: '🧴' },
            { id: 'sports-books-more', name: 'Sports, Books & More', emoji: '📚' },
        ],
    },
    {
        id: 'transport',
        name: 'Transport',
        emoji: '🚗',
        color: '#00d4ff',
        gradient: 'linear-gradient(135deg, #00d4ff 0%, #0088ff 100%)',
        subCategories: [
            { id: 'bike-rides', name: 'Bike Rides', emoji: '🏍️' },
            { id: 'auto-rickshaw', name: 'Auto Rickshaw', emoji: '🛺' },
            { id: 'cab', name: 'Cab', emoji: '🚖' },
            { id: 'shared-rides', name: 'Shared Rides', emoji: '👥' },
            { id: 'intercity-travel', name: 'Intercity Travel', emoji: '🚌' },
            { id: 'rentals', name: 'Rentals', emoji: '🚘' },
        ],
    },
    {
        id: 'medicines',
        name: 'Medicines',
        emoji: '💊',
        color: '#ff4488',
        gradient: 'linear-gradient(135deg, #ff4488 0%, #ff88aa 100%)',
        subCategories: [
            { id: 'prescription-medicines', name: 'Prescription Medicines', emoji: '📄' },
            { id: 'generic-alternatives', name: 'Generic Alternatives', emoji: '🧪' },
            { id: 'chronic-care', name: 'Chronic Care', emoji: '🩺' },
            { id: 'wellness-immunity', name: 'Wellness & Immunity', emoji: '🛡️' },
            { id: 'first-aid-devices', name: 'First Aid & Devices', emoji: '🩹' },
            { id: 'baby-women-senior-care', name: 'Baby, Women & Senior Care', emoji: '👶' },
        ],
    },
];

// Sample Items for demonstration
export const sampleItems: SampleItem[] = [
    {
        id: 'milk',
        name: 'Milk',
        emoji: '🥛',
        categoryId: 'grocery',
        subCategoryId: 'dairy-eggs',
    },
    {
        id: 'sunscreen',
        name: 'Sunscreen',
        emoji: '☀️',
        categoryId: 'cosmetics',
        subCategoryId: 'skincare',
    },
    {
        id: 'mobile-phone',
        name: 'Mobile Phone',
        emoji: '📱',
        categoryId: 'shopping',
        subCategoryId: 'electronics-gadgets',
    },
    {
        id: 'sedan',
        name: 'Sedan',
        emoji: '🚖',
        categoryId: 'transport',
        subCategoryId: 'cab',
    },
    {
        id: 'diabetes-medicine',
        name: 'Diabetes Medicine',
        emoji: '💊',
        categoryId: 'medicines',
        subCategoryId: 'chronic-care',
    },
];

// Platform comparison mock data
export const mockPlatforms: Platform[] = [
    {
        id: 'platform-1',
        name: 'Platform A',
        logo: '🏪',
        price: '₹299',
        eta: '15 min',
    },
    {
        id: 'platform-2',
        name: 'Platform B',
        logo: '🛒',
        price: '₹279',
        eta: '20 min',
    },
    {
        id: 'platform-3',
        name: 'Platform C',
        logo: '🏬',
        price: '₹315',
        eta: '10 min',
    },
];

// Helper functions
export const getCategoryById = (id: string): Category | undefined => {
    return categories.find((cat) => cat.id === id);
};

export const getSubCategoryById = (
    categoryId: string,
    subCategoryId: string
): SubCategory | undefined => {
    const category = getCategoryById(categoryId);
    return category?.subCategories.find((sub) => sub.id === subCategoryId);
};

export const getSampleItem = (
    categoryId: string,
    subCategoryId: string
): SampleItem | undefined => {
    return sampleItems.find(
        (item) =>
            item.categoryId === categoryId && item.subCategoryId === subCategoryId
    );
};
