import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import utils from "../src/styles/utils";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
import { router } from "expo-router";

export default function editUSer() {

    const [nomeUsuario, setNomeUsuario] = useState('Nome de Usuario')
    const [email, setEmail] = useState("exemploEmail@gmail.com")
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    function verificarCampos() {
        if (senha.trim().length === 0 ||
            confirmarSenha.trim().length === 0) {
            setMessage('Todos os campos devem ser preenchidos!')
            setError(true)
        } else if (senha != confirmarSenha) {
            setMessage('As senhas não estão iguais!')
            setError(true)
        } else {
            setError(false)
            router.back()
        }
    }

    return (
        <View style={styles.container}>
            <FontAwesome5 name="user-circle" size={200} color="white" />`

            <TextInput
                style={[styles.utils.input, { textAlign: 'center', marginTop: -10 }]}
                onChangeText={setNomeUsuario}
                value={nomeUsuario}
            />

            <TextInput
                style={[styles.utils.input, { textAlign: 'center' }]}
                onChangeText={setEmail}
                value={email}
            />

            <TextInput
                style={[styles.utils.input, { textAlign: 'center' }]}
                onChangeText={setSenha}
                value={senha}
                placeholder="Digite a nova senha"
                placeholderTextColor='#555555'
            />

            <TextInput
                style={[styles.utils.input, { textAlign: 'center' }]}
                onChangeText={setConfirmarSenha}
                value={confirmarSenha}
                placeholder="Confirme a nova senha"
                placeholderTextColor='#555555'
            />

            {error ?
                <View style={[styles.utils.alert, { width: '100%', height: 70 }]}>
                    <Text style={[styles.utils.text, { color: 'red', textAlign: 'center' }]}>{message}</Text>
                </View>
                : <></>
            }

            <TouchableOpacity style={styles.utils.button} onPress={verificarCampos}>
                <Text style={styles.utils.text}>Confirmar Mudancas</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
    }
})