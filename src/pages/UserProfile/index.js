import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Title, useTheme, Avatar, Headline, Divider, List, Button, Subheading } from 'react-native-paper';
import Api from '../../services/api';
import User from '../User';
import { useAuthenticate } from '../../contexts/UserContext';
import { DataTable } from 'react-native-paper';
import { color } from 'react-native-reanimated';

export default function UserProfile({ route, navigation }) {

    const { userData } = useAuthenticate();

    const [user, setUser] = useState(route.params.user ? route.params.user : userData);
    const [profile, setProfile] = useState({
        biography: "",
        createdAt: "",
        id: "",
        items: [],
        otherInfo: "",
        updatedAt: "",
        userId: "",
    });

    const { colors } = useTheme();

    const getProfile = async () => {
        try {
            const res = await Api.get(`/users/${user.id}/profiles`);
   
            if (res.data) {
                setProfile(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile();
    }, [user]);

    return (
        <Card
            style={{
                margin: '2%',
                borderRadius: 25,
                flex: 1
            }}
        >
            <View style={{
                backgroundColor: colors.primary,
                borderTopStartRadius: 25,
                borderTopEndRadius: 25,
                textAlign: 'center',
                height: 40,
            }}
            >
                <Card.Title
                    title={'Perfil do Ofertante'}
                    titleStyle={{ color: colors.background, flex: 1, alignSelf: 'center' }}
                ></Card.Title>
            </View>
            <Card.Content >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ height: '100%', width: '70%' }}>
                        <Avatar.Image size={60} source={require('../../../assets/userProfilePicture.png')} />
                        <Headline style={{ fontSize: 15 }}>{user ? user.firstName + ' ' + user.lastName : null}</Headline>
                    </View>
                    <Divider />
                </View>
                <View>
                    <ScrollView>
                        {/* <List.Section title="Descrição:"> */}
                        <Title>Descrição:</Title>
                        <Text>{profile && profile.biography.length ? profile.biography : "nada foi informado"}</Text>
                        {/* </List.Section> */}
                        <Divider />
                        <Title>Outras Informações:</Title>
                        <Text>{profile && profile.otherInfo.length ? profile.otherInfo : "nada foi informado"}</Text>
                        {/* </List.Section> */}
                        <Divider />
                        {/* <List.Section title="Experiências:"> */}

                        {
                            profile.items.length ?
                                <ScrollView>
                                    <Title>Experiências:</Title>
                                    {

                                        profile.items.map((item, index) => (
                                            <View key={index}>


                                                <Subheading style={{ fontWeight: "bold" }}>
                                                    {item.title}
                                                </Subheading>



                                                <Text>
                                                    {item.description}
                                                </Text>

                                            </View>
                                        ))
                                    }
                                </ScrollView> : null
                        }



                        {/* </List.Section> */}
                    </ScrollView>
                </View>
            </Card.Content>
        </Card>

    )
}