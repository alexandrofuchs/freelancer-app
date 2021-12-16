import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import Api from '../../services/api';

export default function ServiceQuestionsPage({ navigation, route}){

    const [questions, setQuestions] = useState(null);
    const [answer, setAnswer] = useState('');
    

    const getQuestions = async () => {
        const res = await Api.get(`/services/${route.params.serviceId}/questions`);
        if(res.data){
            console.log(res.data.questions)
            setQuestions(res.data.questions);
        }
        
    }

    const onAnswer = async (id) => {
        await Api.put(`/questions/${id}/answer`,{
            answer
        });
    } 

    useEffect(()=>{
        getQuestions();
    },[])

    return(
        <>
            <FlatList 
                data={questions}
                renderItem={({ item })=>(
                    <Card>
                        <Text>{item.question}</Text>
                        <Text>{item.answer}</Text>
                        <TextInput value={answer} onChangeText={(text) => setAnswer(text)}></TextInput>
                        <Button onPress={() => onAnswer(item.id)} >Responder</Button>
                    </Card>
                )}
            />
        </>
    )
}