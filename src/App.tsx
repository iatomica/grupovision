import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Anchor, 
  Mountain, 
  Utensils, 
  Search, 
  Calendar, 
  Users, 
  MapPin, 
  Wind, 
  Thermometer, 
  CheckCircle2, 
  ArrowUpRight, 
  ChevronRight, 
  ShieldCheck, 
  Star, 
  Phone, 
  Mail, 
  Sparkles,
  X,
  Clock,
  Award,
  Car,
  MessageCircle,
  Building2,
  Globe,
  Info,
  Map,
  Menu,
  Lock,
  LogOut,
  User,
  Check,
  Plus,
  Filter,
  FileText,
  QrCode,
  DollarSign,
  TrendingUp,
  Sliders,
  ChevronLeft,
  ArrowRight,
  UserCheck,
  Settings,
  Shield,
  Edit3,
  Inbox,
  MessageSquare,
  Truck,
  CheckCircle,
  Bell,
  Paperclip,
  Tag,
  AtSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { EXCURSIONS_DATA, Excursion } from './data/excursionsData';
import { JiraTicketModal, Booking, TicketComment } from './components/JiraTicketModal';
import { NotificationsModal, UserNotification } from './components/NotificationsModal';
import { TravelerUser, INITIAL_TRAVELERS } from './data/usersData';
import { TravelerDashboard } from './components/TravelerDashboard';
import { AdvisorDashboard } from './components/AdvisorDashboard';
import { AdminPromosExcursions } from './components/AdminPromosExcursions';
import { AdminAnalyticsReports } from './components/AdminAnalyticsReports';

interface SystemActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'ticket' | 'discount' | 'auth' | 'system';
}

const INITIAL_ACTIVITY_LOGS: SystemActivityLog[] = [
  { id: 'log-1', user: 'Lucía Morales (Admin)', action: 'Configuró 15% OFF en Excursión Camino 7 Lagos', timestamp: 'Hace 25 min', type: 'discount' },
  { id: 'log-2', user: 'Marcos Benítez (Asesor)', action: 'Asignó 15% de descuento exclusivo a Carolina Rossi', timestamp: 'Hace 45 min', type: 'discount' },
  { id: 'log-3', user: 'Carolina Rossi (Viajero)', action: 'Emitió solicitud de paquete VIP en Refugio Roca Negra', timestamp: 'Hace 1 hora', type: 'ticket' },
  { id: 'log-4', user: 'Gonzalo Reyes (Logística)', action: 'Asignó Van Sprinter AE-829-GV al ticket GV-8492', timestamp: 'Hace 2 horas', type: 'ticket' }
];

interface StaffMember {
  id: string;
  name: string;
  role: string;
  branch: string;
  email: string;
  canCreateBookings: boolean;
  canAssignFleet: boolean;
  canModifyRates: boolean;
  canExportReports: boolean;
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Lucía Morales',
    role: 'Operadora Mostrador',
    branch: 'Urquiza 276 (Centro Cívico)',
    email: 'lucia.m@grupovision.tur.ar',
    canCreateBookings: true,
    canAssignFleet: false,
    canModifyRates: true,
    canExportReports: true
  },
  {
    id: 'st-2',
    name: 'Marcos Benítez',
    role: 'Guía Lead AAGM',
    branch: 'Operativa de Montaña',
    email: 'marcos.b@grupovision.tur.ar',
    canCreateBookings: false,
    canAssignFleet: true,
    canModifyRates: false,
    canExportReports: false
  },
  {
    id: 'st-3',
    name: 'Gonzalo Reyes',
    role: 'Jefe de Logística & Flota',
    branch: 'San Martín 398 (Casa Central)',
    email: 'logistica@grupovision.tur.ar',
    canCreateBookings: true,
    canAssignFleet: true,
    canModifyRates: true,
    canExportReports: true
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-101',
    code: 'GV-8492',
    customerName: 'Carolina & Mateo Rossi',
    customerEmail: 'carolina.rossi@gmail.com',
    customerPhone: '+54 9 11 5829-4012',
    excursionTitle: 'Camino de los 7 Lagos - San Martín de los Andes',
    date: '2026-08-25',
    guests: 2,
    totalPriceUSD: 280,
    pickupLocation: 'Hotel Llao Llao Resort & Spa',
    status: 'CONFIRMADA',
    ticketType: 'Reserva',
    priority: 'VIP',
    assignedGuide: 'Marcos Benítez (Guía AAGM)',
    assignedVehicle: 'Van Sprinter AE-829-GV',
    operatorNotes: 'Pasajeros requieren almuerzo vegetariano en San Martín.',
    createdAt: '2026-08-22 14:30',
    comments: [
      {
        id: 'c-1',
        authorName: 'Gonzalo Reyes',
        authorEmail: 'logistica@grupovision.tur.ar',
        avatar: 'GR',
        content: '@Lucía Morales por favor verificar confirmación de almuerzo vegetariano en parador.',
        createdAt: 'Hace 1 hora',
        mentions: ['lucia.m@grupovision.tur.ar']
      }
    ],
    attachments: [
      { name: 'Voucher_Confirmacion_GV8492.pdf', url: '#', size: '240 KB' }
    ]
  },
  {
    id: 'b-102',
    code: 'GV-9104',
    customerName: 'Santiago Giménez',
    customerEmail: 'santiago.g@techpatagonia.io',
    customerPhone: '+54 9 294 412-9988',
    excursionTitle: 'Refugio Roca Negra',
    date: '2026-08-24',
    guests: 4,
    totalPriceUSD: 720,
    pickupLocation: 'Alma del Lago Suites (Av. Bustillo 1.150)',
    status: 'CONFIRMADA',
    ticketType: 'VIP',
    priority: 'ALTA',
    assignedGuide: 'Lucía Morales (WFR)',
    assignedVehicle: 'Hilux 4x4 AF-302-RO',
    operatorNotes: 'Turno Nocturno con Cena Fondue.',
    createdAt: '2026-08-23 09:15',
    comments: [
      {
        id: 'c-2',
        authorName: 'Marcos Benítez',
        authorEmail: 'marcos.b@grupovision.tur.ar',
        avatar: 'MB',
        content: '@Gonzalo Reyes Hilux 4x4 equipada con raquetas y cadenas lista para el ascenso nocturno.',
        createdAt: 'Hace 45 min',
        mentions: ['logistica@grupovision.tur.ar']
      }
    ],
    attachments: [
      { name: 'Hoja_Ruta_RocaNegra.pdf', url: '#', size: '180 KB' }
    ]
  },
  {
    id: 'b-103',
    code: 'GV-7721',
    customerName: 'Dr. Alejandro Fernández',
    customerEmail: 'a.fernandez@medisur.org',
    customerPhone: '+54 9 351 690-1122',
    excursionTitle: 'Cerro Tronador y Glaciares',
    date: '2026-08-26',
    guests: 3,
    totalPriceUSD: 360,
    pickupLocation: 'Hotel Panamericano Bariloche',
    status: 'COTIZACION',
    ticketType: 'Consulta',
    priority: 'NORMAL',
    assignedGuide: 'Pendiente de asignación',
    assignedVehicle: 'Minibus Iveco Daily',
    operatorNotes: 'Cotización enviada con opción de almuerzo en Pampa Linda.',
    createdAt: '2026-08-23 11:40',
    comments: [],
    attachments: []
  },
  {
    id: 'b-104',
    code: 'GV-6602',
    customerName: 'Valeria & Tomás Larrea',
    customerEmail: 'valeria.larrea@outlook.com',
    customerPhone: '+54 9 11 4091-8833',
    excursionTitle: 'Cabalgata " La Fragua "',
    date: '2026-08-27',
    guests: 2,
    totalPriceUSD: 320,
    pickupLocation: 'Design Suites Bariloche',
    status: 'BACKLOG',
    ticketType: 'Logística',
    priority: 'NORMAL',
    assignedGuide: 'Don Celso (Capataz)',
    assignedVehicle: 'Van H1 Hyundai',
    operatorNotes: 'Consulta recibida por formulario web. Contactar por WPP.',
    createdAt: '2026-08-23 15:20',
    comments: [],
    attachments: []
  }
];

const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    recipientEmail: 'lucia.m@grupovision.tur.ar',
    senderName: 'Gonzalo Reyes',
    ticketCode: 'GV-8492',
    ticketId: 'b-101',
    message: 'te mencionó en el ticket GV-8492: "@Lucía Morales por favor verificar confirmación de almuerzo vegetariano"',
    createdAt: 'Hace 1 hora',
    isRead: false
  },
  {
    id: 'notif-2',
    recipientEmail: 'lucia.m@grupovision.tur.ar',
    senderName: 'Marcos Benítez',
    ticketCode: 'GV-9104',
    ticketId: 'b-102',
    message: 'actualizó el ticket GV-9104 con unidades Hilux 4x4 para ascenso nocturno',
    createdAt: 'Hace 45 min',
    isRead: false
  }
];

export default function App() {
  // Navigation & User Auth States
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'admin-board' | 'traveler-board' | 'advisor-board'>('landing');
  const [userRole, setUserRole] = useState<'admin' | 'asesor' | 'traveler' | 'operador' | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('lucia.m@grupovision.tur.ar');
  const [adminTab, setAdminTab] = useState<'kanban' | 'staff' | 'promos' | 'analytics'>('kanban');

  // Dynamic Data States (Real-time Global Sync)
  const [excursionsList, setExcursionsList] = useState<Excursion[]>(EXCURSIONS_DATA);
  const [travelersList, setTravelersList] = useState<TravelerUser[]>(INITIAL_TRAVELERS);
  const [activityLogs, setActivityLogs] = useState<SystemActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  // Landing & Catalog States
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const [activeExcursion, setActiveExcursion] = useState<Excursion | null>(null);
  const [isExcursionModalOpen, setIsExcursionModalOpen] = useState(false);
  const [isBannerCollapsed, setIsBannerCollapsed] = useState(false);
  const [isOfficeModalOpen, setIsOfficeModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Operations & Jira Ticket States
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);
  const [selectedTicket, setSelectedTicket] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  // Notifications System States
  const [notifications, setNotifications] = useState<UserNotification[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);

  // New Booking Modal Form
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [newBookingData, setNewBookingData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    excursionTitle: excursionsList[0]?.title || 'Refugio Roca Negra',
    date: '',
    guests: 2,
    pickupLocation: '',
    notes: '',
    ticketType: 'Reserva' as const,
    priority: 'NORMAL' as const
  });

  // Filter Categories Dynamically (Hides Empty Categories with 0 Services)
  const availableCategories = useMemo(() => {
    const presentSet = new Set(excursionsList.map(e => e.category));
    const categoryOrder = ['Todas', 'Tradicional', 'Aventura', 'Navegación', 'Experiencias', 'Traslados', 'Invierno', 'Verano', 'Alquileres'];
    return categoryOrder.filter(cat => cat === 'Todas' || presentSet.has(cat as any));
  }, [excursionsList]);

  // Filtered Excursions
  const filteredExcursions = useMemo(() => {
    return excursionsList.filter(item => {
      const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.fullDetails && item.fullDetails.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [excursionsList, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredExcursions.length / itemsPerPage));
  const paginatedExcursions = useMemo(() => {
    return filteredExcursions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredExcursions, currentPage, itemsPerPage]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  // Handlers for Filtering
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Scroll listener for Modal Collapsible Header Banner
  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsBannerCollapsed(scrollTop > 50);
  };

  // Handlers for Login & Role Selection
  const handleLoginAs = (role: 'admin' | 'asesor' | 'traveler' | 'operador') => {
    setUserRole(role);
    if (role === 'admin') {
      setUserName('Lucía Morales (Admin Central)');
      setUserEmail('lucia.m@grupovision.tur.ar');
      setCurrentView('admin-board');
    } else if (role === 'asesor') {
      setUserName('Marcos Benítez (Asesor Comercial)');
      setUserEmail('marcos.b@grupovision.tur.ar');
      setCurrentView('advisor-board');
    } else if (role === 'traveler') {
      setUserName('Carolina Rossi');
      setUserEmail('carolina.rossi@gmail.com');
      setCurrentView('traveler-board');
    } else {
      setUserName('Gonzalo Reyes (Operador Mostrador)');
      setUserEmail('logistica@grupovision.tur.ar');
      setCurrentView('admin-board');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName('');
    setCurrentView('landing');
  };

  // Move Booking Status (Strict rule: ONLY admin can move backward!)
  const moveBookingStatus = (id: string, direction: 'next' | 'prev') => {
    if (direction === 'prev' && userRole !== 'admin') {
      alert('Acceso restringido: Solo el Administrador del sistema puede mover tickets hacia etapas anteriores.');
      return;
    }

    const statusOrder: Booking['status'][] = ['BACKLOG', 'COTIZACION', 'CONFIRMADA', 'COMPLETADA'];
    setBookings(prev => prev.map(b => {
      if (b.id !== id) return b;
      const currentIndex = statusOrder.indexOf(b.status);
      const nextIndex = direction === 'next' 
        ? Math.min(statusOrder.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);
      return { ...b, status: statusOrder[nextIndex] };
    }));

    if (selectedTicket && selectedTicket.id === id) {
      const currentIndex = statusOrder.indexOf(selectedTicket.status);
      const nextIndex = direction === 'next' 
        ? Math.min(statusOrder.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);
      setSelectedTicket({ ...selectedTicket, status: statusOrder[nextIndex] });
    }
  };

  // Update Ticket from Jira Modal
  const handleUpdateTicket = (updated: Booking) => {
    setBookings(prev => prev.map(b => b.id === updated.id ? updated : b));
    setSelectedTicket(updated);
  };

  // Add Notification from Mentions
  const handleAddNotification = (notifData: { recipientEmail: string; senderName: string; ticketCode: string; ticketId: string; message: string }) => {
    const newNotif: UserNotification = {
      id: `n-${Date.now().toString().slice(-4)}`,
      recipientEmail: notifData.recipientEmail,
      senderName: notifData.senderName,
      ticketCode: notifData.ticketCode,
      ticketId: notifData.ticketId,
      message: notifData.message,
      createdAt: 'Justo ahora',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Select ticket from notification
  const handleSelectTicketFromNotification = (ticketId: string) => {
    const found = bookings.find(b => b.id === ticketId);
    if (found) {
      setSelectedTicket(found);
    }
  };

  // Update Permission for Staff
  const togglePermission = (staffId: string, permKey: keyof StaffMember) => {
    setStaffList(prev => prev.map(s => {
      if (s.id !== staffId) return s;
      return { ...s, [permKey]: !s[permKey] };
    }));
  };

  // Handlers for Dynamic Promo & Excursion Rate Changes (Real-time Global Impact)
  const handleUpdateExcursionPromo = (id: string, updates: Partial<Excursion>) => {
    setExcursionsList(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    const target = excursionsList.find(e => e.id === id);
    if (target) {
      setActivityLogs(prev => [
        {
          id: `log-${Date.now().toString().slice(-4)}`,
          user: userName || 'Administrador',
          action: `Actualizó tarifa/promo de "${target.title}" (USD $${updates.priceNum ?? target.priceNum}, ${updates.discountPercent ?? target.discountPercent ?? 0}% OFF)`,
          timestamp: 'Justo ahora',
          type: 'discount'
        },
        ...prev
      ]);
    }
  };

  // Handlers for Traveler Discounts assigned by Advisor
  const handleUpdateTravelerDiscount = (travelerId: string, discountPercent: number) => {
    setTravelersList(prev => prev.map(tr => tr.id === travelerId ? { ...tr, customDiscountPercent: discountPercent } : tr));
    const target = travelersList.find(tr => tr.id === travelerId);
    if (target) {
      setActivityLogs(prev => [
        {
          id: `log-${Date.now().toString().slice(-4)}`,
          user: userName || 'Asesor Comercial',
          action: `Asignó ${discountPercent}% OFF exclusivo a la cuenta de ${target.name}`,
          timestamp: 'Justo ahora',
          type: 'discount'
        },
        ...prev
      ]);
    }
  };

  // Create Booking from Advisor Portal
  const handleCreateBookingForTraveler = (bookingData: Omit<Booking, 'id' | 'code' | 'createdAt' | 'comments' | 'attachments'>) => {
    const newB: Booking = {
      ...bookingData,
      id: `b-${Date.now().toString().slice(-4)}`,
      code: `GV-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString(),
      comments: [],
      attachments: []
    };

    setBookings(prev => [newB, ...prev]);
    setActivityLogs(prev => [
      {
        id: `log-${Date.now().toString().slice(-4)}`,
        user: userName || 'Asesor Comercial',
        action: `Emitió ticket ${newB.code} para ${newB.customerName} (${newB.excursionTitle})`,
        timestamp: 'Justo ahora',
        type: 'ticket'
      },
      ...prev
    ]);
  };

  // Request Discount / Inquiry from Traveler Portal
  const handleRequestDiscountBooking = (excursionTitle: string, note: string) => {
    const currentTraveler = travelersList.find(tr => tr.email.toLowerCase() === userEmail.toLowerCase()) || travelersList[0];
    const targetExcursion = excursionsList.find(ex => ex.title === excursionTitle) || excursionsList[0];
    const discount = currentTraveler.customDiscountPercent || 0;
    const basePrice = targetExcursion ? targetExcursion.priceNum : 120;
    const finalPrice = Math.round(basePrice * 2 * (1 - discount / 100)); // Default 2 pax estimate

    const newB: Booking = {
      id: `b-${Date.now().toString().slice(-4)}`,
      code: `GV-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: currentTraveler.name,
      customerEmail: currentTraveler.email,
      customerPhone: currentTraveler.phone,
      excursionTitle: excursionTitle,
      date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      guests: 2,
      totalPriceUSD: finalPrice,
      pickupLocation: 'A coordinar con Asesor',
      status: 'COTIZACION',
      ticketType: 'Reserva',
      priority: currentTraveler.membershipLevel === 'VIP' ? 'VIP' : 'NORMAL',
      assignedGuide: 'Asesor Asignado: Lucía Morales',
      assignedVehicle: 'Pendiente de Confirmación',
      operatorNotes: note || `Solicitud iniciada por viajero con ${discount}% OFF asignado.`,
      createdAt: new Date().toLocaleString(),
      comments: [],
      attachments: []
    };

    setBookings(prev => [newB, ...prev]);
    setActivityLogs(prev => [
      {
        id: `log-${Date.now().toString().slice(-4)}`,
        user: currentTraveler.name,
        action: `Solicitó reserva con ${discount}% OFF en "${excursionTitle}" (Ticket ${newB.code})`,
        timestamp: 'Justo ahora',
        type: 'ticket'
      },
      ...prev
    ]);

    // Send notification to staff
    handleAddNotification({
      recipientEmail: 'lucia.m@grupovision.tur.ar',
      senderName: currentTraveler.name,
      ticketCode: newB.code,
      ticketId: newB.id,
      message: `solicitó reserva de "${excursionTitle}" con beneficio ${discount}% OFF`
    });
  };

  // Add Walk-in / New Ticket
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newB: Booking = {
      id: `b-${Date.now().toString().slice(-4)}`,
      code: `GV-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newBookingData.customerName,
      customerEmail: newBookingData.customerEmail,
      customerPhone: newBookingData.customerPhone,
      excursionTitle: newBookingData.excursionTitle,
      date: newBookingData.date || new Date().toISOString().split('T')[0],
      guests: Number(newBookingData.guests),
      totalPriceUSD: Number(newBookingData.guests) * 140,
      pickupLocation: newBookingData.pickupLocation || 'Oficina Centro Cívico (Urquiza 276)',
      status: 'BACKLOG',
      ticketType: newBookingData.ticketType,
      priority: newBookingData.priority,
      assignedGuide: 'Asignación Automática',
      assignedVehicle: 'Van Receptiva Grupo Visión',
      operatorNotes: newBookingData.notes || 'Ingresado por mostrador.',
      createdAt: new Date().toLocaleString(),
      comments: [],
      attachments: []
    };

    setBookings([newB, ...bookings]);
    setIsNewBookingModalOpen(false);
    setNewBookingData({
      customerName: '', customerEmail: '', customerPhone: '',
      excursionTitle: excursionsList[0]?.title || 'Refugio Roca Negra',
      date: '', guests: 2, pickupLocation: '', notes: '',
      ticketType: 'Reserva', priority: 'NORMAL'
    });
  };

  const kanbanColumns: { key: Booking['status']; title: string; badge: string; color: string; icon: any }[] = [
    { key: 'BACKLOG', title: 'Backlog & Consultas', badge: 'bg-amber-100 text-amber-800 border-amber-300', color: 'border-amber-400', icon: Inbox },
    { key: 'COTIZACION', title: 'En Cotización / Asignación', badge: 'bg-blue-100 text-blue-800 border-blue-300', color: 'border-blue-400', icon: MessageSquare },
    { key: 'CONFIRMADA', title: 'Confirmadas & En Ruta', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', color: 'border-emerald-500', icon: Truck },
    { key: 'COMPLETADA', title: 'Completadas', badge: 'bg-slate-200 text-slate-700 border-slate-300', color: 'border-slate-400', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-[#00A896] selection:text-white font-sans">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-slate-100 border-b border-slate-200 py-2 px-4 sm:px-6 text-[11px] sm:text-xs text-slate-600 font-mono flex flex-wrap justify-between items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A896]" />
            GRUPO VISIÓN EVT · Legajo 12044
          </span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-500">
            <Award className="w-3.5 h-3.5 text-[#00A896]" />
            Operativa Receptiva en San Carlos de Bariloche
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notifications Bell */}
          {userRole && (
            <button
              onClick={() => setIsNotificationsModalOpen(true)}
              className="relative p-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#00A896] text-slate-700 flex items-center gap-1.5 transition-colors"
              title="Notificaciones & Menciones"
            >
              <Bell className="w-3.5 h-3.5 text-[#00A896]" />
              <span className="font-bold text-[11px] hidden sm:inline">Notificaciones</span>
              {unreadNotificationsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {userRole ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#00A896]/10 text-[#00A896] font-bold text-[10px] sm:text-[11px] flex items-center gap-1">
                <User className="w-3 h-3" /> {userName}
              </span>
              <button 
                onClick={handleLogout} 
                className="hover:text-red-600 font-semibold flex items-center gap-1 transition-colors text-[11px] sm:text-xs"
              >
                <LogOut className="w-3.5 h-3.5" /> Salir
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setCurrentView('login')}
              className="hover:text-[#00A896] flex items-center gap-1 font-bold transition-colors text-slate-800 text-[11px] sm:text-xs"
            >
              <Lock className="w-3.5 h-3.5 text-[#00A896]" /> Acceder
            </button>
          )}
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 h-16 sm:h-20 flex items-center shadow-sm">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setCurrentView('landing'); }} 
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#00A896] to-[#028090] flex items-center justify-center shadow-md shadow-[#00A896]/20 group-hover:scale-105 transition-transform duration-300">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900 whitespace-nowrap">
              GRUPO VISIÓN
            </span>
          </a>

          {/* Full Desktop Navigation Header */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a 
              href="#excursiones" 
              onClick={() => setCurrentView('landing')}
              className="hover:text-[#00A896] transition-colors"
            >
              Excursiones
            </a>
            <a 
              href="#corredor" 
              onClick={() => setCurrentView('landing')}
              className="hover:text-[#00A896] transition-colors"
            >
              Corredor de los Lagos
            </a>
            <a 
              href="#nosotros" 
              onClick={() => setCurrentView('landing')}
              className="hover:text-[#00A896] transition-colors"
            >
              Quiénes Somos
            </a>
            <button 
              onClick={() => setIsOfficeModalOpen(true)} 
              className="hover:text-[#00A896] transition-colors"
            >
              Sucursales
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href="https://wa.me/5492944235278?text=Hola!%20Deseo%20consultar%20por%20excursiones%20en%20Bariloche" 
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all shadow-sm shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Directo</span>
            </a>

            {userRole ? (
              <button
                onClick={() => setCurrentView(userRole === 'admin' ? 'admin-board' : userRole === 'asesor' ? 'advisor-board' : 'traveler-board')}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#00A896] hover:bg-[#028090] text-white font-bold text-[11px] sm:text-xs px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all shadow-md shadow-[#00A896]/20 shrink-0"
              >
                <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Panel {userRole === 'admin' ? 'Operativo' : userRole === 'asesor' ? 'Asesor' : 'VIP'}</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] sm:text-xs px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all shadow-md shrink-0"
              >
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A896]" />
                <span>Acceder</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shrink-0"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAV MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="transform-gpu md:hidden bg-white border-b border-slate-200 overflow-hidden px-4 py-4 sm:px-6 space-y-3 text-sm font-semibold text-slate-800 shadow-xl"
          >
            <a 
              href="#excursiones" 
              onClick={() => { setCurrentView('landing'); setIsMobileMenuOpen(false); }} 
              className="py-2.5 border-b border-slate-100 flex items-center justify-between text-slate-800 hover:text-[#00A896]"
            >
              <span>Excursiones & Servicios</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="#corredor" 
              onClick={() => { setCurrentView('landing'); setIsMobileMenuOpen(false); }} 
              className="py-2.5 border-b border-slate-100 flex items-center justify-between text-slate-800 hover:text-[#00A896]"
            >
              <span>Corredor de los Lagos</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="#nosotros" 
              onClick={() => { setCurrentView('landing'); setIsMobileMenuOpen(false); }} 
              className="py-2.5 border-b border-slate-100 flex items-center justify-between text-slate-800 hover:text-[#00A896]"
            >
              <span>Quiénes Somos</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsOfficeModalOpen(true); }} 
              className="py-2.5 border-b border-slate-100 text-left w-full text-[#00A896] flex items-center justify-between"
            >
              <span>Ver Sucursales & Horarios</span>
              <Building2 className="w-4 h-4 text-[#00A896]" />
            </button>
            <a 
              href="https://wa.me/5492944235278?text=Hola!%20Deseo%20consultar%20por%20excursiones%20en%20Bariloche" 
              target="_blank" 
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Directo Mostrador</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* VIEW 1: PUBLIC LANDING PAGE (FRESH & SUBTLE ANIMATIONS VIA TASTE SKILL) */}
      {/* ========================================================================= */}
      {currentView === 'landing' && (
        <>
          <section className="relative min-h-[calc(100dvh-5rem)] flex items-center justify-center overflow-hidden py-20 lg:py-0">
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/hero.webp" 
                alt="Bariloche y Lago Nahuel Huapi"
                className="w-full h-full object-cover scale-105 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/85 via-[#0F172A]/65 to-[#F8FAFC]" />
            </div>

            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 relative z-10 space-y-8 pt-6">
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: 'opacity, transform' }}
                className="transform-gpu max-w-3xl space-y-6"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  style={{ willChange: 'opacity, transform' }}
                  className="transform-gpu inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-mono text-slate-200 shadow-md"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#00A896]" />
                  <span>BARILOCHE · CORREDOR DE LOS LAGOS · CHILE</span>
                </motion.div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white drop-shadow-md">
                  Descubrí Bariloche con <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00A896]">Grupo Visión</span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-100 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
                  Más de 30 años organizando excursiones tradicionales, navegaciones por el Nahuel Huapi, trekking y traslados privados.
                </p>

                <div className="pt-2">
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="p-2.5 rounded-2xl bg-white/95 backdrop-blur-xl max-w-2xl border border-slate-200 shadow-2xl flex flex-col sm:flex-row items-center gap-3 transition-shadow"
                  >
                    <div className="flex items-center gap-3 w-full px-3 py-1">
                      <Search className="w-5 h-5 text-[#00A896] shrink-0" />
                      <input 
                        type="text" 
                        placeholder="¿Qué excursión buscás? (Ej: 7 Lagos, Tronador, Raquetas)..."
                        value={searchQuery}
                        onChange={e => handleSearchChange(e.target.value)}
                        className="w-full bg-transparent border-none text-slate-900 text-sm font-medium focus:outline-none placeholder-slate-400"
                      />
                    </div>
                    
                    <a 
                      href="#excursiones"
                      className="w-full sm:w-auto bg-[#00A896] hover:bg-[#028090] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shrink-0 flex items-center justify-center gap-2 shadow-md shadow-[#00A896]/30 hover:scale-[1.02] active:scale-95"
                    >
                      <span>Buscar</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Feature Cards Grid */}
              <div className="pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                {[
                  { icon: Award, label: 'TRAYECTORIA', title: '30+ Años Receptivo' },
                  { icon: ShieldCheck, label: 'LEGAJO OFICIAL', title: 'EVT N° 12044' },
                  { icon: Car, label: 'FLOTA PROPIA', title: 'Vans & Minibuses' },
                  { icon: Building2, label: 'OFICINAS', title: 'Centro Cívico & Central' }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
                    style={{ willChange: 'opacity, transform' }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="transform-gpu p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center gap-3 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 border border-[#00A896]/20 flex items-center justify-center text-[#00A896] font-bold shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">{item.label}</span>
                      <span className="text-slate-900 font-bold text-sm">{item.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* EXCURSIONS CATALOG */}
          <section id="excursiones" className="py-24 max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="text-[#00A896] text-xs font-mono font-bold uppercase tracking-widest block mb-2">CATÁLOGO COMPLETO ({filteredExcursions.length} SERVICIOS)</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Excursiones & Servicios Receptivos</h2>
              </div>

              {/* Dynamic Category Tabs (Only Shows Categories with at least 1 Item) */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-semibold">
                {availableCategories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl transition-all ${
                      selectedCategory === cat ? 'bg-[#00A896] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Info Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-6 px-1">
              <span>
                Mostrando <strong className="text-slate-900">{filteredExcursions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> a <strong className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredExcursions.length)}</strong> de <strong className="text-slate-900">{filteredExcursions.length}</strong> excursiones
              </span>
              <span>Página {currentPage} de {totalPages}</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch max-w-7xl mx-auto">
              {paginatedExcursions.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'opacity, transform' }}
                  whileHover={{ y: -6 }}
                  onClick={() => { setActiveExcursion(item); setIsExcursionModalOpen(true); }}
                  className="transform-gpu group cursor-pointer rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:shadow-[#00A896]/15 hover:border-[#00A896]/50 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="relative h-60 w-full overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-mono font-bold shadow-md">{item.category}</span>
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono shadow-md">{item.duration}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00A896] transition-colors leading-snug mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-100">
                      {item.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[11px] font-mono text-slate-400">Tarifa USD {item.priceNum}</span>
                      <button className="inline-flex items-center gap-1.5 bg-[#00A896] hover:bg-[#028090] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-[#00A896]/20">
                        <span>Ver Detalle</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
                <button
                  disabled={currentPage === 1}
                  onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold flex items-center gap-1 shadow-sm transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => { setCurrentPage(page); }}
                    className={`w-10 h-10 rounded-xl font-bold transition-all ${
                      currentPage === page
                        ? 'bg-[#00A896] text-white shadow-md shadow-[#00A896]/20 scale-105'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => { setCurrentPage(prev => Math.min(totalPages, prev + 1)); }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold flex items-center gap-1 shadow-sm transition-all"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* NEW BLOCK 1: QUIÉNES SOMOS & BENTO GRID DE TRAYECTORIA RECEPTIVA */}
          {/* ========================================================================= */}
          <section id="nosotros" className="py-24 text-white border-t border-b border-slate-800 relative overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/excursiones/camino-de-los-7-lagos-san-martin-de-los-andes.webp" 
                alt="Fondo Quiénes Somos Grupo Visión"
                className="w-full h-full object-cover filter brightness-[0.35] contrast-125 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950/95 backdrop-blur-[2px]" />
            </div>

            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold inline-flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  QUIÉNES SOMOS · OPERADORA RECEPTIVA BARILOCHE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Más de 30 Años Guiando Expediciones en la Patagonia
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Desde nuestra fundación, Grupo Visión se ha consolidado como la agencia receptiva de referencia en San Carlos de Bariloche. Brindamos servicios integrales de transporte privado, excursiones de montaña, navegaciones lacustres y cruce de lagos.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="transform-gpu md:col-span-2 bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-cyan-500/20">
                      <Car className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Flota Propia 4x4 & Unidades Especializadas</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Contamos con una flota moderna de combis Mercedes-Benz Sprinter, minibus Iveco Daily y camionetas 4x4 preparadas con cadenas, raquetas y equipamiento para ascensos invernales a refugios de montaña.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/80 text-center font-mono">
                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-700/50">
                      <div className="text-2xl font-black text-cyan-400">15+</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Unidades 4x4</div>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-700/50">
                      <div className="text-2xl font-black text-emerald-400">100%</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Habilitación CNRT</div>
                    </div>
                    <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-700/50">
                      <div className="text-2xl font-black text-amber-400">24/7</div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Asistencia Logística</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -4 }}
                  className="transform-gpu bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-500/20">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Guías AAGM & WFR</h3>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Todos nuestros recorridos están liderados por guías profesionales matriculados por el Parque Nacional Nahuel Huapi y la Asociación Argentina de Guías de Montaña.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-2 text-xs">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Certificación Médica WFR
                    </div>
                    <p className="text-slate-400 text-[11px]">Primeros auxilios en áreas remotas y comunicación VHF de alta frecuencia.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* NEW BLOCK 2: BANNER DINÁMICO DE EXPERIENCIAS VIP & PAQUETES A MEDIDA */}
          {/* ========================================================================= */}
          <section id="corredor" className="py-20 max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-6 max-w-2xl">
                  <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    DISEÑO DE EXPEDICIONES EXCLUSIVAS
                  </span>

                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                    ¿Buscás un Paquete a Medida o Traslado Privado VIP?
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Diseñamos circuitos exclusivos por el **Corredor de los Lagos (San Martín de los Andes, Villa La Angostura, El Bolsón)** y el **Cruce Andino a Chile** adaptados al ritmo y preferencias de tu grupo.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="https://wa.me/5492944235278?text=Hola!%20Me%20interesa%20cotizar%20un%20paquete%20a%20medida%20con%20Grupo%20Vision"
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-black rounded-2xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      Cotizar por WhatsApp con Mostrador
                    </a>

                    <button
                      onClick={() => setIsOfficeModalOpen(true)}
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs transition-all border border-white/20"
                    >
                      Visitar Sucursal Urquiza 276
                    </button>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl space-y-4 max-w-sm w-full text-center shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mx-auto">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white">Atención Presencial en Centro Cívico</h3>
                  <p className="text-xs text-slate-300">
                    Nuestra oficina en **Urquiza 276** se encuentra abierta todos los días de 08:30 a 20:30 hs para asesorarte en persona.
                  </p>
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold block">San Carlos de Bariloche</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: LOGIN VIEW */}
      {/* ========================================================================= */}
      {currentView === 'login' && (
        <section className="py-20 flex-1 flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full rounded-3xl bg-white border border-slate-200 shadow-2xl p-8 space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#00A896]/10 border border-[#00A896]/30 flex items-center justify-center text-[#00A896] mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Acceso al Sistema Receptivo</h2>
              <p className="text-slate-500 text-xs font-mono">GRUPO VISIÓN · PERFILES DE INGRESO</p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono font-bold text-slate-400 block uppercase tracking-wider">Seleccionar Perfil de Acceso:</span>

              <button
                onClick={() => handleLoginAs('admin')}
                className="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-left transition-all shadow-md flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-400" /> Rol Administrador General
                  </div>
                  <span className="text-slate-400 text-xs">Acceso total, kanban, tarifas/promos, analíticas y reportes CSV</span>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLoginAs('asesor')}
                className="w-full p-4 rounded-2xl bg-cyan-950 hover:bg-cyan-900 text-white text-left transition-all shadow-md border border-cyan-800 flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-2 text-cyan-300">
                    <UserCheck className="w-4 h-4 text-cyan-400" /> Rol Asesor Comercial
                  </div>
                  <span className="text-slate-300 text-xs">Directorio de viajeros, emisión de tickets y % de descuento discrecional</span>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLoginAs('traveler')}
                className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 text-left transition-all shadow-sm flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-600" /> Rol Viajero VIP
                  </div>
                  <span className="text-slate-500 text-xs">Vouchers descargables, itinerarios, ofertas y soporte con asesor</span>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLoginAs('operador')}
                className="w-full p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-left transition-all border border-slate-200 flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-slate-600" /> Rol Operador Mostrador / Guía
                  </div>
                  <span className="text-slate-500 text-[11px]">Gestión de avance de tickets receptivos y logística de flota</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 text-center">
              <button onClick={() => setCurrentView('landing')} className="text-xs font-mono text-slate-500 hover:text-slate-900">
                ← Volver al sitio web público
              </button>
            </div>
          </motion.div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: AGILE/SCRUM JIRA OPERATIONAL BOARD (ADMIN) */}
      {/* ========================================================================= */}
      {currentView === 'admin-board' && (
        <section className="py-8 max-w-7xl mx-auto px-6 space-y-8 flex-1 w-full">
          
          {/* Header & View Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#00A896]/10 text-[#00A896] font-mono text-xs font-bold">SISTEMA DE TICKETS RECEPTIVO</span>
                <span className="text-xs font-mono text-slate-500">Oficinas Urquiza 276 & San Martín 398</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 mt-1">Control de Pasajeros & Logística Receptiva</h1>
            </div>

            {/* Sub-tabs: Kanban vs Staff vs Promos vs Analytics */}
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-slate-200 text-xs font-bold flex gap-1 flex-wrap">
                <button
                  onClick={() => setAdminTab('kanban')}
                  className={`px-3 py-2 rounded-lg transition-all ${adminTab === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Tablero de Operaciones
                </button>
                <button
                  onClick={() => setAdminTab('staff')}
                  className={`px-3 py-2 rounded-lg transition-all ${adminTab === 'staff' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Permisos & Personal
                </button>
                <button
                  onClick={() => setAdminTab('promos')}
                  className={`px-3 py-2 rounded-lg transition-all ${adminTab === 'promos' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Tarifas & Promociones
                </button>
                <button
                  onClick={() => setAdminTab('analytics')}
                  className={`px-3 py-2 rounded-lg transition-all ${adminTab === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Analítica & Reportes
                </button>
              </div>

              <button 
                onClick={() => setIsNewBookingModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#00A896] hover:bg-[#028090] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Ticket Mostrador</span>
              </button>
            </div>
          </div>

          {/* TAB 1: KANBAN BOARD */}
          {adminTab === 'kanban' && (
            <div className="space-y-6">
              
              {/* Daily Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-slate-500 text-[11px] font-mono flex items-center gap-1"><Inbox className="w-3.5 h-3.5 text-[#00A896]" /> Backlog Consultas</span>
                  <div className="text-2xl font-black text-slate-900">{bookings.filter(b => b.status === 'BACKLOG').length}</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-slate-500 text-[11px] font-mono flex items-center gap-1"><MessageSquare className="w-4 h-4 text-[#00A896]" /> En Cotización</span>
                  <div className="text-2xl font-black text-blue-600">{bookings.filter(b => b.status === 'COTIZACION').length}</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-slate-500 text-[11px] font-mono flex items-center gap-1"><Truck className="w-4 h-4 text-emerald-600" /> Confirmadas</span>
                  <div className="text-2xl font-black text-emerald-600">{bookings.filter(b => b.status === 'CONFIRMADA').length}</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-slate-500 text-[11px] font-mono flex items-center gap-1"><DollarSign className="w-4 h-4 text-[#00A896]" /> Total Cotizado</span>
                  <div className="text-2xl font-black text-[#00A896]">USD {bookings.reduce((s, b) => s + b.totalPriceUSD, 0)}</div>
                </div>
              </div>

              {/* AGILE KANBAN COLUMNS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                {kanbanColumns.map(col => {
                  const columnBookings = bookings.filter(b => b.status === col.key);
                  const ColumnIcon = col.icon;
                  return (
                    <div key={col.key} className="rounded-3xl bg-slate-100/90 border border-slate-200/90 p-4 space-y-4 min-h-[500px] flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <h3 className="font-bold text-xs text-slate-800 font-mono flex items-center gap-1.5">
                            <ColumnIcon className="w-3.5 h-3.5 text-[#00A896]" />
                            <span>{col.title}</span>
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${col.badge}`}>
                            {columnBookings.length}
                          </span>
                        </div>

                        {columnBookings.map(b => (
                          <div 
                            key={b.id} 
                            onClick={() => setSelectedTicket(b)}
                            className={`p-4 rounded-2xl bg-white border ${col.color} border-l-4 shadow-sm hover:shadow-md transition-all space-y-3 cursor-pointer group`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[#00A896] font-bold text-xs group-hover:underline">{b.code}</span>
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[9px] font-semibold">
                                  {b.ticketType || 'Reserva'}
                                </span>
                              </div>

                              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                                b.priority === 'VIP' ? 'bg-purple-100 text-purple-800' :
                                b.priority === 'ALTA' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {b.priority}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#00A896] transition-colors">{b.customerName}</h4>
                              <p className="text-slate-600 text-xs font-medium line-clamp-1">{b.excursionTitle}</p>
                              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-1">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> {b.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400" /> {b.guests} Pax</span>
                              </div>
                            </div>

                            <div className="text-[11px] font-mono bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-0.5">
                              <div className="text-slate-700 font-semibold truncate flex items-center gap-1.5">
                                <User className="w-3 h-3 text-[#00A896]" /> {b.assignedGuide}
                              </div>
                              <div className="text-slate-500 truncate flex items-center gap-1.5">
                                <Car className="w-3 h-3 text-slate-400" /> {b.assignedVehicle}
                              </div>
                            </div>

                            {/* Column Move Controls & Actions */}
                            <div 
                              onClick={e => e.stopPropagation()} 
                              className="flex items-center justify-between pt-2 border-t border-slate-100"
                            >
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => moveBookingStatus(b.id, 'prev')}
                                  disabled={col.key === 'BACKLOG'}
                                  className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center"
                                  title={userRole !== 'admin' ? 'Requiere usuario Admin para mover hacia atrás' : 'Retroceder columna'}
                                >
                                  {userRole !== 'admin' && <Lock className="w-3 h-3 text-amber-600 mr-0.5" />}
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => moveBookingStatus(b.id, 'next')}
                                  disabled={col.key === 'COMPLETADA'}
                                  className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                                  title="Avanzar columna"
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <div className="flex gap-2 items-center text-[10px] font-mono text-slate-400">
                                {b.comments?.length > 0 && (
                                  <span className="flex items-center gap-1 text-[#00A896] font-bold">
                                    <MessageSquare className="w-3 h-3" /> {b.comments.length}
                                  </span>
                                )}

                                {b.attachments?.length > 0 && (
                                  <span className="flex items-center gap-1 text-slate-500">
                                    <Paperclip className="w-3 h-3" /> {b.attachments.length}
                                  </span>
                                )}

                                <a 
                                  href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(b.customerName)},%20te%20contactamos%20de%20Grupo%20Visión%20Bariloche`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black p-1.5 rounded-md transition-colors"
                                  title="WhatsApp Directo"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                                </a>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: STAFF & PERMISSIONS CONTROL */}
          {adminTab === 'staff' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Control de Permisos & Personal Receptivo</h2>
                  <p className="text-slate-500 text-xs font-mono">Gestión de accesos para las sucursales Urquiza 276 y San Martín 398</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-slate-500 uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Miembro de Personal</th>
                        <th className="p-4">Rol & Sucursal</th>
                        <th className="p-4 text-center">Crear Reservas</th>
                        <th className="p-4 text-center">Asignar Flota</th>
                        <th className="p-4 text-center">Modificar Tarifas</th>
                        <th className="p-4 text-center">Exportar Reportes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {staffList.map(staff => (
                        <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-bold text-slate-900">
                            <div>{staff.name}</div>
                            <span className="text-[10px] font-mono text-slate-400 font-normal">{staff.email}</span>
                          </td>
                          <td className="p-4 text-slate-600 font-mono">
                            <div>{staff.role}</div>
                            <span className="text-[10px] text-[#00A896] block">{staff.branch}</span>
                          </td>
                          <td className="p-4 text-center">
                            <input type="checkbox" checked={staff.canCreateBookings} onChange={() => togglePermission(staff.id, 'canCreateBookings')} className="accent-[#00A896] w-4 h-4 cursor-pointer" />
                          </td>
                          <td className="p-4 text-center">
                            <input type="checkbox" checked={staff.canAssignFleet} onChange={() => togglePermission(staff.id, 'canAssignFleet')} className="accent-[#00A896] w-4 h-4 cursor-pointer" />
                          </td>
                          <td className="p-4 text-center">
                            <input type="checkbox" checked={staff.canModifyRates} onChange={() => togglePermission(staff.id, 'canModifyRates')} className="accent-[#00A896] w-4 h-4 cursor-pointer" />
                          </td>
                          <td className="p-4 text-center">
                            <input type="checkbox" checked={staff.canExportReports} onChange={() => togglePermission(staff.id, 'canExportReports')} className="accent-[#00A896] w-4 h-4 cursor-pointer" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DYNAMIC PROMOS & EXCURSIONS MANAGER */}
          {adminTab === 'promos' && (
            <AdminPromosExcursions
              excursions={excursionsList}
              onUpdateExcursionPromo={handleUpdateExcursionPromo}
            />
          )}

          {/* TAB 4: ANALYTICS & REPORTS */}
          {adminTab === 'analytics' && (
            <AdminAnalyticsReports
              bookings={bookings}
              travelers={travelersList}
              activityLogs={activityLogs}
            />
          )}

        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: ADVISOR DASHBOARD (ROL ASESOR) */}
      {/* ========================================================================= */}
      {currentView === 'advisor-board' && (
        <section className="py-8 flex-1 w-full">
          <AdvisorDashboard
            travelers={travelersList}
            bookings={bookings}
            excursions={excursionsList}
            onUpdateTravelerDiscount={handleUpdateTravelerDiscount}
            onCreateBookingForTraveler={handleCreateBookingForTraveler}
            onOpenTicketDetails={(b) => setSelectedTicket(b)}
          />
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW 5: TRAVELER DASHBOARD (ROL VIAJERO) */}
      {/* ========================================================================= */}
      {currentView === 'traveler-board' && (
        <section className="py-8 flex-1 w-full">
          <TravelerDashboard
            currentUser={travelersList.find(t => t.email.toLowerCase() === userEmail.toLowerCase()) || travelersList[0]}
            bookings={bookings}
            excursions={excursionsList}
            onRequestDiscountBooking={handleRequestDiscountBooking}
            onOpenTicketDetails={(b) => setSelectedTicket(b)}
          />
        </section>
      )}

      {/* ========================================================================= */}
      {/* JIRA TICKET MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedTicket && (
          <JiraTicketModal
            ticket={selectedTicket}
            userRole={userRole}
            staffList={staffList}
            onClose={() => setSelectedTicket(null)}
            onUpdateTicket={handleUpdateTicket}
            onMoveStatus={moveBookingStatus}
            onAddNotification={handleAddNotification}
          />
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* NOTIFICATIONS MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isNotificationsModalOpen && (
          <NotificationsModal
            isOpen={isNotificationsModalOpen}
            notifications={notifications}
            onClose={() => setIsNotificationsModalOpen(false)}
            onSelectNotification={handleSelectTicketFromNotification}
            onMarkAllAsRead={handleMarkAllNotificationsRead}
          />
        )}
      </AnimatePresence>

      {/* EXCURSION DETAILS MODAL */}
      <AnimatePresence>
        {isExcursionModalOpen && activeExcursion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[88vh]"
            >
              {/* Dynamic Collapsible Image Header Banner */}
              <div 
                className={`relative w-full overflow-hidden shrink-0 transition-all duration-300 ease-in-out ${
                  isBannerCollapsed ? 'h-24 sm:h-28' : 'h-64 sm:h-72'
                }`}
              >
                <img 
                  src={activeExcursion.image} 
                  alt={activeExcursion.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
                
                {/* Close Button */}
                <button 
                  onClick={() => { setIsExcursionModalOpen(false); setIsBannerCollapsed(false); }}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full border border-slate-200 backdrop-blur-md shadow-md z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Collapsible Banner Title & Badges */}
                <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#00A896] text-white text-xs font-mono font-bold shadow-md">
                      {activeExcursion.category}
                    </span>
                    {isBannerCollapsed && (
                      <span className="text-white font-bold text-sm truncate max-w-xs drop-shadow-md">
                        {activeExcursion.title}
                      </span>
                    )}
                  </div>
                  
                  <span className="px-3 py-1 rounded-full bg-slate-950/85 text-white text-xs font-mono shadow-md border border-slate-700 shrink-0">
                    Duración: {activeExcursion.duration}
                  </span>
                </div>
              </div>

              {/* Scrollable Modal Content with Scroll Listener for Banner Collapse */}
              <div 
                onScroll={handleModalScroll}
                className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-2">
                    {activeExcursion.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {activeExcursion.fullDetails}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">TEMPORADA</span>
                    <span className="font-bold text-slate-900">{activeExcursion.season}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">SALIDA</span>
                    <span className="font-bold text-slate-900">{activeExcursion.departureTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">TARIFA ESTIMADA</span>
                    <span className="font-bold text-[#00A896]">USD {activeExcursion.priceNum} / pax</span>
                  </div>
                </div>

                {activeExcursion.highlights && activeExcursion.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A896]">Puntos Destacados del Recorrido:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                      {activeExcursion.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#00A896] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  {activeExcursion.includes && activeExcursion.includes.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">Incluido:</h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {activeExcursion.includes.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeExcursion.notIncludes && activeExcursion.notIncludes.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700">No Incluido:</h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {activeExcursion.notIncludes.map((ninc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{ninc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {activeExcursion.additionalInfo && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                    <span className="font-mono font-bold text-amber-800 uppercase text-[11px] block">Información Adicional & Recomendaciones</span>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">{activeExcursion.additionalInfo}</p>
                  </div>
                )}

                {activeExcursion.faq && activeExcursion.faq.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Preguntas Frecuentes:</h4>
                    <div className="space-y-2">
                      {activeExcursion.faq.map((f, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                          <span className="font-bold text-slate-900 block">{f.question}</span>
                          <p className="text-slate-600 leading-relaxed">{f.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/5492944235278?text=Hola!%20Quisiera%20consultar%20y%20reservar%20la%20excursion:%20${encodeURIComponent(activeExcursion.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-xs transition-all shadow-md shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Reservar por WhatsApp Directo</span>
                  </motion.a>

                  <button 
                    onClick={() => { setIsExcursionModalOpen(false); setIsBannerCollapsed(false); }}
                    className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NEW TICKET MODAL */}
      <AnimatePresence>
        {isNewBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsNewBookingModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 border border-[#00A896]/30 flex items-center justify-center text-[#00A896]">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Ingresar Nuevo Ticket Receptivo</h3>
                  <span className="text-xs font-mono text-slate-500">Oficina Urquiza 276</span>
                </div>
              </div>

              <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
                <div>
                  <label className="block font-mono text-slate-600 mb-1">Nombre del Titular</label>
                  <input 
                    type="text" required
                    placeholder="Ej: Laura Méndez"
                    value={newBookingData.customerName}
                    onChange={e => setNewBookingData({...newBookingData, customerName: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-slate-600 mb-1">Teléfono / WPP</label>
                    <input 
                      type="text" required
                      placeholder="+54 9..."
                      value={newBookingData.customerPhone}
                      onChange={e => setNewBookingData({...newBookingData, customerPhone: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896]"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-slate-600 mb-1">Cantidad de Pax</label>
                    <input 
                      type="number" min="1" max="20" required
                      value={newBookingData.guests}
                      onChange={e => setNewBookingData({...newBookingData, guests: Number(e.target.value)})}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-slate-600 mb-1">Tipo de Ticket</label>
                    <select
                      value={newBookingData.ticketType}
                      onChange={e => setNewBookingData({...newBookingData, ticketType: e.target.value as any})}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896]"
                    >
                      <option value="Reserva">Reserva Receptiva</option>
                      <option value="Incidencia">Incidencia / Reclamo</option>
                      <option value="Consulta">Consulta Comercial</option>
                      <option value="Logística">Logística & Flota</option>
                      <option value="VIP">Atención VIP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-slate-600 mb-1">Prioridad</label>
                    <select
                      value={newBookingData.priority}
                      onChange={e => setNewBookingData({...newBookingData, priority: e.target.value as any})}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896]"
                    >
                      <option value="NORMAL">NORMAL</option>
                      <option value="ALTA">ALTA</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-slate-600 mb-1">Excursión Seleccionada</label>
                  <select 
                    value={newBookingData.excursionTitle}
                    onChange={e => setNewBookingData({...newBookingData, excursionTitle: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896]"
                  >
                    {excursionsList.map((e: Excursion) => (
                      <option key={e.id} value={e.title}>{e.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-slate-600 mb-1">Lugar de Pick-Up / Hotel</label>
                  <input 
                    type="text"
                    placeholder="Ej: Hotel Panamericano Bariloche"
                    value={newBookingData.pickupLocation}
                    onChange={e => setNewBookingData({...newBookingData, pickupLocation: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#00A896] hover:bg-[#028090] text-white font-bold py-3 rounded-xl shadow-md transition-all text-xs"
                >
                  Confirmar e Ingresar Ticket
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OFFICES MODAL */}
      <AnimatePresence>
        {isOfficeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative p-6 sm:p-8 space-y-6"
            >
              <button 
                onClick={() => setIsOfficeModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 border border-[#00A896]/20 flex items-center justify-center text-[#00A896]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Sucursales Céntricas</h3>
                  <span className="text-xs font-mono text-slate-500">San Carlos de Bariloche, Argentina</span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>Sucursal Centro Cívico</span>
                    <span className="text-[#00A896] text-[10px] font-mono font-bold">Urquiza 276</span>
                  </div>
                  <p className="text-slate-600">A metros del Centro Cívico. Venta presencial de excursiones, traslados e información turística.</p>
                  <div className="text-[11px] font-mono text-slate-800 font-semibold pt-1">Horario: Lunes a Domingos 08:30 a 20:30 hs</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                    <span>Casa Central</span>
                    <span className="text-[#00A896] text-[10px] font-mono font-bold">San Martín 398</span>
                  </div>
                  <p className="text-slate-600">Oficinas corporativas y administrativas. Atención a contingentes, grupos y operadores.</p>
                  <div className="text-[11px] font-mono text-slate-800 font-semibold pt-1">Horario: Lunes a Viernes 09:00 a 18:00 hs</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
