import { createContext, useContext, useState, ReactNode } from "react";

export type Category = "groceries" | "cosmetics" | "transport" | "medicines" | "shopping";

interface CategoryContextType {
  category: Category | null;
  setCategory: (cat: Category | null) => void;
  themeClass: string;
}

const CategoryContext = createContext<CategoryContextType>({
  category: null,
  setCategory: () => {},
  themeClass: "",
});

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<Category | null>(null);
  const themeClass = category ? `theme-${category}` : "";

  return (
    <CategoryContext.Provider value={{ category, setCategory, themeClass }}>
      <div className={themeClass}>{children}</div>
    </CategoryContext.Provider>
  );
};
