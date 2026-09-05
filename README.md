# Grupo Visión - Turismo Bariloche

Plataforma receptiva y de gestión de excursiones para Grupo Visión en San Carlos de Bariloche.

## Características

- **Catálogo Receptivo Dinámico**: 23 excursiones con portadas WebP optimizadas y filtros por categorías activas.
- **Sistema de Tickets Operativo Receptivo**: Gestión de reservas, itinerarios, vouchers descargables y asignación de guía/flota con permisos de retroceso restringidos al usuario Administrador.
- **Rol Asesor Comercial**: Directorio de viajeros, facultades para otorgar % de descuento discrecional y cotización rápida.
- **Panel de Tarifas & Promociones Dinámicas**: Configuración de precios base USD, descuentos % globales y badges promocionales con sincronización en tiempo real.
- **Centro de Analítica & Exportación CSV**: Indicadores KPI, registro de actividad y exportación de reportes ejecutivos.
- **Docker & Coolify Ready**: Incluye `Dockerfile` y `nginx.conf` listos para el despliegue.

## Desarrollo Local

```bash
npm install
npm run dev
```

El servidor iniciará en `http://localhost:3000/`.
