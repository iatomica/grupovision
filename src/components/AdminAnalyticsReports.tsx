import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Ticket, 
  FileText, 
  Download, 
  Clock, 
  Activity, 
  CheckCircle, 
  Sparkles, 
  BarChart2, 
  ArrowUpRight,
  ShieldAlert,
  Calendar,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Booking } from './JiraTicketModal';
import { TravelerUser } from '../data/usersData';

interface SystemActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'ticket' | 'discount' | 'auth' | 'system';
}

interface AdminAnalyticsReportsProps {
  bookings: Booking[];
  travelers: TravelerUser[];
  activityLogs: SystemActivityLog[];
}

export const AdminAnalyticsReports: React.FC<AdminAnalyticsReportsProps> = ({
  bookings,
  travelers,
  activityLogs
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Financial & Operational Metrics calculations
  const totalRevenueUSD = bookings.reduce((sum, b) => sum + b.totalPriceUSD, 0);
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMADA' || b.status === 'COMPLETADA');
  const vipTravelersCount = travelers.filter(t => t.membershipLevel === 'VIP' || t.membershipLevel === 'Gold').length;
  const conversionRate = Math.round((confirmedBookings.length / Math.max(1, bookings.length)) * 100);

  const handleExportCSVReport = () => {
    // Generate Executive CSV Content
    let csvContent = 'ID,Codigo,Pasajero,Email,Excursion,Fecha,Pasajeros,Total_USD,Estado,Prioridad\n';
    bookings.forEach(b => {
      csvContent += `"${b.id}","${b.code}","${b.customerName}","${b.customerEmail}","${b.excursionTitle}","${b.date}",${b.guests},${b.totalPriceUSD},"${b.status}","${b.priority}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Reporte_Ejecutivo_TurismoBariloche_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Analítica & Reportes de Inteligencia
            </span>
            <span className="text-xs text-slate-400">Consola Ejecutiva</span>
          </div>
          <h2 className="text-2xl font-bold">Resumen de Actividad & Extracción de Datos</h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            Supervisa el rendimiento comercial, el flujo operativo del sistema y exporta reportes de ventas y operaciones.
          </p>
        </div>

        <button
          onClick={handleExportCSVReport}
          className="px-5 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-cyan-600/20 flex items-center gap-2 transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          Exportar Reporte Ejecutivo (CSV)
        </button>
      </div>

      {/* Success Notification */}
      {downloadSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 px-5 py-3 rounded-2xl flex items-center gap-3 text-sm"
        >
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span>Reporte CSV generado y descargado correctamente.</span>
        </motion.div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Facturación Total</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">${totalRevenueUSD.toLocaleString()} USD</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs mes anterior
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Reservas & Tickets</span>
            <Ticket className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{bookings.length} Tickets</div>
          <div className="text-xs text-cyan-600 font-semibold">
            {confirmedBookings.length} Confirmadas / Completadas
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Viajeros VIP & Gold</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{vipTravelersCount} Socios</div>
          <div className="text-xs text-purple-600 font-semibold">
            {travelers.length} Viajeros Totales
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Tasa de Conversión</span>
            <BarChart2 className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{conversionRate}%</div>
          <div className="text-xs text-amber-600 font-semibold">
            Cotizaciones convertidas
          </div>
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-600" />
            Registro de Actividad del Sistema (Activity Log)
          </h3>
          <span className="text-xs text-slate-400">Eventos en tiempo real</span>
        </div>

        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${
                  log.type === 'ticket' ? 'bg-cyan-500' :
                  log.type === 'discount' ? 'bg-emerald-500' :
                  log.type === 'auth' ? 'bg-purple-500' : 'bg-slate-400'
                }`} />
                <span className="font-bold text-slate-900">{log.user}</span>
                <span className="text-slate-600">{log.action}</span>
              </div>
              <span className="text-slate-400 font-mono">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
