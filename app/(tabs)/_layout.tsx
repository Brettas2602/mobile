import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Tabs initialRouteName="index" screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: '#007AFF', headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="search" size={30} color={color} />,
            tabBarIconStyle: { marginTop: '3%' }
          }}
        />
        <Tabs.Screen
          name="curtidas"
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={30} color={color} />,
            tabBarIconStyle: {marginTop: '3%'}
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
