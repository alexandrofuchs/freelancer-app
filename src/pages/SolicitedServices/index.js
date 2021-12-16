import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Title, Button, useTheme, ToggleButton, Divider, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../contexts/AppContext';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';

export default function SolicitedServicesPage({ navigation, route }) {



    const { userData } = useAuthenticate();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true);

    const [contractedServices, setContractedServices] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const getContractedServices = async () => {
        try {

            setLoading(true);

            if (selectedFilter === 'all') {
                const res = await Api.get(`/offerer/${userData.id}/serviceOrders`);

                if (res.data) {
                    setContractedServices(res.data);
                }

            } else {
                const res = await Api.get(`/offerer/${userData.id}/serviceOrders?filter=${selectedFilter}`);

                if (res.data) {
                    setContractedServices(res.data);
                }
            }

            setLoading(false);


        } catch (error) {
            console.log(error);
        }
    }


    const onAccepted = async (id) => {
        console.log(id)
        const res = await Api.put(`/serviceOrders/${id}/accepted`);
        if(res.data){
            getContractedServices();
        }
        console.log(res);
    }

    
    const onCancelled = async (id) => {
        console.log(id)
        const res = await Api.put(`/serviceOrders/${id}/cancelled`);
        console.log(res);
    }    

    const onConcluded = async (id) => {
        console.log(id)
        const res = await Api.put(`/serviceOrders/${id}/concluded`);
        console.log(res);
    }

    const onReschedule = async (id) => {
        const res = await Api.put(`/serviceOrders/${id}/rescheduled`, {
            date: '20/10/2021',
            hour: '18:00'
        });
        console.log(res);
    }

    // useEffect(() => {        
    //     setLoading(true)
    //     getContractedServices().then(() => setLoading(false));        
    // }, [])

    useEffect(() => {
        setLoading(true)
        getContractedServices().then(() => setLoading(false));
    }, [selectedFilter])

    const [visible, setVisible] = useState(false);

    const openMenu = () => {
        setVisible(true);
    }

    const closeMenu = () => {
        setVisible(false);
    }


    const renderItem = ({ item, index }) => (
        <SafeAreaView>
            <Card
                key={index}
                style={{
                    borderRadius: 20,
                    margin: '2%',
                }}
                onPress={() => navigation.navigate("ContractedService", {
                    serviceOrderId: item.id,
                })}
            >
                <Card.Content>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Title>Serviço: </Title>
                        <Text>{item.service ? item.service.title : null}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Title>Contratante: </Title>
                        <Text>{item.user ? item.user.firstName : null}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Title>Horário Desejado: </Title>
                        <Text >{item.date}</Text>
                    </View>
                </Card.Content>

                <Card.Actions style={{ justifyContent: 'center' }} >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <ToggleButton.Group>
                            {
                                item.status === 'pending' ?
                                    <ToggleButton.Row>
                                        <Button
                                            mode='contained'
                                            style={{ margin: 2 }}
                                            onPress={() => onAccepted(item.id)}
                                        >Aceitar</Button>

                                        {/* <Button
                                            mode='contained'
                                            style={{ margin: 2 }}
                                            onPress={() => onReschedule(item.id)}
                                        >Reagendar</Button> */}

                                        <Button
                                            mode='contained'
                                            style={{ margin: 2 }}
                                            onPress={() => onCancelled(item.id)}
                                        >Rejeitar</Button>
                                    </ToggleButton.Row>


                                    : null
                            }
                            {
                                item.status === 'accepted' ?
                                    <ToggleButton.Row>
                                        <Button
                                            mode='contained'
                                            style={{ margin: 2 }}
                                            onPress={() => onConcluded(item.id)}
                                        >Concluído</Button>
                                        <Button
                                            mode='contained'
                                            style={{ margin: 2 }}
                                            onPress={() => onCancelled(item.id)}
                                        >Não Concluído</Button>
                                    </ToggleButton.Row> : null
                            }
                             <Button
                                mode='outlined'
                                style={{ margin: 2 }}
                                onPress={() => navigation.navigate("Chat", {
                                    serviceOrderId: item.id
                                })}
                            >Mensagem</Button>
                        </ToggleButton.Group>
                    </View>
                </Card.Actions>

            </Card>
        </SafeAreaView>
    )

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View>
            <ToggleButton.Row style={{ justifyContent: 'center' }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button icon={'filter-variant'} onPress={openMenu}>Filtrar</Button>}>
                    <Menu.Item
                        disabled={selectedFilter === 'all'}
                        onPress={() => setSelectedFilter('all')}
                        title="Todos"
                    />
                    <Menu.Item
                        disabled={selectedFilter === 'accepted'}
                        onPress={() => setSelectedFilter('accepted')}
                        title="Confirmados"
                    />
                    <Menu.Item
                        onPress={() => setSelectedFilter('pending')}
                        title="Pendentes"
                        disabled={selectedFilter === 'pending'}
                    />
                    <Menu.Item
                        disabled={selectedFilter === 'concluded'}
                        onPress={() => setSelectedFilter('concluded')}
                        title="Concluídos"
                    />
                </Menu>
                <Button icon={'calendar'}>Cronograma</Button>
            </ToggleButton.Row>
            <FlatList
                style={
                    { flexGrow: 1 }
                }
                //ListHeaderComponent={renderHeader}
                data={contractedServices}

                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={() => <View><Text>Você não possui nenhuma solicitação</Text></View>}
            >

            </FlatList>

        </View>
    )
}