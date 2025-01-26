import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { MusicProvider } from "../src/context/MusicContext"
import { UserProvider } from "../src/context/UserContext"

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <UserProvider>
        <MusicProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="createAccount" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="userScreen" options={{ title: 'Perfil de Usuario' }} />
            <Stack.Screen name="editUser" options={{ title: 'Editar Informacoes' }} />
            <Stack.Screen name="addMusic" options={{ title: 'Adicionar Música' }} />
          </Stack>
        </MusicProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
