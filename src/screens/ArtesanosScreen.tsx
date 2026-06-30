// src/screens/ArtesanosScreen.tsx
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useArtesanos } from '../hooks/useArtesanos';
import { Artesano } from '../types/index';
import { ArtesanosStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<ArtesanosStackParamList, 'ListaArtesanos'>;

export default function ArtesanosScreen({ navigation }: Props) {
  const { artesanos, cargando } = useArtesanos();

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
        <Text>Cargando artesanos...</Text>
      </View>
    );
  }

  const renderArtesano = ({ item }: { item: Artesano }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PerfilArtesano', { artesanoId: item.id })}
    >
      <Image source={{ uri: item.imagen }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.especialidad}>{item.especialidad}</Text>
        <Text style={styles.ubicacion}>📍 {item.ubicacion}</Text>
      </View>
      <Text style={styles.flecha}>›</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={artesanos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderArtesano}
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  lista: { padding: 12 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, padding: 12, marginBottom: 10, elevation: 2,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  info: { flex: 1 },
  nombre: { fontSize: 16, fontWeight: 'bold' },
  especialidad: { color: '#555' },
  ubicacion: { color: '#888', fontSize: 12, marginTop: 2 },
  flecha: { fontSize: 26, color: '#bbb' },
});