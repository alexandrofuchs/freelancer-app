import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView, ActivityIndicator} from 'react-native';
import { Text, Card, Title, Button, useTheme, ToggleButton, Divider, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../contexts/AppContext';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';

export default function ContractedServicesPage({ navigation, route }) {

    const { userData } = useAuthenticate();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(true);

    const [contractedServices, setContractedServices] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const getContractedServices = async () => {
        try {
            
            setLoading(true);

            if (selectedFilter === 'all') {
                const res = await Api.get(`/users/${userData.id}/serviceOrders`);

                if (res.data) {
                    setContractedServices(res.data);
                }

            } else {
                const res = await Api.get(`/users/${userData.id}/serviceOrders?filter=${selectedFilter}`);

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
        const res = await Api.put(`/serviceOrders/${id}`);
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
                <ToggleButton.Row>
                    {
                        item.status === 'pending' ?
                            <>
                                <Button
                                    style={{ backgroundColor: colors.primary, margin: 2 }}
                                    color={colors.background}
                                    onPress={() => onAccepted(item.id)}
                                >Aceitar</Button>

                                <Button
                                    style={{ backgroundColor: colors.primary, margin: 2 }}
                                    color={colors.background}
                                    onPress={() => onAccepted(item.id)}
                                >Alterar</Button>
                            </>


                            : null


                    }
                    {
                        item.status === 'accepted' ?

                            <Button
                                style={{ backgroundColor: colors.primary, margin: 2 }}
                                color={colors.background}
                                onPress={() => onAccepted(item.id)}
                            >Concluído</Button> : null
                    }
                    {
                        item.status === 'refused' ?

                            <Button
                                style={{ backgroundColor: colors.primary, margin: 2 }}
                                color={colors.background}
                                onPress={() => onAccepted(item.id)}
                            >Ajustar</Button> : null
                    }
                    <Button
                        style={{ backgroundColor: colors.primary, margin: 2 }}
                        color={colors.background}
                        onPress={() => navigation.navigate("Chat", {
                            serviceOrderId: item.id
                        })}
                    >Mensagem</Button>
                </ToggleButton.Row>
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
                    {flexGrow: 1}
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