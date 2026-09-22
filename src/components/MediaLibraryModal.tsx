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
  FolderOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem, fetchMediaLibrary, uploadMediaImage, deleteMediaImage } from '../utils/excursionsStorage';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  currentSelectedUrl?: string;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  currentSelectedUrl = ''
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

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
        if (found) setSelectedItem(found);
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
    }
  }, [isOpen]);

  // Filter items
  const filteredMedia = mediaList.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor seleccioná un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const newItem = await uploadMediaImage(file);
      setMediaList(prev => [newItem, ...prev]);
      setSelectedItem(newItem);
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
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[90vh] max-h-[750px] flex flex-col overflow-hidden text-slate-900"
        >
          {/* MODAL HEADER */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 border border-[#00A896]/20 flex items-center justify-center text-[#00A896]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 leading-tight">Biblioteca Multimedia</h3>
                <p className="text-xs text-slate-500 font-mono">SELECCIÓN Y PROCESAMIENTO WEBP OPTIMIZADO</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* TABS HEADER */}
          <div className="px-6 border-b border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0">
            <div className="flex gap-2 -mb-px">
              <button
                onClick={() => setActiveTab('library')}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'library'
                    ? 'border-[#00A896] text-[#00A896]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>Biblioteca ({mediaList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('upload')}
                className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'upload'
                    ? 'border-[#00A896] text-[#00A896]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Subir Archivos</span>
              </button>
            </div>

            {activeTab === 'library' && (
              <div className="relative w-48 sm:w-64 my-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Buscar fotos..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A896]/30 font-medium"
                />
              </div>
            )}
          </div>

          {/* MODAL BODY */}
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* TAB: UPLOAD ZONE */}
            {activeTab === 'upload' && (
              <div className="flex-1 p-8 flex flex-col items-center justify-center overflow-y-auto">
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`w-full max-w-xl border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all ${
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
                    Soporta formatos JPG, PNG y WebP. El servidor convertirá automáticamente tu archivo a <span className="font-bold text-[#00A896]">WebP ultraligero</span>, generará miniatura y descartará el original pesado.
                  </p>

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
                        <span>Procesando con Sharp a WebP...</span>
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

            {/* TAB: MEDIA LIBRARY (GRID + SIDEBAR) */}
            {activeTab === 'library' && (
              <>
                {/* GALLERY GRID */}
                <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                  {isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3 py-16">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#00A896]" />
                      <span className="text-xs font-mono">Cargando biblioteca de imágenes...</span>
                    </div>
                  ) : filteredMedia.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3 py-16 text-center">
                      <ImageIcon className="w-10 h-10 text-slate-300" />
                      <p className="text-sm font-bold text-slate-600">No se encontraron imágenes</p>
                      <button 
                        onClick={() => setActiveTab('upload')}
                        className="text-xs text-[#00A896] hover:underline font-bold"
                      >
                        Subir una nueva imagen ahora
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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

                            {/* SOURCE BADGE */}
                            <span className={`absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded-md font-bold backdrop-blur-md shadow-sm ${
                              item.source === 'upload' 
                                ? 'bg-[#00A896]/90 text-white' 
                                : 'bg-slate-900/70 text-slate-200'
                            }`}>
                              {item.source === 'upload' ? 'Subida' : 'Catálogo'}
                            </span>

                            {/* SELECTED CHECKMARK */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#00A896] text-white flex items-center justify-center shadow-lg">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}

                            {/* NAME OVERLAY ON HOVER */}
                            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent text-white text-[10px] font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity">
                              {item.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* SIDEBAR PREVIEW (WORDPRESS STYLE) */}
                <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-200 bg-slate-50/80 p-5 flex flex-col justify-between overflow-y-auto shrink-0">
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
                      <p className="text-xs font-medium">Hacé clic en una imagen para ver detalles y seleccionarla.</p>
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
                      <span>Seleccionar para esta excursión</span>
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
