import { View, Text, StyleSheet, Image } from 'react-native';

const nombre: string = "Enrique Peña";
const carrera: string = "Ing. en Sistemas Computacionales";

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/150' }}
        style={styles.avatar}
      />
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.subtitulo}>{carrera}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
  },
});