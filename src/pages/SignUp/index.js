import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Card, Text, Avatar, Colors, useTheme } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import styles from './styles';
import { isAlphanumeric, isValidEmail, isWord, minLength } from '../../../validators';
import UserForm from '../../components/UserForm';
import { useApp } from '../../contexts/AppContext';

export default function SignUpPage({ navigation }) {

        const [error, setError] = useState(null);

        const [userForm, setUserForm] = useState({
                firstName: '',
                lastName: '',
                email: '',
                password: '',    
        });

        const { upsert } = useAuthenticate();
        
        const { setLoading } = useApp();

        const { colors } = useTheme();

        const onSignUp = async () => {
                //setLoading(true);
                const res = await upsert(userForm);
                console.log(res); 
                if(!!res.error){
                        setError(res.error);
                }else{
                        navigation.navigate("SignIn");
                }   
                //setLoading(false);      
        }

        return (
                <View style={styles.container}>
                        <Avatar.Icon size={100} icon="account-plus" style={{backgroundColor:"transparent"}} color={colors.primary} />
                        <Card style={styles.card}>
                                <ScrollView>
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, firstName: value })}
                                                value={userForm.firstName}
                                                //error={!isWord(userForm.firstName)}
                                                style={styles.input}
                                                mode="text"
                                                label="Nome"                                                
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, lastName: value })}
                                                value={userForm.lastName}
                                                //error={!isWord(userForm.lastName)}
                                                style={styles.input}
                                                mode="text"
                                                label="Sobrenome"                                                
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, email: value })}
                                                value={userForm.email}
                                                //error={!isValidEmail(userForm.email)}
                                                style={styles.input}
                                                mode="text"
                                                label="Email ou Telefone"                                                
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, password: value })}
                                                value={userForm.password}
                                               // error={!isAlphanumeric(userForm.password) | !minLength(userForm.password, 8)}
                                                style={styles.input}
                                                label="Senha"
                                                secureTextEntry                                                
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, repeatPassword: value })}
                                                value={userForm.repeatPassword}
                                                //error={userForm.password !== userForm.repeatPassword}
                                                style={styles.input}
                                                label="Repetir senha"
                                                secureTextEntry                                                
                                        />
                                        
                                         <Text style={styles.errorText}>{ error }</Text> 
                                        <Button
                                                style={{ ...styles.button, backgroundColor: colors.primary }}
                                                onPress={onSignUp}
                                                disabled={false}
                                        ><Text style={{color:'#fff'}}>Enviar</Text></Button>
                                        
                                </ScrollView>
                        </Card>
                </View>
        );
}

