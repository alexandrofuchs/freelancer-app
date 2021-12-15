import React, { createRef, useEffect, useRef, useState } from 'react';
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
    Subheading,
    Divider,
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
        if (!!title.length && !!description.length) {
            setProfile({ ...profile, items: [...profile.items, { title, description }] })
            setTitle('');
            setDescription('');
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

    const inputDescriptionRef = createRef();  
    const inputBiographyRef = createRef(); 
    const inputOtherInfoRef = createRef();   
    const [editBiography, setEditBiography] = useState(false); 
    const [editOtherInfo, setEditOtherInfo] = useState(false); 

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
                <Card.Content>                
                    <Title>Biografia:</Title>
                    <Subheading>Prévia: </Subheading>
                    <Text
                    >{profile.biography}</Text>
                    <TextInput
                        editable={editBiography}
                        mode='outlined'
                        maxLength={200}
                        style={{
                            maxHeight: 100,
                        }}
                        textAlignVertical="top"
                        left
                        numberOfLines={5}
                        placeholder="descreva sobre você!"
                        multiline
                        onSubmitEditing={() => inputOtherInfoRef.current.focus()}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        value={profile.biography}
                        onChangeText={text => setProfile({ ...profile, biography: text })}
                    />
                    <Button onPress={() => setEditBiography(!editBiography)}>Editar</Button>
                    <Title>Outras Informações:</Title>
                    <Text>{profile.otherInfo}</Text>
                    <TextInput
                        editable={editOtherInfo}
                        ref={inputOtherInfoRef}
                        mode='outlined'
                        maxLength={200}
                        style={{
                            maxHeight: 100,
                        }}
                        textAlignVertical="top"
                        left
                        numberOfLines={5}
                        textContentType={'URL'}
                        placeholder="outras informações"
                        multiline
                        value={profile.otherInfo}
                        onChangeText={text => setProfile({ ...profile, otherInfo: text })}
                    />
                    <Button onPress={() => setEditOtherInfo(!editOtherInfo)}>Editar</Button>
                    <Title>Experiências:</Title>

                    <View style={{ flex: 1, maxHeight: 400 }}>
                        <ScrollView>
                            <Divider/>
                            <DataTable>
                                {
                                    profile.items.map((item, index) => (
                                        <View key={index}>
                                        <DataTable.Row>
                                            <DataTable.Cell>
                                                <Subheading style={{fontWeight:'bold'}}>{item.title}: </Subheading>                                             
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row>
                                            <DataTable.Cell>
                                                <View style={{flex: 1}}><Text>{item.description}</Text></View>
                                                
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        </View>
                                    ))
                                }
                            </DataTable>
                            </ScrollView>
                            <View style={{padding: '2%', borderRadius:5}}>
                                <TextInput
                                    style={{height:40}}
                                    mode='outlined'
                                    label="Título"
                                    value={title}
                                    returnKeyType="next"
                                    onSubmitEditing={() => inputDescriptionRef.current.focus()}
                                    onChangeText={(text) => setTitle(text)}
                                    blurOnSubmit={false}
                                />
                                <TextInput
                                    ref={inputDescriptionRef}
                                    style={{height:40}}
                                    mode='outlined'
                                    label="Descrição"
                                    value={description}
                                    onChangeText={(text) => setDescription(text)}
                                />
                                <Button 
                                    mode="contained" 
                                    onPress={addItem}
                                    style={{borderBottomLeftRadius:25, borderBottomEndRadius: 25}}
                                    disabled={!(!!title && !!description)}
                                    >Adicionar Item</Button>
                            </View>
                        
                    </View> 
                
                </Card.Content>
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
                </ScrollView>
                
            </Card>
        </View>
    )
}
