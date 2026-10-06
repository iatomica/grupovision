export interface AuthUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'asesor' | 'traveler' | 'operador';
  roleLabel: string;
  password: string; // Almacenado de forma segura en configuración para autenticación de credenciales
  defaultView: 'admin-board' | 'advisor-board' | 'traveler-board';
  branch?: string;
  avatar?: string;
  description: string;
}

/**
 * Registro de credenciales oficiales para cada perfil operativo y de cliente de Grupo Visión.
 * Cada usuario cuenta con su login por nombre de usuario o por email y contraseña.
 */
export const SYSTEM_AUTH_USERS: AuthUser[] = [
  {
    id: 'usr-admin-01',
    username: 'admin',
    email: 'luis@grupovision.tur.ar',
    name: 'Luis Morales',
    role: 'admin',
    roleLabel: 'Administrador General',
    password: 'VisionAdmin2026!',
    defaultView: 'admin-board',
    branch: 'Urquiza 276 (Centro Cívico)',
    avatar: 'LM',
    description: 'Acceso total: tarifas, descuentos globales, CMS, analítica, auditoría y control de retroceso en tickets.'
  },
  {
    id: 'usr-asesor-02',
    username: 'asesor',
    email: 'thomas@grupovision.tur.ar',
    name: 'Thomas Benítez',
    role: 'asesor',
    roleLabel: 'Asesor Comercial Senior',
    password: 'VisionAsesor2026!',
    defaultView: 'advisor-board',
    branch: 'Operativa de Montaña',
    avatar: 'TB',
    description: 'Directorio de viajeros, emisión de presupuestos rápidos y asignación de % de descuento discrecional.'
  },
  {
    id: 'usr-operador-03',
    username: 'operador',
    email: 'santiago@grupovision.tur.ar',
    name: 'Santiago Reyes',
    role: 'operador',
    roleLabel: 'Jefe de Logística & Operador Mostrador',
    password: 'VisionOperador2026!',
    defaultView: 'admin-board',
    branch: 'San Martín 398 (Casa Central)',
    avatar: 'SR',
    description: 'Carga manual de tickets por mostrador, validación anti-sobreventas, asignación de flota y avance operativo.'
  },
  {
    id: 'usr-traveler-04',
    username: 'viajero',
    email: 'carolina.rossi@gmail.com',
    name: 'Carolina Rossi',
    role: 'traveler',
    roleLabel: 'Viajera VIP',
    password: 'VisionViajero2026!',
    defaultView: 'traveler-board',
    branch: 'Buenos Aires (Cliente VIP)',
    avatar: 'CR',
    description: 'Portal de autoservicio: seguimiento de reservas, itinerarios, descarga de vouchers PDF y chat con asesor.'
  }
];

const SESSION_STORAGE_KEY = 'grupovision_active_session_v1';

/**
 * Autentica un usuario contra el registro del sistema mediante usuario o correo electrónico y contraseña.
 * Retorna el usuario autenticado (sin exponer la contraseña) o null si las credenciales no son válidas.
 */
export function authenticate(identifier: string, passwordAttempt: string): Omit<AuthUser, 'password'> | null {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = passwordAttempt.trim();

  if (!cleanId || !cleanPass) return null;

  const found = SYSTEM_AUTH_USERS.find(user => 
    (user.username.toLowerCase() === cleanId || user.email.toLowerCase() === cleanId) &&
    user.password === cleanPass
  );

  if (!found) return null;

  // Retornar perfil seguro sin exponer la contraseña
  const { password, ...safeUser } = found;
  return safeUser;
}

/**
 * Guarda la sesión activa en el almacenamiento local para persistencia entre recargas.
 */
export function saveSession(user: Omit<AuthUser, 'password'>): void {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Error guardando sesión:', e);
  }
}

/**
 * Recupera la sesión activa actual si existe.
 */
export function getSavedSession(): Omit<AuthUser, 'password'> | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY) || localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/**
 * Cierra la sesión activa del usuario.
 */
export function clearSession(): void {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {
    console.error('Error limpiando sesión:', e);
  }
}
