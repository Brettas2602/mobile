import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import utils from "../src/styles/utils";
import { Link, router } from "expo-router";

export default function Index() {

  const [email, onChangeEmail] = useState('')
  const [senha, onChangeSenha] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  function verificarCampos() {
    if (email.trim().length === 0 ||
      senha.trim().length === 0
    ) {
      setMessage('Todos os campos devem ser preenchidos!')
      setError(true)
    } else {
      setError(false)
      router.navigate('/(tabs)')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.utils.h1, {marginBottom: 40}]}>Login</Text>

      <Text style={styles.utils.label}>Email</Text>
      <TextInput
        keyboardType="email-address"
        style={styles.utils.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder='Digite seu email'
        placeholderTextColor='#555555'
      />

      <Text style={styles.utils.label}>Senha</Text>
      <TextInput
        style={styles.utils.input}
        onChangeText={onChangeSenha}
        value={senha}
        placeholder='Digite sua senha'
        placeholderTextColor='#555555'
      />

      {error ?
        <View style={[styles.utils.alert, { width: '100%', height: '10%' }]}>
          <Text style={[styles.utils.text, { color: 'red', textAlign: 'center' }]}>{message}</Text>
        </View>
        : <></>
      }

      <TouchableOpacity style={styles.utils.button} onPress={verificarCampos}>
        <Text style={styles.utils.text}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.utils.text}>Não tem uma conta?</Text>
      <Link href={'createAccount'}>
        <TouchableOpacity>
          <Text style={styles.utils.touchableText}>Cadastre-se</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 30
  },

  ...utils
})
