import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Badge, Paragraph, useTheme } from 'react-native-paper';
import { 
    TextInput, 
    Button, 
    Card, 
    Text,
    Checkbox, 
    withTheme,
    Avatar,
} from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import { isAlphanumeric, isValidEmail, isValidPassword, minLength } from '../../../validators';
import styles from './styles';

export default function SignInPage({ navigation }) {

    const { colors } = useTheme();

    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    
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
            <ScrollView style={{flex: 1, width: '100%', height: '100%'}} contentContainerStyle={{alignItems:'center'}}>
            <Avatar.Icon size={100} icon="account" color={colors.primary} style={{backgroundColor: 'transparent'}} />
            <Paragraph style={{fontWeight: 'bold', color: colors.primary}}>Acessar Conta</Paragraph>
            
            <Card style={styles.card}>
                <TextInput
                    ref={inputEmail}
                    value={email.value}
                    onChangeText={(value) => setEmail({ ...email, value })}
                    style={styles.input}                    
                    //error={email.error}
                    mode="text"
                    label="email ou telefone"
                    placeholder="digite seu email ou telefone"
                />
                <TextInput
                    ref={inputPassword}
                    value={password.value}
                    onChangeText={(value) => setPassword({ ...password, value })}
                    //error={password.error}
                    style={styles.input}
                    label="senha"
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                />
                
                <Card.Actions style={styles.actions}>

                    <Text style={styles.errorText}>{ signInError }</Text>
                    <Button
                        style={{ ...styles.button, backgroundColor: !error ? colors.primary : colors.background }}
                        onPress={ () => signIn(email.value, password.value)}
                        disabled={error}
                    ><Text style={{color:'#fff'}}>Entrar</Text></Button>
                </Card.Actions>
                
            </Card>

            <Button onPress={() => navigation.navigate('SignUp')}

            >Criar Conta</Button>

            <Button>{"Esqueceu sua senha"}</Button>
            </ScrollView>
        </View>

    );
}

