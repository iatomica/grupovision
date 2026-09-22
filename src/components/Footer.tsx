import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Car, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUpRight, 
  Compass,
  MessageCircle
} from 'lucide-react';

interface FooterProps {
  onNavigateToSection?: (sectionId: string) => void;
  onOpenOfficesModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onOpenOfficesModal
}) => {
  const trustFeatures = [
    { 
      icon: Award, 
      label: 'TRAYECTORIA', 
      title: '30+ Años Receptivo',
      desc: 'Líderes en turismo receptivo y corporativo en Bariloche'
    },
    { 
      icon: ShieldCheck, 
      label: 'LEGAJO OFICIAL', 
      title: 'EVT N° 12044',
      desc: 'Empresa habilitada por el Ministerio de Turismo de la Nación'
    },
    { 
      icon: Car, 
      label: 'FLOTA PROPIA', 
      title: 'Vans & Minibuses',
      desc: 'Unidades modernas equipadas para cordillera y nieve'
    },
    { 
      icon: Building2, 
      label: 'OFICINAS', 
      title: 'Centro Cívico & Urquiza 276',
      desc: 'Atención personalizada todos los días de 08:30 a 20:30 hs'
    }
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* ========================================================================= */}
        {/* TOP BLOCK: 4 TRUST CARDS (TRAYECTORIA, LEGAJO, FLOTA, OFICINAS) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustFeatures.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-lg flex flex-col justify-between gap-4 hover:border-[#00A896]/40 hover:bg-slate-900 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#00A896]/10 border border-[#00A896]/20 flex items-center justify-center text-[#00A896] group-hover:scale-105 transition-transform shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider font-bold text-cyan-400 block">{item.label}</span>
                  <h4 className="text-white font-extrabold text-sm">{item.title}</h4>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* MAIN FOOTER NAVIGATION & INFORMATION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-8 border-t border-slate-800/80">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00A896] flex items-center justify-center text-white shadow-md shadow-[#00A896]/30 font-black">
                GV
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                GRUPO VISIÓN
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Operador receptivo en San Carlos de Bariloche y la Patagonia Argentina. Excursiones tradicionales, aventuras de montaña, navegaciones lacustres y traslados privados corporativos.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A896]" />
                <span>Legajo Oficial EVT N° 12044</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">Enlaces Rápidos</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a 
                  href="#excursiones"
                  onClick={() => onNavigateToSection && onNavigateToSection('excursiones')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Catálogo de Excursiones</span>
                </a>
              </li>
              <li>
                <a 
                  href="#corredor"
                  onClick={() => onNavigateToSection && onNavigateToSection('corredor')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Corredor de los Lagos & Chile</span>
                </a>
              </li>
              <li>
                <a 
                  href="#nosotros"
                  onClick={() => onNavigateToSection && onNavigateToSection('nosotros')}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Quiénes Somos</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onOpenOfficesModal && onOpenOfficesModal()}
                  className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Sucursal y Puntos de Atención</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Office & Schedules */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">Atención Presencial</h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">Oficina Central Bariloche</span>
                  <a 
                    href="https://maps.google.com/?q=Urquiza+276,+San+Carlos+de+Bariloche" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-cyan-300 underline inline-flex items-center gap-1"
                  >
                    <span>Urquiza 276, Centro</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">Horarios de Mostrador</span>
                  <span>Lunes a Domingos: 08:30 a 20:30 hs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">Contacto & Asistencia</h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a 
                  href="https://wa.me/5492944235278?text=Hola!%20Deseo%20consultar%20por%20excursiones%20en%20Bariloche"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-300 font-bold text-white"
                >
                  +54 9 294 423-5278
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a 
                  href="mailto:info@grupovision.tur.ar"
                  className="hover:text-cyan-300"
                >
                  info@grupovision.tur.ar
                </a>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
                Asistencia operativa 24/7 para pasajeros con reservas activas y coordinación de flota.
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM COPYRIGHT */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Grupo Visión EVT · Legajo N° 12044 · San Carlos de Bariloche, Río Negro, Argentina.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Turismo Receptivo Habilitado</span>
            <span>·</span>
            <span>Seguridad en Cordillera</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
