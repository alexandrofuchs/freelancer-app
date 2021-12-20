import React, { createRef, useEffect, useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Card, Text, Avatar, Colors, useTheme } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import styles from './styles';
import { isAlphanumeric, isValidEmail, isWord, minLength } from '../../../validators';
import UserForm from '../../components/UserForm';
import { useApp } from '../../contexts/AppContext';
import SnackBarComponent from '../../components/SnackBar';

export default function SignUpPage({ navigation }) {

        const [error, setError] = useState(null);

        const [userForm, setUserForm] = useState({
                firstName: {value: '', error: ''},
                lastName: '',
                email: '',
                password: '',   
                repeatPassword: '', 
        });

        const { upsert } = useAuthenticate();
        
        const { setLoading } = useApp();

        const { colors } = useTheme();

        const onSignUp = async () => {
  
                const res = await upsert({
                        firstName: userForm.firstName.value,
                        lastName: userForm.lastName,
                        email: userForm.email,
                        password: userForm.password,   
                        repeatPassword: userForm.repeatPassword, 
                 });

                if(!!res.error){
                        setError(res.error);
                }else{
                        setMessage('Cadastro realizado com sucesso!')
                        setTimeout(() => {navigation.navigate("SignIn")}, 2000)
                        
                }  
          
        }

        const [message, setMessage] = useState('');
        const [showPassword, setShowPassword] = useState(true);

        const inputFirstName = createRef(null);
        const inputLastName = createRef(null);
        const inputEmail = createRef(null);
        const inputPassword = createRef(null);
        const inputRepeatPassword = createRef(null);

        

        useEffect(()=>{
                //inputFirstName.current.focus();
        },[])

        return (
                <View style={styles.container}>
                        <Avatar.Icon size={100} icon="account-plus" style={{backgroundColor:"transparent"}} color={colors.primary} />
                        <Card style={styles.card}>
                                <SnackBarComponent message={message} setMessage={setMessage} />
                                <ScrollView>
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, firstName: { value } })}
                                                value={userForm.firstName.value}
                                                error={!!userForm.firstName.error}
                                                style={styles.input}
                                                mode="text"
                                                label="Nome" 
                                                returnKeyType='next'
                                                ref={inputFirstName}
                                                onSubmitEditing={
                                                        () => {
                                                                setUserForm({ ...userForm, firstName: { ...userForm.firstName, error: !isWord(userForm.firstName.value) | userForm.firstName.value.length < 3 ? 'erro': '' } })
                                                                
                                                                inputLastName.current.focus()}}
                                                blurOnSubmit={false}                                                                                             
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, lastName: value })}
                                                value={userForm.lastName}
                                                //error={!isWord(userForm.lastName)}
                                                style={styles.input}
                                                mode="text"
                                                label="Sobrenome"
                                                returnKeyType='next'
                                                ref={inputLastName}
                                                onSubmitEditing={() => inputEmail.current.focus()}
                                                blurOnSubmit={false}                                                  
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, email: value })}
                                                value={userForm.email.toLowerCase()}
                                                //error={!isValidEmail(userForm.email)}
                                                style={styles.input}
                                                mode="text"
                                                keyboardType='email-address'
                                                autoCapitalize='none'
                                                label="Email"   
                                                returnKeyType='next'
                                                ref={inputEmail}
                                                onSubmitEditing={() => inputPassword.current.focus()}
                                                blurOnSubmit={false}                                               
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, password: value })}
                                                value={userForm.password.toLowerCase()}
                                               // error={!isAlphanumeric(userForm.password) | !minLength(userForm.password, 8)}
                                                style={styles.input}
                                                label="Senha"
                                                autoCapitalize='none'
                                                secureTextEntry={showPassword}
                                                right={<TextInput.Icon name={!showPassword ? "eye": "eye-off"} onPress={() => setShowPassword(!showPassword)}/>}
                                                returnKeyType='next'
                                                ref={inputPassword}
                                                onSubmitEditing={() => inputRepeatPassword.current.focus()}
                                                blurOnSubmit={false}                                               
                                        />
                                        <TextInput
                                                onChangeText={(value) => setUserForm({ ...userForm, repeatPassword: value })}
                                                value={userForm.repeatPassword.toLowerCase()}
                                                //error={userForm.password !== userForm.repeatPassword}
                                                style={styles.input}
                                                autoCapitalize='none'
                                                label="Repetir senha"
                                                secureTextEntry={showPassword}
                                                returnKeyType='done'
                                                ref={inputRepeatPassword}
                                                                                                  
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

