import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Card, Text, TextInput, Title } from 'react-native-paper';
import Api from '../../services/api';

export default function ServiceQuestionsPage({ navigation, route}){

    const [questions, setQuestions] = useState(null);
    const [answer, setAnswer] = useState('');
    const [edit, setEdit] = useState(false);    

    const getQuestions = async () => {
        const res = await Api.get(`/services/${route.params.serviceId}/questions`);
        if(res.data){
            setQuestions(res.data.questions);
        }        
    }

    const onAnswer = async (id) => {
        const res = await Api.put(`/questions/${id}/answer`,{
            answer
        });

        if(res.data){
            getQuestions();
        }
    } 

    useEffect(()=>{
        getQuestions();
    },[])

    return(
        <View style={{margin: 2}}>
            <FlatList 
                data={questions}
                renderItem={({ item })=>(
                    <View style={{margin: 2}}>
                        <Card>
                        <View style={{flexDirection:'row', alignItems:"center"}}>
                            <Title>{item.userName}: </Title>
                            <Text>{item.question}</Text>
                        </View> 
                                                   
                        <View style={{flexDirection:'row', alignItems:"center"}}> 
                        <Title>Resposta: </Title>                                                    
                            { edit ? 
                            
                                <TextInput mode='outlined' style={{height: 40, flex: 1}} value={item.answer} onChangeText={(text) => setAnswer(text)}></TextInput>
                             : <Text>{item.answer}</Text>
                            }   
                        </View> 
                        {!edit ? 
                                <Button onPress={() => {setEdit(true); setAnswer(item.answer | '')}}>{!item.answer ? 'Responder' : 'Editar'}</Button> : 
                                <Button onPress={() => { onAnswer(item.id); setEdit(false) }} >Responder</Button> }     
                    </Card>
                    </View>
                )}
            />
            
        </View>
    )
}