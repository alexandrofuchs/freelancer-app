import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    Button,
    Text,
    TextInput,
    List,
    useTheme,
    Card,
    Title,
    Paragraph,
    DataTable,
} from 'react-native-paper';
import { color } from 'react-native-reanimated';
import { useApp } from '../../contexts/AppContext';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';

const Item = ({ title, descriptions }) => (
    <>
        <Title>{title}:</Title>
        {descriptions.map((description, index) => <Paragraph key={index}> - {description} </Paragraph>)}
    </>
);

export default function UserPresentation({ navigation }) {

    const { colors } = useTheme();
    const { userData } = useAuthenticate();
    const { setLoading } = useApp();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [profile, setProfile] = useState({
        biography: "",
        items: [],
        createdAt: "",
        id: "",
        otherInfo: "",
        updatedAt: "",
        userId: "",
    });


    const onSave = async () => {
        try {
            const res = await Api.post(`/users/${userData.id}/profiles`, {
                otherInfo: profile.otherInfo,
                biography: profile.biography,
                items: profile.items,
            });
            console.log(res)
            if (res.data) {
                navigation.navigate("UserAccount");
            }
        } catch (error) {
            console.log(error)
        }

    }

    const addItem = async () => {
        if(!!title & !!description){
            setProfile({ ...profile, items: [...profile.items, { title, description } ]})
        }
        
    }

    useEffect(() => { 
        const getProfile = async () => {
            try {
                const res = await Api.get(`/users/${userData.id}/profiles`);
                console.log(res.data);
                if (res.data) {
                    setProfile(res.data)
                }
            } catch (error) {
                console.log(error);
            }
        } 
        getProfile();
    }, [])

    useEffect(() => {
        console.log(profile)
    }, [profile])

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    width: '99%',
                    height: '99%',
                    borderWidth: 1,
                    borderColor: colors.primary
                }}
            >
                <ScrollView>
                    <List.Section>
                        <List.Accordion
                            title="Biografia"
                            left={props => null}
                            style={{
                                margin: 2,
                            }}
                        >
                            <TextInput
                                maxLength={200}
                                style={{
                                    maxHeight: 100,
                                }}
                                textAlignVertical="top"
                                left
                                numberOfLines={5}
                                placeholder="descreva sobre você!"
                                multiline
                                value={profile.biography}
                                onChangeText={text => setProfile({ ...profile, biography: text })}
                            />
                        </List.Accordion>
                        <List.Accordion title="Experiências" style={{ flex: 1 }} >
                            <View style={{ flex: 1, maxHeight: 200 }}>
                                <ScrollView>
                                    <DataTable>


                                        {
                                            (profile.items.length) ?
                                                <>
                                                    <DataTable.Header>
                                                        <DataTable.Title>Item</DataTable.Title>
                                                        <DataTable.Title>Descrição</DataTable.Title>
                                                    </DataTable.Header>

                                                    {
                                                        profile.items.map((item, index) => (
                                                            <DataTable.Row key={index}>
                                                                <DataTable.Cell>
                                                                    {item.title}
                                                                </DataTable.Cell>
                                                                <DataTable.Cell>
                                                                    {item.description}
                                                                </DataTable.Cell>
                                                            </DataTable.Row>
                                                        ))
                                                    }
                                                </> : null
                                        }
                                    </DataTable>
                                    <View>
                                    <TextInput
                                        mode='outlined'
                                        label="Título"
                                        value={title}
                                        onChangeText={(text) => setTitle(text)}
                                    />
                                    <TextInput
                                        mode='outlined'
                                        label="Descrição"
                                        value={description}
                                        onChangeText={(text) => setDescription(text)}
                                    />
                                    <Button onPress={addItem}>Adicionar Item</Button>
                                    </View>
                                </ScrollView>
                            </View>
                        </List.Accordion>
                        <List.Accordion title="Outras Informações">
                            <TextInput
                                maxLength={200}
                                style={{
                                    maxHeight: 100,
                                }}
                                textAlignVertical="top"
                                left
                                numberOfLines={5}
                                placeholder="apresente mais informações sobre você"
                                multiline
                                value={profile.otherInfo}
                                onChangeText={text => setProfile({ ...profile, otherInfo: text })}
                            />
                        </List.Accordion>
                    </List.Section>
                </ScrollView>
                <Card.Actions>
                    <Button
                        style={{
                            flex: 1,
                            backgroundColor: colors.primary
                        }}
                        color={colors.background}
                        onPress={onSave}
                    >Salvar</Button>
                </Card.Actions>
            </Card>
        </View>
    )
}
