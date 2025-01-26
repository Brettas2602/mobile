import { ScrollView, Text, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import utils from '../src/styles/utils'
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import { useUser } from "../src/context/UserContext";
import apiUrl from "../src/urls/apiUrl"

USER_API_URL = `${apiUrl}/api/usuario`

export default function createAccount() {
    const [nomeUsuario, onChangeNomeUsuario] = useState('')
    const [email, onChangeEmail] = useState('')
    const [senha, onChangeSenha] = useState('')
    const [confirmarSenha, onChangeConfirmarSenha] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const {setId, setNomeUsuario, setEmail, setSenha} = useUser()

    async function verificarCampos() {
        if (nomeUsuario.trim().length === 0 ||
            email.trim().length === 0 ||
            senha.trim().length === 0 ||
            confirmarSenha.trim().length === 0
        ) {
            setMessage('Todos os campos devem ser preenchidos!')
            setError(true)
        } else if (senha != confirmarSenha) {
            setMessage('As senhas não estão iguais!')
            setError(true)
        } else {
            try {
                const verifyEmailAlreadyExists = await axios.get(`${USER_API_URL}/${email}`)

                if (!verifyEmailAlreadyExists.data) {
                    const {data} = await axios.post(USER_API_URL, {
                        nomeDeUsuario: nomeUsuario,
                        email: email,
                        senha: senha
                    })
    
                    setId(data.id)
                    setNomeUsuario(nomeUsuario)
                    setEmail(email)
                    setSenha(senha)
    
                    setError(false)
                    router.navigate('/(tabs)/home')
                } else {
                    setMessage('Esse email já está cadastrado!')
                    setError(true)
                }

            } catch (error) {
                console.log('Erro ao criar usuário')
            }

        }
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
            <Text style={[styles.utils.h1, {marginBottom: 40}]}>Cadastro de Usuário</Text>

            <Text style={styles.utils.label}>Nome de Usuário</Text>
            <TextInput
                style={styles.utils.input}
                onChangeText={onChangeNomeUsuario}
                value={nomeUsuario}
                placeholder='Digite o nome de usuário'
                placeholderTextColor='#555555'
            />

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

            <Text style={styles.utils.label}>Confirme a senha</Text>
            <TextInput
                style={styles.utils.input}
                onChangeText={onChangeConfirmarSenha}
                value={confirmarSenha}
                placeholder='Confirme sua senha'
                placeholderTextColor='#555555'
            />

            {error ?
                <View style={[styles.utils.alert, { width: '100%', height: '10%' }]}>
                    <Text style={[styles.utils.text, { color: 'red', textAlign: 'center' }]}>{message}</Text>
                </View>
                : <></>
            }

            <TouchableOpacity style={styles.utils.button} onPress={verificarCampos}>
                <Text style={styles.utils.text}>Cadastrar</Text>
            </TouchableOpacity>

            <Text style={styles.utils.text}>Já tem uma conta?</Text>
            <Link href={'/'}>
                <Text style={styles.utils.touchableText}>Faça login</Text>
            </Link>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 30,
    },

    ...utils
})