// src/hooks/useProductos.ts
import { useState, useEffect } from 'react';
import { obtenerProductos, obtenerArtesanos } from '../services/artesaniaService';
import { Producto, Artesano } from '../types/index';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [artesanos, setArtesanos] = useState<Artesano[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    let activo = true; // evita actualizar estado si el componente se desmonta
    (async () => {
      const [prods, arts] = await Promise.all([obtenerProductos(), obtenerArtesanos()]);
      if (activo) {
        setProductos(prods);
        setArtesanos(arts);
        setCargando(false);
      }
    })();
    return () => { activo = false; };
  }, []);

  const getArtesano = (artesanoId: number): Artesano | undefined =>
    artesanos.find(a => a.id === artesanoId);

  return { productos, cargando, getArtesano };
}