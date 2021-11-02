import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import styles from './styles';
import { isAlphanumeric, isValidEmail, isWord, minLength } from '../../../validators';

export default function SignUpPage({ navigation }) {

        const [isValidForm, setIsValidForm] = useState(false)
        const { signIn } = useAuthenticate();

        const [userForm, setUserForm] = useState({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                repeatPassword: '',
        })

        return (
                <View style={styles.container}>
                        <Card style={styles.card}>
                                <ScrollView>
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, firstName: value })}
                                                value={userForm.firstName}
                                                error={!isWord(userForm.firstName)}
                                                style={styles.input}
                                                mode="text"
                                                label="Nome"
                                                right={<TextInput.Affix text="/100" />}
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, lastName: value })}
                                                value={userForm.lastName}
                                                error={!isWord(userForm.lastName)}
                                                style={styles.input}
                                                mode="text"
                                                label="Sobrenome"
                                                right={<TextInput.Affix text="/100" />}
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, email: value })}
                                                value={userForm.email}
                                                error={!isValidEmail(userForm.email)}
                                                style={styles.input}
                                                mode="text"
                                                label="Email ou Telefone"
                                                right={<TextInput.Affix text="/100" />}
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, password: value })}
                                                value={userForm.password}
                                                error={!isAlphanumeric(userForm.password) | !minLength(userForm.password, 8)}
                                                style={styles.input}
                                                label="Senha"
                                                secureTextEntry
                                                right={<TextInput.Icon name="eye" />}
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, repeatPassword: value })}
                                                value={userForm.repeatPassword}
                                                error={userForm.password !== userForm.repeatPassword}
                                                style={styles.input}
                                                label="Repetir senha"
                                                secureTextEntry
                                                right={<TextInput.Icon name="eye" />}
                                        />
                                        <Button onPress={signIn}>Enviar</Button>
                                </ScrollView>
                        </Card>
                </View>
        );
}

