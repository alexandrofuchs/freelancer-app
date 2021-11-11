import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, TextInput, Button, useTheme } from 'react-native-paper';
import CustomModal from '../../components/Modal';
import MySnackBar from '../../components/Modal';
import Modal from '../../components/Modal';
import { useAuthenticate } from '../../contexts/UserContext';

export default function UserUpdate({ navigation }) {

    const { userData, upsert, validateToken } = useAuthenticate();

    const [userForm, setUserForm] = useState({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
    });

    const [error, setError] = useState('');
    
    const { colors } = useTheme();

    const onUpdate = async () => {
        const res = await upsert(userForm);
        if(!!res.error){
            setError(res.error);
        }else{
            await validateToken();
            console.log(res.data);
            navigation.navigate("UserAccount");            
        }
    }

    return (
        <Card style={styles.container}>
            <Card.Content>
            {!true ? <Text>{userData.firstName}</Text> :
                <TextInput
                    label="Nome"
                    value={userForm.firstName}
                    onChangeText={text => setUserForm({ ...userForm, firstName: text })}
                />
            }

            {!true ? <Text>{userData.lastName}</Text> :
                <TextInput
                    label="Sobrenome"
                    value={userForm.lastName}
                    onChangeText={text => setUserForm({ ...userForm, lastName: text })}
                />
            }

            {!true ? <Text>{userData.email}</Text> :
                <TextInput
                    label="Email"
                    value={userForm.email}
                    onChangeText={text => setUserForm({ ...userForm, email: text })}
                />
            }
            <Text 
                style={{
                    color: 'red',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                }}
            >{ error }</Text>
            </Card.Content>
            <Card.Actions 
                style={{ width: '100%', justifyContent:'center'}}
            >
                <Button
                    color={colors.background}
                    style={{ flex: 1, backgroundColor: colors.primary}}
                    onPress={onUpdate}
                >Salvar</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignSelf: 'center',
        marginBottom: "1%",
        height: '99%',
        width: '99%',
    }
})
