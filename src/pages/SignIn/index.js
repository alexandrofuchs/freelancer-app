import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import { isAlphanumeric, isValidEmail, isValidPassword, minLength } from '../../../validators';
import styles from './styles';

export default function SignInPage({ navigation }) {

    const [email, setEmail] = useState({
        value: '',
        error: false,
        active: true,
    });

    const [password, setPassword] = useState({
        value: '',
        error: true,
        active: false,
    });

    const [error, setError] = useState(email.error || password.error);

    const { signIn, signInError } = useAuthenticate();
    
    useEffect(() => {
        setEmail({ ...email, error: !isValidEmail(email.value) })
        setError(email.error || password.error);
    }, [email.value])

    useEffect(() => {
        setPassword({ ...password, error: !isValidPassword(password.value) })
        setError(email.error || password.error);
    }, [password.value])

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <TextInput
                    value={email.value}
                    onChangeText={(value) => setEmail({ ...email, value })}
                    style={styles.input}
                    error={email.error}
                    mode="text"
                    label="email ou telefone"
                    placeholder="digite seu email ou telefone"
                />
                <TextInput
                    value={password.value}
                    onChangeText={(value) => setPassword({ ...password, value })}
                    error={password.error}
                    style={styles.input}
                    label="senha"
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                />

                <Card.Actions style={styles.actions}>
                    <Text style={styles.errorText}>{ signInError }</Text>
                    <Button
                        onPress={ () => signIn(email.value, password.value)}
                        disabled={error}
                    >Entrar</Button>
                </Card.Actions>
                
            </Card>

            <Button onPress={() => navigation.navigate('SignUp')}

            >Criar Conta</Button>

            <Button>{"Esqueceu sua senha"}</Button>
        </View>

    );
}

