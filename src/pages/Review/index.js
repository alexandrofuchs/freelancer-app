import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, Title, useTheme } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Api from '../../services/api';
import { useAuthenticate } from '../../contexts/UserContext';
import { ScrollView } from 'react-native-gesture-handler';

export default function ReviewPage({ navigation, route }) {

    const [currentGrade, setCurrentGrade] = useState(3);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { userData } = useAuthenticate();
    const { colors } = useTheme();

    const grades = [1, 2, 3, 4, 5];

    const onSendReview = async () => {
        try {
            const res = await Api.post(`/services/${route.params.serviceId}/reviews`,{
                userId: userData.id,
                grade: currentGrade,
                title,
                description
            })

            if(res.data){
                navigation.pop();
            }

        } catch (error) {
            console.log(error)
        }
    }

    const GradeComponent = () => (
        <View>
            
            <Title>Nota: </Title>
            <View style={{ flexDirection: 'row', padding: 0, alignItems: 'center', justifyContent: 'center' }}>
                {
                    grades.map((item, index) => (
                        <Ionicons
                            key={index}
                            onPress={() => setCurrentGrade(item)}
                            name={(item <= currentGrade) ? "star" : "star-outline"}
                            size={50}
                            color={colors.primary}
                        />
                    ))
                }
            </View>
        </View>
    );

    return (
        <View style={{padding: '2%' }}>
            <ScrollView>
            <GradeComponent />
            <Title>Titulo: </Title>
            <TextInput
                mode='outlined'  
                onChangeText={text => setTitle(text)}            
            />
            <Title>Descrição: </Title>
            <TextInput
                mode='outlined'
                multiline
                numberOfLines={10}
                onChangeText={text => setDescription(text)} 
            />
            <Button
                mode='outlined'
                style={{backgroundColor:colors.primary, padding: '1%', marginVertical: '2%'}}
                color={colors.background}
                onPress={onSendReview}
            >Enviar</Button>
            </ScrollView>
        </View>
    )
}