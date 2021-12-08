import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
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
        getContractedServices();
    }, [])


    return (
        <View>
            {
                contractedServices ? contractedServices.map((item, index) => (
                    <Card
                        key={index}
                        style={{
                            borderRadius: 20,
                            margin: '2%',
                        }}
                        onPress={() => navigation.navigate("ContractedService",{
                            serviceOrderId: item.id,
                        })}
                    >
                        <Card.Content>

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
                                <Text >{item.date}</Text>
                            </View>
                        </Card.Content>

                        <Card.Actions style={{justifyContent: 'center'}} >
                            {
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