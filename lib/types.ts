// Types personnalisés pour remplacer les enums Prisma

export enum UserRole {
  PARTICULIER = "PARTICULIER",
  RESTAURATEUR = "RESTAURATEUR",
  COMITE = "COMITE",
}

export enum ProductCategory {
  CHARCUTERIE = "CHARCUTERIE",
  FROMAGE = "FROMAGE",
}

export enum ReviewStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
