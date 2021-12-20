import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Text, Card, Title, Button, useTheme } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';

export default function ContractedServicesPage({ navigation }) {

    const { userData } = useAuthenticate();

    const { colors } = useTheme();

    const [contractedServices, setContractedServices] = useState(null);

    const getContractedServices = async () => {
        try {
            const res = await Api.get(`/contracting/${userData.id}/serviceOrders`);

            if (res.data) {
                setContractedServices(res.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setContractedServices(null);
        getContractedServices();
    }, [])

    const renderItem = ({ item, index }) => (
        <Card key={index} style={{ margin: 10, borderRadius: 25, borderWidth: 1, borderColor:colors.primary}}
            // onPress={() => navigation.navigate("ContractedService",{
            //     serviceOrderId: item.id,
            // })}
        >
            <Card.Content>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Title>Serviço: </Title>
                    <Text>{item.service ? item.service.title : null}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Title>Ofertante: </Title>
                    <Text>{item.userService ? item.userService.firstName : null}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Title>Horário Desejado: </Title>
                    <Text >{item.date}, {item.hour}</Text>
                </View>
            </ScrollView>
            </Card.Content>

            <Card.Actions style={{justifyContent: 'center'}} >
                <View style={{flexDirection:'column', flexGrow: 1, alignItems:'center'}}>
                <Button 
                        style={{margin: 2, width:'100%'}}
                        mode='outlined'
                        onPress={() => navigation.navigate('Chat', { serviceOrderId: item.id })}>Chat</Button>
                {
                    item.status === 'pending' ?
                    <Text style={{color:'blue'}}>Situação: Pendente</Text>
                    :
                    item.status === 'accepted' ?
                    <Text style={{color:'green'}}>Situação: Confirmado</Text>
                    :
                    <Button 
                        style={{margin: 2, width:'100%'}}
                        mode='contained'
                        onPress={() => navigation.navigate("Review",{
                            serviceId : item.service.id 
                        })}
                    >Avaliar</Button>
                }
                </View>
            </Card.Actions>

        </Card>
    )

    return (
        <View>
            <FlatList
                data={contractedServices}
                renderItem={renderItem}
            />
        </View>
    )
}