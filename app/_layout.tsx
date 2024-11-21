import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="createAccount" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </ThemeProvider>
  );
}
