import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
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
        console.log(res);
    }

    useEffect(()=>{
        getServices();
    },[])

    return(
        <>
        {
            services.map( (item, index) => (
                <Card key={index} style={{ margin: '2%', borderRadius: 5, alignItems:'center'}}>
                    <Card.Content>
                        <Text>{item.title}</Text>
                    </Card.Content>                    
                    <Card.Actions>
                        <Button onPress={() => navigation.navigate("CreateService",{
                            service: item
                        },{ options: { title: 'Editar Serviço'}})}>Editar</Button>
                        <Button>Excluir</Button>
                    </Card.Actions>
             
                </Card>
            ))
        }    
        </>
    )
}