import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
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
            console.log(res);
            if (!!res.data) {
                setService(res.data.data);
            }

        } catch (err) {
            console.log(err)
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
        <Card style={{ width: '100%', flexDirection: 'column', borderRadius: 5}}>
            {/* <List.Accordion title="Descrição:"> */}

            <List.Section title="Descrição:">
                {/* <List.Item> */}
                    <Paragraph style={{padding: '2%'}}>
                     {service ? service.description : null}
                    </Paragraph>
                {/* </List.Item> */}
            </List.Section>
            {
                service ? (service.items.length ?
                <List.Section title="Itens:">
                    <ItemsComponent />
                </List.Section> : null ) : null
            }

            {/* <List.Section title="Dias e Horários:">
                <List.Item title={service ? service.days : null}></List.Item>
                <List.Item title={service ? service.schedule : null}></List.Item>
            </List.Section> */}
            {/* </List.Accordion> */}
        </Card>
    );

    const UserProfileComponent = () => (
        <List.Section title={'Ofertante'}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' , padding:'2%'}}>  
            <View style={{flexDirection:'row', alignItems:"center" }}>
            <Avatar.Image 
                size={50} 
                source={require('../../../assets/userProfilePicture.png')} 
            />
            <Headline style={{ fontSize: 15, padding: '2%'}}>{service ? service.User.firstName + ' ' + service.User.lastName : null}</Headline>
            </View>
            <Button
                onPress={() => navigation.navigate("UserProfile", { user: service.User })}
                style={{
                    justifyContent: 'center'
                }}>{'Perfil'}
            </Button>  
              
        </View>
        </List.Section>
    );

    const QuestionsComponent = () => {
        const [visible, setVisible] = React.useState(false);
        const [question, setQuestion] = useState("");

        const [questions, setQuestions] = useState(service ? service.Questions : null); 
       
        const onSendQuestion = async () => {
            try {
                const res = await Api.post(`/services/${service.id}/questions`,{
                    userId: userData.id,
                    question,
                });

                console.log(res);
                if(res.data){
                    setQuestions([...questions, res.data])
                }
                
            } catch (error) {
                console.log(error);
            }
        }
           
        const containerStyle = {backgroundColor: 'white', padding: 20};

        const QuestionFormComponent = () => (
                <View style={{flexDirection:'row'}}>
                  <TextInput 
                    style={{width: '70%'}}
                    mode="outlined" 
                    value={question}
                    contentContainerStyle={containerStyle}
                    onChangeText={value => setQuestion(value)}
                    //onChangeText={text => { setQuestion(text) }}    
                />
                    <View
                        style={{ backgroundColor: colors.primary, flex: 1, borderBottomEndRadius: 20, alignItems:"center",justifyContent:'center'}}
                    >
                        <Button
                            style={{ backgroundColor: colors.primary }}
                            color={colors.background}
                            onPress={onSendQuestion}>Enviar
                        </Button>
                    </View>
                </View>   
        );
       
        return (
                <Card style={{ borderBottomEndRadius: 20}}>
                    {
                        questions ?
                            questions.map( (item, index) => (
                                <View key={index}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Title>{item.userName}: </Title>
                                    <Text>{item.question}</Text>
                                </View>
                                
                                
                                { item.answer ? <List.Item title={item.answer} /> : null }
                                </View>
                            ))
                        : <List.Item title="Ainda não fizeram nenhuma pergunta!"/>
                    }
                    <QuestionFormComponent/>  
                </Card>
        )
    }

    const ReviewsComponent = () => {

        return (
            <View>
                {
                    service.Reviews ? service.Reviews.map ( (item, index) => (
                        <Card  key={index} style={{ flexDirection: 'row', padding: '2%'}}>
                            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                <Title>Titulo: {item.title}</Title>
                                <View style={{
                                width: '30%',
                                flexDirection:'row'}}>
                                {[1,2,3,4,5].map( (index) =>
                                    <Ionicons key={index} name={index <= item.grade ? "star" : "star-outline"} size={20} color={colors.primary} />
                                )}
                                 </View>
                            </View>
                                <Paragraph>Usuário: Alex </Paragraph>
                                <Paragraph>Descrição: {item.description}</Paragraph>
                                <Divider/>
                        </Card>
                    )) : null                    
                }
            </View>
            
                
        )
    }

    return (
        <View style={{ padding: '2%', height: '100%'}}>
            <ScrollView 
                contentContainerStyle={{ alignItems: 'stretch', justifyContent: 'space-between' }}
            >
            {/* <List.Accordion */}
                {/* title="Perfil do Ofertante: "
                left={props => null}
                style={{padding:'2%'}} */}
            {/* > */}
            <Divider/>
                <UserProfileComponent />
            {/* </List.Accordion> */}
                
            <ServiceDescriptionComponent />
            
            <List.Accordion
                title="Perguntas e Respostas: "
                left={props => null}
            >
            <Divider/>
                <QuestionsComponent />
            </List.Accordion>

            <List.Accordion
                title="Reviews: "
                left={props => null}
            >
            <Divider/>
                <ReviewsComponent/>
            </List.Accordion>
            <Button
                color={colors.background}
                style={{ borderRadius: 50, backgroundColor: colors.primary }}
                onPress={() => navigation.navigate("ServiceOrder", {
                    service
                })}
            >Solicitar Serviço</Button>
            </ScrollView>
        </View>
    );
};



