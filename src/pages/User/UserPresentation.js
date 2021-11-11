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

export default function UserPresentation({ navigation }) {

    const { colors } = useTheme();
    const { userData } = useAuthenticate();

    const [textBiografy, setTextBiografy] = useState('');
    const [textOtherInfos, setTextOtherInfos] = useState('');

    const [profile, setProfile] = useState(null);

    const onSave = async () => {
        const res = await Api.post(`/users/${userData.id}/profiles`,{
            otherInfos: textOtherInfos,
            biografy: textBiografy,
        });
        if(res.data){
            navigation.navigate("UserAccount");
        }
    }

    useEffect(()=>{
        const getProfile = async () => {
            const res = await Api.get(`/users/${userData.id}/profiles`);

            console.log(res);

            if (res.data) {
                if(res.data.user){
                    if(res.data.user.profile){
                        setTextBiografy(res.data.user.profile.biografy);
                        setTextOtherInfos(res.data.user.profile.otherInfos);
                    }
                }
               
            }
        }
        getProfile();
    },[])

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
                                    height: 200,
                                    margin: 2,

                                }}
                                multiline
                                value={textBiografy}
                                onChangeText={text => setTextBiografy(text)}
                            />
                        </List.Accordion>
                        <List.Accordion
                            title="Experiência"
                            left={props => null}>
                            <List.Item title="First item" />
                            <List.Item title="Second item" />
                        </List.Accordion>
                        <List.Accordion title="Outras Informações">
                            <TextInput
                                maxLength={200}
                                style={{
                                    height: 200,
                                    margin: 2,
                                }}
                                multiline
                                value={textOtherInfos}
                                onChangeText={text => setTextOtherInfos(text)}
                            />
                        </List.Accordion>
                    </List.Section>
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
