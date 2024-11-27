import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import utils from "../src/styles/utils";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from "expo-router";

export default function userScreen() {
    return (
        <View style={styles.container}>
            <FontAwesome5 name="user-circle" size={200} color="white" />`

            <Text style={[styles.utils.h1, { marginTop: -15 }]}>Nome de usuario</Text>`

            <Text style={[styles.utils.input, { textAlign: 'center', marginBottom: 35 }]}>exemploEmail@gmail.com</Text>

            <Text style={[styles.utils.input, { textAlign: 'center' }]}>**********</Text>

            <Link href={'/editUser'} asChild>
                <TouchableOpacity style={styles.utils.button}>
                    <Text style={styles.utils.text}>Editar Informacoes</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    ...utils,

    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 30,
    }
})