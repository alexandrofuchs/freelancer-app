import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Title, useTheme, Avatar, Headline, Divider, List, Button } from 'react-native-paper';
import Api from '../../services/api';
import User from '../User';
import { useAuthenticate } from '../../contexts/UserContext';
import { DataTable } from 'react-native-paper';

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
            console.log(res.data);
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
                borderRadius: 5,
                flex: 1
            }}
        >
            <Title
                style={{
                    textAlign: 'center',
                    padding: '5%',
                    borderTopStartRadius: 5,
                    backgroundColor: colors.primary,
                    color: colors.background
                }}>Ofertante</Title>
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
                        <List.Section title="Descrição:">
                            <Text>{profile && profile.biography.length ? profile.biography : "nada foi informado"}</Text>
                        </List.Section>
                        <Divider/>
                        <List.Section title="Outras Informações:">
                            <Text>{profile && profile.otherInfo.length ? profile.otherInfo : "nada foi informado"}</Text>                          
                        </List.Section>
                        <Divider/>
                        <List.Section title="Experiências:">
                            {
                                profile.items.length ?
                                <>
                                    <DataTable.Header>
                                        <DataTable.Title>Item</DataTable.Title>
                                        <DataTable.Title>Descrição</DataTable.Title>
                                    </DataTable.Header>
                                    {
                                        profile.items.map( (item, index) => (
                                            <DataTable.Row key={index}>
                                                   <DataTable.Cell>{item.title}</DataTable.Cell>
                                                   <DataTable.Cell>{item.description}</DataTable.Cell>
                                            </DataTable.Row> 
                                        ))                                                    
                                    }
                                </> : null
                            }
                    

                              
                        </List.Section>
                    </ScrollView>
                </View>
            </Card.Content>
        </Card>

    )
}