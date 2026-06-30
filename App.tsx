// App.tsx
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import PerfilScreen from './src/screens/PerfilScreen';           // perfil del usuario (ya existente)
import ArtesanosScreen from './src/screens/ArtesanosScreen';
import PerfilArtesanoScreen from './src/screens/PerfilArtesanoScreen';
import { ArtesanosStackParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<ArtesanosStackParamList>();

// Stack anidado para el módulo de Artesanos
function ArtesanosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaArtesanos" component={ArtesanosScreen} options={{ title: 'Artesanos' }} />
      <Stack.Screen name="PerfilArtesano" component={PerfilArtesanoScreen} options={{ title: 'Perfil del artesano' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ headerShown: true, tabBarIcon: () => <Text>🏠</Text> }}
        />
        <Tab.Screen
          name="ArtesanosTab"
          component={ArtesanosStack}
          options={{ title: 'Artesanos', tabBarIcon: () => <Text>🎨</Text> }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{ headerShown: true, tabBarIcon: () => <Text>👤</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}