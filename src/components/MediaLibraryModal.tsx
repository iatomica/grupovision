import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  Image as ImageIcon, 
  Search, 
  Check, 
  Trash2, 
  RefreshCw, 
  Sparkles, 
  AlertCircle,
  FolderOpen,
  Folder,
  FolderPlus,
  MoveRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem, fetchMediaLibrary, uploadMediaImage, deleteMediaImage } from '../utils/excursionsStorage';

export const MEDIA_FOLDERS = [
  { id: 'Todas', name: 'Todas las Fotos', isGroup: false },
  { id: 'Refugio Roca Negra', name: 'Refugio Roca Negra', isGroup: false },
  { id: 'Camino de los 7 Lagos', name: 'Camino 7 Lagos', isGroup: false },
  { id: 'Cerro Catedral', name: 'Cerro Catedral', isGroup: false },
  { id: 'Cerro Tronador & Glaciares', name: 'Tronador & Glaciares', isGroup: false },
  { id: 'Circuito Chico', name: 'Circuito Chico', isGroup: false },
  { id: 'Isla Victoria & Arrayanes', name: 'Isla Victoria & Arrayanes', isGroup: false },
  { id: 'Puerto Blest & Cántaros', name: 'Puerto Blest & Cántaros', isGroup: false },
  { id: 'San Martín de los Andes', name: 'San Martín de los Andes', isGroup: false },
  { id: 'Villa La Angostura', name: 'Villa La Angostura', isGroup: false },
  { id: 'Rafting Río Manso', name: 'Rafting Río Manso', isGroup: false },
  { id: 'Cabalgata La Fragua', name: 'Cabalgata La Fragua', isGroup: false },
  { id: 'Kayak en Lagos Morenos', name: 'Kayak en Lagos', isGroup: false },
  { id: 'Experiencias & Gastronomía', name: 'Experiencias & Gastronomía', isGroup: false },
  { id: 'Banners & Portadas', name: 'Banners & Portadas', isGroup: false },
  { id: 'Traslados & Flota', name: 'Traslados & Flota', isGroup: false },
  { id: 'General', name: 'General', isGroup: false }
];

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  currentSelectedUrl?: string;
  defaultFolder?: string;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  currentSelectedUrl = '',
  defaultFolder = 'Todas'
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>(defaultFolder);
  const [uploadFolder, setUploadFolder] = useState<string>(defaultFolder !== 'Todas' ? defaultFolder : 'General');

  // Upload states
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load media items
  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const items = await fetchMediaLibrary();
      setMediaList(items);

      // Auto-select current image if matches
      if (currentSelectedUrl) {
        const found = items.find(it => it.url === currentSelectedUrl);
        if (found) {
          setSelectedItem(found);
          if (found.folder) setSelectedFolder(found.folder);
        }
      }
    } catch (err) {
      console.error('Error loading media:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadMedia();
      setUploadError(null);
      if (defaultFolder) {
        setSelectedFolder(defaultFolder);
        setUploadFolder(defaultFolder !== 'Todas' ? defaultFolder : 'General');
      }
    }
  }, [isOpen, defaultFolder]);

  // Compute count per folder
  const folderCounts = React.useMemo(() => {
    const counts: Record<string, number> = { 'Todas': mediaList.length };
    for (const item of mediaList) {
      const f = item.folder || 'General';
      counts[f] = (counts[f] || 0) + 1;
    }
    return counts;
  }, [mediaList]);

  // Filter items by Folder + Search
  const filteredMedia = mediaList.filter(item => {
    const itemFolder = item.folder || 'General';
    const matchesFolder = selectedFolder === 'Todas' || itemFolder === selectedFolder;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q) ||
      itemFolder.toLowerCase().includes(q);
    return matchesFolder && matchesSearch;
  });

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor seleccioná un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const newItem = await uploadMediaImage(file, uploadFolder);
      setMediaList(prev => [newItem, ...prev]);
      setSelectedItem(newItem);
      setSelectedFolder(uploadFolder);
      setActiveTab('library');
    } catch (err: any) {
      setUploadError(err.message || 'Error al procesar la imagen.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDeleteItem = async (item: MediaItem) => {
    if (!confirm(`¿Eliminar la imagen "${item.name}" de la biblioteca?`)) return;
    const success = await deleteMediaImage(item.id);
    if (success) {
      setMediaList(prev => prev.filter(m => m.id !== item.id));
      if (selectedItem?.id === item.id) {
        setSelectedItem(null);
      }
    }
  };

  const handleMoveFolder = async (item: MediaItem, newFolder: string) => {
    try {
      const res = await fetch(`/api/media/${encodeURIComponent(item.id)}/folder`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: newFolder })
      });
      if (res.ok) {
        setMediaList(prev => prev.map(m => m.id === item.id ? { ...m, folder: newFolder } : m));
        if (selectedItem?.id === item.id) {
          setSelectedItem({ ...selectedItem, folder: newFolder });
        }
      }
    } catch (err) {
      console.error('Error moving image to folder:', err);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedItem) {
      onSelectImage(selectedItem.url);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-6xl h-[92vh] max-h-[820px] flex flex-col overflow-hidden text-slate-900"
        >
          {/* MODAL HEADER */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 border border-[#00A896]/20 flex items-center justify-center text-[#00A896]">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 leading-tight">Biblioteca de Medios & Carpetas</h3>
                <p className="text-xs text-slate-500 font-mono">ORGANIZACIÓN POR EXCURSIÓN · OPTIMIZACIÓN WEBP AUTOMÁTICA</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* TABS & SEARCH BAR */}
          <div className="px-6 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2.5 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('library')}
                className={`py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'library'
                    ? 'bg-[#00A896] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Explorar Galería ({filteredMedia.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('upload')}
                className={`py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  activeTab === 'upload'
                    ? 'bg-[#00A896] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Subir Fotos</span>
              </button>
            </div>

            {activeTab === 'library' && (
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre o carpeta..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A896]/30 font-medium"
                />
              </div>
            )}
          </div>

          {/* MODAL BODY */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* TAB: UPLOAD ZONE */}
            {activeTab === 'upload' && (
              <div className="flex-1 p-6 sm:p-10 flex flex-col items-center justify-center overflow-y-auto">
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`w-full max-w-xl border-2 border-dashed rounded-3xl p-8 sm:p-10 flex flex-col items-center justify-center text-center transition-all ${
                    isDragOver 
                      ? 'border-[#00A896] bg-[#00A896]/5 scale-[1.01]' 
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#00A896]/10 border border-[#00A896]/30 text-[#00A896] flex items-center justify-center mb-4 shadow-inner">
                    <UploadCloud className="w-8 h-8" />
                  </div>

                  <h4 className="text-lg font-black text-slate-900 mb-1">Arrastrá tus fotos aquí</h4>
                  <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
                    Soporta formatos JPG, PNG y WebP. El servidor convertirá automáticamente tu archivo a <span className="font-bold text-[#00A896]">WebP ultraligero</span>, generará miniatura y lo guardará en la carpeta seleccionada.
                  </p>

                  {/* SELECT TARGET FOLDER */}
                  <div className="w-full max-w-xs mb-6 text-left">
                    <label className="text-xs font-mono font-bold text-slate-700 block mb-1">
                      📁 Guardar en la Carpeta:
                    </label>
                    <select
                      value={uploadFolder}
                      onChange={(e) => setUploadFolder(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#00A896]/30"
                    >
                      {MEDIA_FOLDERS.filter(f => f.id !== 'Todas').map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>

                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  <button
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#00A896]" />
                        <span>Procesando y guardando a WebP...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-4 h-4 text-[#00A896]" />
                        <span>Seleccionar archivo local</span>
                      </>
                    )}
                  </button>

                  {uploadError && (
                    <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: MEDIA LIBRARY (SIDEBAR FOLDERS + GRID + DETAIL PANEL) */}
            {activeTab === 'library' && (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                
                {/* 1. LEFT FOLDERS NAVIGATION */}
                <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/70 p-3 overflow-y-auto shrink-0 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 block">
                    Carpetas ({MEDIA_FOLDERS.length - 1})
                  </span>

                  {MEDIA_FOLDERS.map((folder) => {
                    const isActive = selectedFolder === folder.id;
                    const count = folderCounts[folder.id] || 0;

                    return (
                      <button
                        key={folder.id}
                        onClick={() => setSelectedFolder(folder.id)}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-[#00A896] text-white shadow-sm font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Folder className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span className="truncate">{folder.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* 2. CENTER GALLERY GRID */}
                <div className="flex-1 p-4 sm:p-5 overflow-y-auto bg-white flex flex-col justify-between">
                  <div>
                    {/* Active Folder Header Banner */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-[#00A896]" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                          {selectedFolder === 'Todas' ? 'Todas las Fotografías' : `Carpeta: ${selectedFolder}`}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {filteredMedia.length} archivos
                      </span>
                    </div>

                    {isLoading ? (
                      <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-3 py-16">
                        <RefreshCw className="w-6 h-6 animate-spin text-[#00A896]" />
                        <span className="text-xs font-mono">Cargando biblioteca de imágenes...</span>
                      </div>
                    ) : filteredMedia.length === 0 ? (
                      <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-3 py-16 text-center">
                        <ImageIcon className="w-10 h-10 text-slate-300" />
                        <p className="text-sm font-bold text-slate-600">No hay fotos en esta carpeta</p>
                        <button 
                          onClick={() => {
                            setUploadFolder(selectedFolder !== 'Todas' ? selectedFolder : 'General');
                            setActiveTab('upload');
                          }}
                          className="text-xs text-[#00A896] hover:underline font-bold"
                        >
                          Subir fotos directamente a "{selectedFolder !== 'Todas' ? selectedFolder : 'General'}"
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {filteredMedia.map(item => {
                          const isSelected = selectedItem?.id === item.id;
                          return (
                            <div 
                              key={item.id}
                              onClick={() => setSelectedItem(item)}
                              className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all bg-slate-100 ${
                                isSelected 
                                  ? 'border-[#00A896] ring-4 ring-[#00A896]/20 shadow-md scale-[1.02]' 
                                  : 'border-transparent hover:border-slate-300 hover:shadow-sm'
                              }`}
                            >
                              <img 
                                src={item.thumbUrl || item.url} 
                                alt={item.name} 
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />

                              {/* FOLDER BADGE OVERLAY */}
                              <span className="absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded-md font-bold backdrop-blur-md shadow-sm bg-slate-950/75 text-white max-w-[80%] truncate">
                                📁 {item.folder || 'General'}
                              </span>

                              {/* SELECTED CHECKMARK */}
                              {isSelected && (
                                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#00A896] text-white flex items-center justify-center shadow-lg">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              )}

                              {/* NAME OVERLAY ON HOVER */}
                              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent text-white text-[10px] font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. RIGHT SIDEBAR DETAILS (WORDPRESS STYLE) */}
                <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-slate-200 bg-slate-50/90 p-5 flex flex-col justify-between overflow-y-auto shrink-0">
                  {selectedItem ? (
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Detalles del Archivo</span>

                      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[16/10] bg-slate-900 relative">
                        <img 
                          src={selectedItem.url} 
                          alt={selectedItem.name} 
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 right-2 bg-slate-900/80 text-cyan-300 font-mono text-[10px] px-2 py-0.5 rounded backdrop-blur-md font-bold">
                          WebP
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="font-bold text-slate-800 break-all leading-tight">
                          {selectedItem.name}
                        </div>

                        {/* FOLDER MOVER */}
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                            📁 Carpeta Asignada:
                          </span>
                          <select
                            value={selectedItem.folder || 'General'}
                            onChange={(e) => handleMoveFolder(selectedItem, e.target.value)}
                            className="w-full px-2 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A896]/30"
                          >
                            {MEDIA_FOLDERS.filter(f => f.id !== 'Todas').map(f => (
                              <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex justify-between text-slate-500 font-mono text-[11px] pt-1 border-t border-slate-200">
                          <span>Peso:</span>
                          <span className="font-bold text-slate-700">
                            {selectedItem.sizeBytes ? `${Math.round(selectedItem.sizeBytes / 1024)} KB` : 'Optimizado'}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-mono text-[11px]">
                          <span>Tipo:</span>
                          <span className="text-[#00A896] font-bold">image/webp</span>
                        </div>
                        <div className="flex justify-between text-slate-500 font-mono text-[11px]">
                          <span>Origen:</span>
                          <span className="capitalize">{selectedItem.source === 'upload' ? 'Subido' : 'Catálogo Base'}</span>
                        </div>
                      </div>

                      {selectedItem.source === 'upload' && (
                        <div className="pt-2">
                          <button
                            onClick={() => handleDeleteItem(selectedItem)}
                            className="w-full py-2 px-3 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar de la biblioteca</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
                      <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-xs font-medium">Hacé clic en una imagen para ver detalles, mover de carpeta o seleccionarla.</p>
                    </div>
                  )}

                  {/* ACTION BUTTON */}
                  <div className="pt-4 border-t border-slate-200 shrink-0">
                    <button
                      disabled={!selectedItem}
                      onClick={handleConfirmSelection}
                      className="w-full py-3 px-4 rounded-xl bg-[#00A896] hover:bg-[#028090] text-white font-bold text-xs transition-all shadow-md shadow-[#00A896]/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <Check className="w-4 h-4" />
                      <span>Seleccionar Foto</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
