// src/services/artesaniaService.ts
import { getDatabase } from '../database/db';
import { Artesano, Producto } from '../types/index';

// ── Artesanos ──────────────────────────────────────────────────────────
export async function obtenerArtesanos(): Promise<Artesano[]> {
  const db = await getDatabase();
  return db.getAllAsync<Artesano>('SELECT * FROM artesanos ORDER BY nombre');
}

// NUEVO (Parte 2): un artesano por su id
export async function obtenerArtesanoPorId(id: number): Promise<Artesano | null> {
  const db = await getDatabase();
  return db.getFirstAsync<Artesano>('SELECT * FROM artesanos WHERE id = ?', id);
}

// ── Productos ──────────────────────────────────────────────────────────
export async function obtenerProductos(): Promise<Producto[]> {
  const db = await getDatabase();
  return db.getAllAsync<Producto>('SELECT * FROM productos');
}

// NUEVO (Parte 2): los productos de un artesano
export async function obtenerProductosPorArtesano(artesanoId: number): Promise<Producto[]> {
  const db = await getDatabase();
  return db.getAllAsync<Producto>(
    'SELECT * FROM productos WHERE artesanoId = ?',
    artesanoId
  );
}