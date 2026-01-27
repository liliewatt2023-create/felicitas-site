// Constants pour les statuts de reviews
// SQLite ne supportant pas les enums natifs, on utilise des constantes TypeScript

export const ReviewStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export type ReviewStatusType = typeof ReviewStatus[keyof typeof ReviewStatus];

// Constants pour les rôles utilisateurs
export const UserRole = {
  PARTICULIER: 'PARTICULIER',
  RESTAURATEUR: 'RESTAURATEUR',
  COMITE: 'COMITE',
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];
