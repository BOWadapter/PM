// src/screens/PerfilArtesanoScreen.tsx
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useArtesano } from '../hooks/useArtesanos';
import { Producto } from '../types/index';
import { ArtesanosStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ArtesanosStackParamList, 'PerfilArtesano'>;

export default function PerfilArtesanoScreen({ route }: Props) {
  const { artesanoId } = route.params;
  const { artesano, productos, cargando } = useArtesano(artesanoId);

  if (cargando) {
    return <View style={styles.centrado}><ActivityIndicator size="large" /></View>;
  }
  if (!artesano) {
    return <View style={styles.centrado}><Text>Artesano no encontrado.</Text></View>;
  }

  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.producto}>
      <Image source={{ uri: item.imagen }} style={styles.productoImg} />
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.precio}>Puja actual: ${item.precioActual}</Text>
        <Text style={styles.cierre}>Cierra: {item.fechaFin}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderProducto}
      ListHeaderComponent={
        <View style={styles.header}>
          <Image source={{ uri: artesano.imagen }} style={styles.avatarGrande} />
          <Text style={styles.nombre}>{artesano.nombre}</Text>
          <Text style={styles.especialidad}>{artesano.especialidad}</Text>
          <Text style={styles.ubicacion}>📍 {artesano.ubicacion}</Text>
          <Text style={styles.subtitulo}>Piezas en subasta ({productos.length})</Text>
        </View>
      }
      ListEmptyComponent={<Text style={styles.vacio}>Este artesano no tiene piezas en subasta.</Text>}
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  lista: { padding: 12 },
  header: { alignItems: 'center', paddingVertical: 16 },
  avatarGrande: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  nombre: { fontSize: 20, fontWeight: 'bold' },
  especialidad: { color: '#555', marginTop: 2 },
  ubicacion: { color: '#888', marginTop: 2 },
  subtitulo: { alignSelf: 'flex-start', fontSize: 16, fontWeight: 'bold', marginTop: 18, marginBottom: 6 },
  producto: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 10, elevation: 2 },
  productoImg: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  productoInfo: { flex: 1, justifyContent: 'center' },
  productoNombre: { fontSize: 15, fontWeight: 'bold' },
  precio: { color: '#2e7d32', marginTop: 2 },
  cierre: { color: '#888', fontSize: 12, marginTop: 2 },
  vacio: { textAlign: 'center', color: '#888', marginTop: 20 },
});