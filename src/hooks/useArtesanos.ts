// src/hooks/useArtesanos.ts
import { useState, useEffect } from 'react';
import {
  obtenerArtesanos,
  obtenerArtesanoPorId,
  obtenerProductosPorArtesano,
} from '../services/artesaniaService';
import { Artesano, Producto } from '../types/index';

// Hook para la LISTA de artesanos
export function useArtesanos() {
  const [artesanos, setArtesanos] = useState<Artesano[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    let activo = true;
    (async () => {
      const datos = await obtenerArtesanos();
      if (activo) { setArtesanos(datos); setCargando(false); }
    })();
    return () => { activo = false; };
  }, []);

  return { artesanos, cargando };
}

// Hook para UN artesano + sus productos en subasta
export function useArtesano(id: number) {
  const [artesano, setArtesano] = useState<Artesano | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    let activo = true;
    (async () => {
      const [a, p] = await Promise.all([
        obtenerArtesanoPorId(id),
        obtenerProductosPorArtesano(id),
      ]);
      if (activo) { setArtesano(a); setProductos(p); setCargando(false); }
    })();
    return () => { activo = false; };
  }, [id]);

  return { artesano, productos, cargando };
}