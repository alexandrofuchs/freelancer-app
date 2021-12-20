import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { 
    Card,
    Text,
    Button,
} from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';

export default function UserServiceListPage({ navigation }){

    const [services, setServices] = useState([]);
    const { userData } = useAuthenticate();

    const getServices = async () => {
        const res = await Api.get(`/users/${userData.id}/services`);

        if(res.data){
            setServices(res.data);
        }

    }

    useEffect(()=>{
        getServices();
    },[])

    return(
        <>
            <FlatList
                data={services}
                renderItem={ ({ item, index } ) => (
                    <Card key={index} style={{ margin: '2%', borderRadius: 5, alignItems:'center'}}>
                        <Card.Content>
                            <Text>{item.title}</Text>
                        </Card.Content>                    
                        <Card.Actions>
                            <Button 
                                mode='contained'
                                onPress={() => navigation.navigate("CreateService",{
                                serviceId: item.id
                            },{ options: { title: 'Editar Serviço'}})}>Editar</Button>
                            <Button onPress={() => navigation.navigate("ServiceQuestions",{
                                serviceId: item.id
                            })}>Perguntas</Button>
                        </Card.Actions>
                 
                    </Card>)
                }
                ListEmptyComponent={() => <View style={{flex: 1, alignItems:"center" }}><Text>Sua Lista de Serviços está vazia</Text></View>}
            ></FlatList>
        </>
    )
}