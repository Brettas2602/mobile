import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import utils from "../src/styles/utils";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link, router } from "expo-router";
import { useUser } from "../src/context/UserContext";
import axios from "axios";
import apiUrl from "../src/urls/apiUrl"

USER_API_URL = `${apiUrl}/api/usuario`

export default function userScreen() {

    const {id, nomeUsuario, email, senha} = useUser()

    async function excluirUsuario() {
        console.log(id)
        await axios.delete(`${USER_API_URL}/${id}`)
        router.replace('/')
    }

    return (
        <View style={styles.container}>
            <FontAwesome5 name="user-circle" size={200} color="white" />

            <Text style={[styles.utils.h1, {marginBottom: 10}]}>{nomeUsuario}</Text>

            <Text style={[styles.utils.input, { textAlign: 'center', marginBottom: 35 }]}>{email}</Text>

            <Text style={[styles.utils.input, { textAlign: 'center' }]}>{senha}</Text>

            <Link href={'/editUser'} asChild>
                <TouchableOpacity style={styles.utils.button}>
                    <Text style={styles.utils.text}>Editar Informacoes</Text>
                </TouchableOpacity>
            </Link>

            <TouchableOpacity style={[styles.utils.button, {backgroundColor: 'red'}]} onPress={excluirUsuario}>
                <Text style={styles.utils.text}>Excluir usuário</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 15,
    }
})