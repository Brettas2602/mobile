import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="createAccount" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="userScreen" options={{title: 'Perfil de Usuario'}} />
        <Stack.Screen name="editUser" options={{title: 'Editar Informacoes'}} />
        <Stack.Screen name="addMusic" options={{title: 'Adicionar Música'}} />
      </Stack>
    </ThemeProvider>
  );
}
