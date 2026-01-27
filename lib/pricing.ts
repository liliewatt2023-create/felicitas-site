import { UserRole, ProductCategory } from "./types";

// Prix par kg selon le rôle et la catégorie
export const PRICING = {
  [ProductCategory.CHARCUTERIE]: {
    [UserRole.PARTICULIER]: 99,
    [UserRole.RESTAURATEUR]: 79,
    [UserRole.COMITE]: 69,
  },
  [ProductCategory.FROMAGE]: {
    [UserRole.PARTICULIER]: 79,
    [UserRole.RESTAURATEUR]: 79,
    [UserRole.COMITE]: 49,
  },
};

export function getPricePerKg(
  category: ProductCategory,
  role: UserRole
): number {
  return PRICING[category][role];
}

export function calculateItemTotal(
  category: ProductCategory,
  role: UserRole,
  weight: number,
  quantity: number
): number {
  const pricePerKg = getPricePerKg(category, role);
  return pricePerKg * weight * quantity;
}
