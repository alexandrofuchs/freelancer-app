import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import {
    DataTable,
    Text,
    Card,
    Avatar,
    Divider,
    Button,
    Title,
    Paragraph,
    Headline,
    Subheading,
    List,
    useTheme,
    Modal,
    Portal,
    Provider,
    TextInput
} from 'react-native-paper';
import { color } from 'react-native-reanimated';
import Api from '../../services/api';
import { useAuthenticate } from '../../contexts/UserContext';



export default function ServicePage({ route, navigation }) {

    const { colors } = useTheme();

    const { userData } = useAuthenticate();

    const [expanded, setExpanded] = useState(true);

    const [service, setService] = useState(null);

    const [serviceId, setServiceId] = useState(route.params.serviceId);

    const handlePress = () => setExpanded(!expanded);

    const getService = async () => {
        try {
            const res = await Api.get(`/services/${serviceId}`);
  
            if (!!res.data) {
                setService(res.data.data);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getService();
    }, [serviceId])

    useEffect(() => {
        service ? navigation.setOptions({ title: service.title }) : null;
    }, [service])

    const ItemsComponent = () => (
        <>
            <Title>Itens: </Title>
            {
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title>Descrição</DataTable.Title>
                    </DataTable.Header>

                    {
                        service ? service.items.map((item, index) =>
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{item.title} </DataTable.Cell>
                                <DataTable.Cell>{item.description}</DataTable.Cell>
                            </DataTable.Row>
                        ) : null
                    }
                </DataTable>
            }
        </>
    )

    const ServiceDescriptionComponent = () => (
        <View style={{ width: '100%', flexDirection: 'column', borderRadius: 5 }}>
            {/* <List.Accordion title="Descrição:"> */}

            <Title>Descrição: </Title>
            {/* <List.Item> */}
            <Paragraph style={{ padding: '2%' }}>
                {service ? service.description : null}
            </Paragraph>
            {/* </List.Item> */}

            {
                service ? (service.items.length) ?
                    <ItemsComponent />
                    : null : null
            }

            {/* <List.Section title="Dias e Horários:">
                <List.Item title={service ? service.days : null}></List.Item>
                <List.Item title={service ? service.schedule : null}></List.Item>
            </List.Section> */}
            {/* </List.Accordion> */}
        </View>
    );

    const UserProfileComponent = () => (
        <View><Title>Ofertante: </Title>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '2%' }}>

                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Avatar.Image
                        size={50}
                        source={require('../../../assets/userProfilePicture.png')}
                    />
                    <Headline style={{ fontSize: 15, padding: '2%' }}>{service ? service.User.firstName + ' ' + service.User.lastName : null}</Headline>
                </View>
                <Button
                    onPress={() => navigation.navigate("UserProfile", { user: service.User })}
                    style={{
                        justifyContent: 'center'
                    }}>{'Perfil'}
                </Button>
            </View>
        </View>
    );


    const [question, setQuestion] = useState("");

    const onSendQuestion = async () => {
        try {
            const res = await Api.post(`/services/${service.id}/questions`, {
                userId: userData.id,
                question,
            });

            if (res.data) {
                setService({ ...service, Questions: [...service.Questions, res.data] })
                setQuestion('');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const ReviewsComponent = () => {
        return (
            <View>
                {
                    service.Reviews && service.Reviews.length ? service.Reviews.map((item, index) => (
                        <Card key={index} style={{ flexDirection: 'row', padding: '2%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Title>Titulo: {item.title}</Title>
                                <View style={{
                                    width: '30%',
                                    flexDirection: 'row'
                                }}>
                                    {[1, 2, 3, 4, 5].map((index) =>
                                        <Ionicons key={index} name={index <= item.grade ? "star" : "star-outline"} size={20} color={colors.primary} />
                                    )}
                                </View>
                            </View>
                            <Paragraph>Descrição: {item.description}</Paragraph>
                            <Divider />
                        </Card>
                    )) : <View><Text>Este serviço ainda não obteve avaliações</Text></View>
                }
            </View>


        )
    }

    return (
        <Card
            style={{
                margin: '2%',
                borderRadius: 25,
                height: '98%',

            }}
        >
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.primary,
                    borderTopStartRadius: 25,
                    borderTopEndRadius: 25,
                    height: 40,
                }}>
                <Card.Title

                    title={'Detalhes do Serviço'}
                    titleStyle={{
                        alignItems: 'flex-end',
                        color: colors.background,
                        justifyContent: 'flex-end',
                        textAlign: 'center', flex: 1
                    }}
                ></Card.Title>
            </View>
            {/* <ScrollView
                contentContainerStyle={{ height: '100%', alignItems: 'stretch', justifyContent: 'space-between' }}
            > */}
                <Card.Content>
                    <UserProfileComponent />
                    <ServiceDescriptionComponent />
                    <List.AccordionGroup>
                        <List.Accordion
                            id={1}
                            title="Perguntas e Respostas: "
                            style={{
                                height: 40,
                                justifyContent: 'center',
                                backgroundColor: colors.surface
                            }}

                        >
                            <View style={{ maxHeight: 150 }}>
                                
                                    <View style={{ flexDirection: 'row', height: 40, }}>
                                        <TextInput
                                            style={{ flex: 1, height: 30, justifyContent: 'center' }}
                                            value={question}
                                            contentContainerStyle={containerStyle}
                                            placeholder='faça uma pergunta ao ofertante'
                                            onChangeText={value => setQuestion(value)}
                                        //onChangeText={text => { setQuestion(text) }}    
                                        />
                                        <Button
                                            style={{ height: 40 }}
                                            mode="contained"
                                            onPress={onSendQuestion}
                                            compact
                                        >Enviar</Button>

                                    </View>
                                    {
                                        <FlatList
                                            data={service ? service.Questions : null}
                                            renderItem={({item, index})=>(
                                                <View key={index}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Title>{item.userName}: </Title>
                                                        <Text>{item.question}</Text>
                                                    </View>


                                                    {item.answer ? <List.Item title={`  ${service ? service.User.firstName : null}: ${item.answer}`} /> : null}
                                                </View>
                                            )}
                                            ListEmptyComponent={() => <View style={{ height: 30, width: '100%' }}><Text>Não há Perguntas para este serviço</Text></View>}
                                        ></FlatList>                                        
                                    }

                            </View>
                        </List.Accordion>
                        <List.Accordion
                            id={2}
                            title="Reviews: "
                            style={{
                                height: 40,
                                justifyContent: 'center',
                                backgroundColor: colors.surface
                            }}
                        >
                            <Divider />
                            <ReviewsComponent />
                        </List.Accordion>
                    </List.AccordionGroup>
                </Card.Content>


            {/* </ScrollView> */}
            <Button
                color={colors.background}
                style={{
                    borderBottomStartRadius: 25,
                    borderBottomEndRadius: 25,
                    backgroundColor: colors.primary
                }}
                onPress={() => navigation.navigate("ServiceOrder", {
                    service
                })}
            >Solicitar</Button>
        </Card>
    );
};



