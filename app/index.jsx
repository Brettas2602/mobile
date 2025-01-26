import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import utils from "../src/styles/utils";
import { Link, router } from "expo-router";
import axios from "axios";
import { useUser } from "@/src/context/UserContext";
import apiUrl from "../src/urls/apiUrl"

USER_API_URL = `${apiUrl}/api/usuario`

export default function index() {

  const [email, onChangeEmail] = useState('')
  const [senha, onChangeSenha] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const {setId, setNomeUsuario, setEmail, setSenha} = useUser()

  async function verificarCampos() {
    if (email.trim().length === 0 ||
      senha.trim().length === 0
    ) {
      setMessage('Todos os campos devem ser preenchidos!')
      setError(true)
    } else {
      try {
        const { data } = await axios.get(`${USER_API_URL}/${email}`)
        
        if (!data) {
          setMessage('Usuário ou senha incorretos!');
          setError(true);
          return;
        }
        
        if (data.senha !== senha) {
          setMessage('Usuário ou senha incorretos!');
          setError(true);
          return;
        }
        console.log(data.id)
        setId(data.id)
        setNomeUsuario(data.nomeDeUsuario);
        setEmail(data.email);
        setSenha(data.senha);
        setError(false);
        router.replace('/(tabs)/home');

      } catch (error) {
        console.log('Erro ao fazer login de usuário')
      }

    }
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.utils.h1, { marginBottom: 40 }]}>Login</Text>

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
        keyboardType="visible-password"
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
      <Link href={'/createAccount'} asChild>
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
