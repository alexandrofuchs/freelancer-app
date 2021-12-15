import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Card, Title, Button, useTheme } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';

export default function ContractedServicesPage({ navigation }) {

    const { userData } = useAuthenticate();

    const { colors } = useTheme();

    const [contractedServices, setContractedServices] = useState(null);

    const getContractedServices = async () => {
        try {
            const res = await Api.get(`/users/${userData.id}/serviceOrders`);

            if (res.data) {
                console.log(res);
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

    return (
        <View>
            {
                contractedServices ? contractedServices.map((item, index) => (
                    <Card style={{ margin: 10, borderRadius: 25, borderWidth: 1, borderColor:colors.primary}}
                        onPress={() => navigation.navigate("ContractedService",{
                            serviceOrderId: item.id,
                        })}
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
                            {
                                item.status === 'pending' ?
                                <View
                                    
                                ><Text style={{color:'blue'}}>Situação: Pendente</Text></View>
                                :
                                item.status === 'accepted' ?
                                <View><Text style={{color:'green'}}>Situação: Confirmado</Text></View>    
                                :

                                <Button 
                                style={{width: '100%', backgroundColor: colors.primary}}
                                color={colors.background}
                                onPress={() => navigation.navigate("Review",{
                                    serviceId : item.service.id 
                                })}
                                >Avaliar</Button>
                            }
                            
                        </Card.Actions>

                    </Card>

                )) : null
            }
        </View>
    )
}