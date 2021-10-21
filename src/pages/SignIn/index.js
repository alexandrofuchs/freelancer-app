import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import { isAlphanumeric, isValidEmail, minLength } from '../SignUp/validators';
import styles from './styles';

export default function SignInPage({ navigation }) {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const { signIn } = useAuthenticate();

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                
                <TextInput
                    onChangeText={(value) => setUserData({ ...userData, email: value })}
                    value={userData.email}
                    error={!isValidEmail(userData.email)}
                    style={styles.input}
                    mode="text"
                    label="Email ou Telefone"
                    placeholder="digite seu email ou telefone
                    "
                    right={<TextInput.Affix text="/100" />}
                />
                <TextInput
                    onChangeText={(value) => setUserData({ ...userData, password: value })}
                    value={userData.password}
                    error={!isAlphanumeric(userData.password) && !minLength(userData.password)}
                    style={styles.input}
                    label="Password"
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                />

                <Card.Actions style={styles.actions}>
                    <Button onPress={signIn}>Entrar</Button>
                </Card.Actions>

            </Card>

                <Button onPress={() => navigation.navigate('SignUp')}>Criar Conta</Button>
                
                <Button>{"Esqueceu sua senha"}</Button>
        </View>

    );
}

