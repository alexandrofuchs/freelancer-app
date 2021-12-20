import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Api from '../../services/api';

export default function ContractedServicePage({ navigation, route}){
    
    const [serviceOrder, setServiceOrder] = useState(null);

    const getService = async () => {
        try {

            const res = await Api.get(`/serviceOrders/${route.params.serviceOrderId}`);

            //console.log(res);

            if(res.data){
                setServiceOrder(res.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getService();
    },[])
    
    return(
        <View>
            <Text>ContractedService</Text>
            <Button onPress={() => navigation.navigate('Chat', {
                serviceOrderId: serviceOrder.id
            })}>Chat</Button>
        </View>
    )
}