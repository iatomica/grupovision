export interface TravelerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipLevel: 'VIP' | 'Frecuente' | 'Nuevo' | 'Gold';
  customDiscountPercent: number; // Discretionary discount assigned by Asesor
  loyaltyPoints: number;
  passportOrDni: string;
  city: string;
  notes: string;
  avatar: string;
  createdAt: string;
}

export const INITIAL_TRAVELERS: TravelerUser[] = [
  {
    id: 'tr-1',
    name: 'Carolina Rossi',
    email: 'carolina.rossi@gmail.com',
    phone: '+54 9 11 5829-4012',
    membershipLevel: 'VIP',
    customDiscountPercent: 15,
    loyaltyPoints: 1250,
    passportOrDni: 'DNI 34.819.002',
    city: 'Buenos Aires',
    notes: 'Pasajera recurrente de temporada invernal. Preferencia por traslados privados.',
    avatar: 'CR',
    createdAt: '2026-01-15'
  },
  {
    id: 'tr-2',
    name: 'Santiago Giménez',
    email: 'santiago.g@techpatagonia.io',
    phone: '+54 9 294 412-9988',
    membershipLevel: 'Gold',
    customDiscountPercent: 10,
    loyaltyPoints: 850,
    passportOrDni: 'DNI 31.092.441',
    city: 'San Carlos de Bariloche',
    notes: 'Cliente corporativo TechPatagonia. Le interesan deportes de montaña y 4x4.',
    avatar: 'SG',
    createdAt: '2026-02-10'
  },
  {
    id: 'tr-3',
    name: 'Dr. Alejandro Fernández',
    email: 'a.fernandez@medisur.org',
    phone: '+54 9 351 690-1122',
    membershipLevel: 'Frecuente',
    customDiscountPercent: 5,
    loyaltyPoints: 400,
    passportOrDni: 'DNI 28.510.992',
    city: 'Córdoba',
    notes: 'Viaja en familia con niños. Requiere opciones de almuerzo sin TACC.',
    avatar: 'AF',
    createdAt: '2026-04-02'
  },
  {
    id: 'tr-4',
    name: 'Valeria Larrea',
    email: 'valeria.larrea@outlook.com',
    phone: '+54 9 11 4091-8833',
    membershipLevel: 'Nuevo',
    customDiscountPercent: 0,
    loyaltyPoints: 100,
    passportOrDni: 'DNI 40.119.823',
    city: 'Rosario',
    notes: 'Primera visita a Bariloche. Consultando por paseos en barco y cabalgatas.',
    avatar: 'VL',
    createdAt: '2026-08-20'
  }
];
