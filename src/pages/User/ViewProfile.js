import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    Button,
    Text,
    TextInput,
    List,
    useTheme,
    Card
} from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';

export default function ViewProfile() {

    const { colors } = useTheme();
    const { userData } = useAuthenticate();
    const [profile, setProfile] = useState(null);

    const [textBiografy, setTextBiografy] = useState('');

    useEffect(() => {
        const getProfile = async () => {
            const res = await Api.get(`/users/${userData.id}/profiles`);

            console.log(res);
            if (res.data) {
                setProfile(res.data.user.profile)
            }
        }
        getProfile();
    }, [])

    useEffect(() => {
        console.log(profile.biografy)
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
                {
                    !profile ?
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>Você ainda não criou seu perfil!</Text>
                        </View>
                        :
                        <ScrollView>
                            <List.Section>
                                <List.Accordion
                                    title="Biografia"
                                    left={props => null}
                                    style={{
                                        margin: 2,
                                    }}
                                >
                                    <Text
                                        style={{
                                            height: 200,
                                            margin: 2,
                                        }}                                        
                                    >{profile.biografy}</Text>
                                </List.Accordion>
                                <List.Accordion
                                    title="Experiência"
                                    left={props => null}>
                                    <List.Item title="First item" />
                                    <List.Item title="Second item" />
                                </List.Accordion>
                                <List.Accordion title="Outras Informações">
                                    <Text
                                        maxLength={200}
                                        style={{
                                            height: 200,
                                            margin: 2,
                                        }}
                                        value={''}
                                        onChangeText={text => setTextBiografy(text)}
                                    />
                                </List.Accordion>
                            </List.Section>
                            {/* <Card.Actions>
                             <Button
                                 style={{
                                     flex: 1,
                                     backgroundColor: colors.primary
                                 }}
                                 color={colors.background}
                             >Salvar</Button>
                         </Card.Actions> */}
                        </ScrollView>
                }

            </Card>
        </View>
    )
}
