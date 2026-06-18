# Artisan Auction — Proyecto Integrador

**Programación Móvil · Universidad Politécnica de Querétaro · Mayo–Agosto 2026**
Ingeniería en Sistemas Computacionales · 9.° Cuatrimestre

---

## Descripción

Aplicación móvil de subastas de artesanías mexicanas desarrollada en React Native con Expo. El proyecto demuestra la implementación de patrones de diseño profesionales aplicados a una app funcional que consume datos de artesanos y productos en subasta.

---

## Tecnologías

- React Native
- Expo SDK 54
- TypeScript
- React Navigation v6

---

## Requisitos previos

- Node.js instalado
- Expo Go instalado en el celular (versión SDK 54)
- VS Code

---

## Instalación

```bash
git clone https://github.com/BOWadapter/PM.git
cd PM
npm install
npx expo start --clear
```

Escanea el QR con Expo Go desde tu celular.

---

## Estructura del proyecto

```
mi-proyecto-nuevo/
├── App.tsx                     ← Navegación principal
├── index.ts                    ← Punto de entrada
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx      ← Lista de subastas con interacción
│   │   └── PerfilScreen.tsx    ← Perfil del usuario
│   ├── components/             ← (próximamente)
│   ├── services/
│   │   └── artesaniaService.ts ← Datos de artesanos y productos
│   ├── hooks/
│   │   └── useProductos.ts     ← Custom Hook de carga de datos
│   └── types/
│       └── index.ts            ← Tipos TypeScript del dominio
├── assets/
├── package.json
└── tsconfig.json
```

---

## Patrones de diseño implementados

### 1. Separation of Concerns

Cada carpeta tiene una única responsabilidad:

| Carpeta | Responsabilidad |
|---|---|
| `screens/` | Mostrar la interfaz al usuario |
| `services/` | Proveer y centralizar los datos |
| `types/` | Definir las estructuras de datos |
| `components/` | Piezas visuales reutilizables |
| `hooks/` | Lógica reutilizable entre pantallas |

### 2. Repository Pattern

`artesaniaService.ts` centraliza todos los datos en un solo lugar. Cuando conectemos la API real, solo modificamos este archivo y el resto de la app no cambia.

### 3. Custom Hooks

`useProductos.ts` encapsula la lógica de obtención de datos y el estado de carga, separándola de la pantalla. `HomeScreen` ya no sabe de dónde vienen los datos: solo consume el hook. Cuando se conecte la API real, únicamente cambia el hook.

---

## Tipos TypeScript — `src/types/index.ts`

```ts
export type Artesano = {
  id: number;
  nombre: string;
  especialidad: string;
  imagen: string;
  ubicacion: string;
};

export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precioInicial: number;
  precioActual: number;
  artesanoId: number;
  fechaFin: string;
};

export type Oferta = {
  id: number;
  productoId: number;
  usuarioId: number;
  monto: number;
  fecha: string;
};
```

---

## Datos de prueba — `src/services/artesaniaService.ts`

```ts
import { Artesano, Producto } from '../types/index';

export const artesanos: Artesano[] = [
  {
    id: 1,
    nombre: 'María López',
    especialidad: 'Cerámica Talavera',
    imagen: 'https://picsum.photos/id/1011/200',
    ubicacion: 'Puebla, México',
  },
  {
    id: 2,
    nombre: 'Juan Méndez',
    especialidad: 'Textiles Otomí',
    imagen: 'https://picsum.photos/id/1012/200',
    ubicacion: 'Querétaro, México',
  },
  {
    id: 3,
    nombre: 'Rosa Hernández',
    especialidad: 'Alebrijes',
    imagen: 'https://picsum.photos/id/1013/200',
    ubicacion: 'Oaxaca, México',
  },
];

export const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Jarrón Talavera Azul',
    descripcion: 'Jarrón hecho a mano con técnica tradicional de Talavera.',
    imagen: 'https://picsum.photos/id/200/300',
    precioInicial: 500,
    precioActual: 650,
    artesanoId: 1,
    fechaFin: '2026-07-01',
  },
  {
    id: 2,
    nombre: 'Mantel Bordado Otomí',
    descripcion: 'Mantel con bordado a mano con motivos de la cultura Otomí.',
    imagen: 'https://picsum.photos/id/201/300',
    precioInicial: 800,
    precioActual: 950,
    artesanoId: 2,
    fechaFin: '2026-07-05',
  },
  {
    id: 3,
    nombre: 'Alebrije Dragón',
    descripcion: 'Figura de madera pintada a mano representando un dragón.',
    imagen: 'https://picsum.photos/id/202/300',
    precioInicial: 1200,
    precioActual: 1200,
    artesanoId: 3,
    fechaFin: '2026-07-10',
  },
];
```

---

## Custom Hook — `src/hooks/useProductos.ts`

```ts
import { useState, useEffect } from 'react';
import { productos as productosMock, artesanos } from '../services/artesaniaService';
import { Producto, Artesano } from '../types/index';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    setProductos(productosMock);
    setCargando(false);
  }, []);

  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return artesanos.find(a => a.id === artesanoId);
  };

  return { productos, cargando, getArtesano };
}
```

---

## Pantalla principal — `src/screens/HomeScreen.tsx`

```tsx
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useProductos } from '../hooks/useProductos';
import { Producto } from '../types/index';

export default function HomeScreen() {
  const { productos, cargando, getArtesano } = useProductos();

  const handleOfertar = (producto: Producto) => {
    const nuevaOferta = producto.precioActual + 100;
    Alert.alert(
      'Confirmar oferta',
      `¿Deseas ofertar $${nuevaOferta} por ${producto.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ofertar', onPress: () => Alert.alert('Oferta enviada', `Tu oferta de $${nuevaOferta} fue registrada.`) },
      ]
    );
  };

  const renderProducto = ({ item }: { item: Producto }) => {
    const artesano = getArtesano(item.artesanoId);
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.artesano}>{artesano?.nombre} · {artesano?.ubicacion}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <View style={styles.precios}>
            <Text style={styles.precioLabel}>Precio actual:</Text>
            <Text style={styles.precio}>${item.precioActual}</Text>
          </View>
          <Text style={styles.fecha}>Cierra: {item.fechaFin}</Text>
          <TouchableOpacity style={styles.boton} onPress={() => handleOfertar(item)}>
            <Text style={styles.botonTexto}>Hacer oferta +$100</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.cargandoTexto}>Cargando subastas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProducto}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  cargandoTexto: { marginTop: 12, fontSize: 14, color: '#666' },
  lista: { padding: 16, gap: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 3 },
  imagen: { width: '100%', height: 180 },
  info: { padding: 12, gap: 6 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  artesano: { fontSize: 13, color: '#888' },
  descripcion: { fontSize: 14, color: '#555' },
  precios: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  precioLabel: { fontSize: 14, color: '#555' },
  precio: { fontSize: 20, fontWeight: 'bold', color: '#3b82f6' },
  fecha: { fontSize: 12, color: '#aaa' },
  boton: { backgroundColor: '#3b82f6', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 8 },
  botonTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
```

---

## Navegación — `App.tsx`

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import PerfilScreen from './src/screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ tabBarIcon: () => <Text>🏠</Text> }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{ tabBarIcon: () => <Text>👤</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

---

## Componentes React Native utilizados

| Componente | Función |
|---|---|
| `FlatList` | Lista optimizada que solo renderiza elementos visibles |
| `TouchableOpacity` | Interacción táctil con retroalimentación visual |
| `Alert` | Diálogos nativos de confirmación |
| `Image` | Carga de imágenes desde URL |
| `ActivityIndicator` | Spinner de carga mientras se obtienen los datos |

Custom Hooks en React Native
¿Qué es un Custom Hook?
Un Custom Hook es una función de JavaScript cuyo nombre empieza con use y que permite extraer y reutilizar lógica de estado entre componentes. Internamente puede usar los hooks nativos de React (useState, useEffect, etc.).
La regla es simple: si dos componentes comparten la misma lógica, o si un componente tiene demasiada lógica mezclada con su interfaz, esa lógica se puede mover a un Custom Hook.
El problema que resuelve
Antes, nuestra pantalla HomeScreen hacía dos cosas a la vez:

Obtener los datos (de dónde vienen los productos, buscar el artesano de cada uno)
Mostrar los datos (la lista, las tarjetas, los estilos)

Cuando un componente mezcla "de dónde saco los datos" con "cómo los dibujo", se vuelve difícil de mantener y de probar. Esto viola el principio de Separación de Responsabilidades.
La solución
Movemos toda la lógica de datos a un Custom Hook llamado useProductos. La pantalla deja de preocuparse por el origen de los datos y solo los consume.
tsexport function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    setProductos(productosMock);
    setCargando(false);
  }, []);

  const getArtesano = (artesanoId: number) => {
    return artesanos.find(a => a.id === artesanoId);
  };

  return { productos, cargando, getArtesano };
}
Cómo funciona por dentro

useState crea dos piezas de estado: la lista de productos y un booleano cargando que indica si los datos aún se están obteniendo.
useEffect se ejecuta una sola vez cuando el componente se monta (gracias al arreglo de dependencias vacío []). Aquí simulamos la carga de datos. Más adelante, esta es la única parte que cambiará cuando conectemos una API real.
return entrega un objeto con todo lo que la pantalla necesita: los datos, el estado de carga y la función auxiliar.

Cómo se usa en la pantalla
La pantalla queda mucho más limpia. Una sola línea reemplaza toda la lógica anterior:
tsxconst { productos, cargando, getArtesano } = useProductos();
A partir de ahí, HomeScreen solo se encarga de dibujar. Si cargando es verdadero, muestra un spinner; si no, muestra la lista.
Ventajas

Reutilización: cualquier otra pantalla puede usar useProductos() sin reescribir la lógica.
Mantenibilidad: si cambia el origen de los datos, solo se modifica el hook; las pantallas no se tocan.
Legibilidad: la pantalla expresa claramente qué hace, sin ruido de cómo obtiene los datos.
Preparación para la API: cuando pasemos de datos de prueba a una API real con fetch, solo cambia el interior del useEffect.

Reglas de los Hooks

Solo se llaman en el nivel superior del componente o de otro hook, nunca dentro de condicionales, ciclos o funciones anidadas.
Solo se llaman desde componentes de React o desde otros Custom Hooks.
El nombre debe empezar con use para que React los reconozca.

Paso 1 — Renombrar el archivo de tipos
En VS Code, clic derecho sobre src/types/index.tsx → Rename → cámbialo a index.ts
(Es solo cosmético pero correcto: el .tsx es para archivos con JSX, y este solo tiene tipos.)

Paso 2 — Crear el Custom Hook
Crea el archivo src/hooks/useProductos.ts y pega esto:
tsimport { useState, useEffect } from 'react';
import { productos as productosMock, artesanos } from '../services/artesaniaService';
import { Producto, Artesano } from '../types/index';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    setProductos(productosMock);
    setCargando(false);
  }, []);

  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return artesanos.find(a => a.id === artesanoId);
  };

  return { productos, cargando, getArtesano };
}

Paso 3 — Conectar el hook en HomeScreen
Reemplaza todo el contenido de src/screens/HomeScreen.tsx con esto. La diferencia clave es que ya no importa los datos directamente, sino que usa el hook:
tsximport { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useProductos } from '../hooks/useProductos';
import { Producto } from '../types/index';

export default function HomeScreen() {
  const { productos, cargando, getArtesano } = useProductos();

  const handleOfertar = (producto: Producto) => {
    const nuevaOferta = producto.precioActual + 100;
    Alert.alert(
      'Confirmar oferta',
      `¿Deseas ofertar $${nuevaOferta} por ${producto.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Ofertar', onPress: () => Alert.alert('Oferta enviada', `Tu oferta de $${nuevaOferta} fue registrada.`) },
      ]
    );
  };

  const renderProducto = ({ item }: { item: Producto }) => {
    const artesano = getArtesano(item.artesanoId);
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.artesano}>{artesano?.nombre} · {artesano?.ubicacion}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <View style={styles.precios}>
            <Text style={styles.precioLabel}>Precio actual:</Text>
            <Text style={styles.precio}>${item.precioActual}</Text>
          </View>
          <Text style={styles.fecha}>Cierra: {item.fechaFin}</Text>
          <TouchableOpacity style={styles.boton} onPress={() => handleOfertar(item)}>
            <Text style={styles.botonTexto}>Hacer oferta +$100</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.cargandoTexto}>Cargando subastas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProducto}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  cargandoTexto: { marginTop: 12, fontSize: 14, color: '#666' },
  lista: { padding: 16, gap: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 3 },
  imagen: { width: '100%', height: 180 },
  info: { padding: 12, gap: 6 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  artesano: { fontSize: 13, color: '#888' },
  descripcion: { fontSize: 14, color: '#555' },
  precios: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  precioLabel: { fontSize: 14, color: '#555' },
  precio: { fontSize: 20, fontWeight: 'bold', color: '#3b82f6' },
  fecha: { fontSize: 12, color: '#aaa' },
  boton: { backgroundColor: '#3b82f6', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 8 },
  botonTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});

Paso 4 — Probar
powershellnpx expo start --clear
Verás un breve spinner "Cargando subastas..." y luego la lista. Eso confirma que el hook funciona.

Paso 5 — Subir a GitHub
powershellgit add .
git commit -m "feat: Custom Hook useProductos y renombrado de tipos"
git push
---

## Siguiente paso

Conectar el Custom Hook `useProductos` a una API real mediante `fetch`, manejando estados de carga y error.

---

*Programación Móvil — Universidad Politécnica de Querétaro — Mayo–Agosto 2026*
