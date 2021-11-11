import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import styles from './styles';
import { isAlphanumeric, isValidEmail, isWord, minLength } from '../../../validators';

export default function UserForm({ user }) {

    const [isValidForm, setIsValidForm] = useState(false)
    const { signIn } = useAuthenticate();

    return (
        <>
            <Card style={styles.card}>
                <ScrollView>
                    {user.firstName ?
                        <TextInput
                            onChangeText={(value) => setUserForm({ ...user, firstName: value })}
                            value={user.firstName}
                            error={!isWord(user.firstName)}
                            style={styles.input}
                            mode="text"
                            label="Nome"
                            right={<TextInput.Affix text="/100" />}
                        /> : null
                    }

                    {user.lastName ?
                        <TextInput
                            onChangeText={(value) => setUserForm({ ...user, lastName: value })}
                            value={user.lastName}
                            error={!isWord(user.lastName)}
                            style={styles.input}
                            mode="text"
                            label="Sobrenome"
                            right={<TextInput.Affix text="/100" />}
                        /> : null
                    }

                    {user.email ?
                        <TextInput
                            onChangeText={(value) => setUserForm({ ...user, email: value })}
                            value={user.email}
                            error={!isValidEmail(user.email)}
                            style={styles.input}
                            mode="text"
                            label="Email ou Telefone"
                            right={<TextInput.Affix text="/100" />}
                        /> : null
                    }

                    {user.password ?
                        <>
                            <TextInput
                                onChangeText={(value) => setUserForm({ ...user, password: value })}
                                value={user.password}
                                error={!isAlphanumeric(user.password) | !minLength(user.password, 8)}
                                style={styles.input}
                                label="Senha"
                                secureTextEntry
                                right={<TextInput.Icon name="eye" />}
                            />
                            <TextInput
                                onChangeText={(value) => setUserForm({ ...user, repeatPassword: value })}
                                value={user.repeatPassword}
                                error={user.password !== user.repeatPassword}
                                style={styles.input}
                                label="Repetir senha"
                                secureTextEntry
                                right={<TextInput.Icon name="eye" />}
                            />
                        </> : null
                    }
                    <Button onPress={signIn}>Enviar</Button>
                </ScrollView>
            </Card>
        </>
    );
}

