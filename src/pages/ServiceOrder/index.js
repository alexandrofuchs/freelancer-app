import React, { useEffect, useState } from 'react';
import { View, Platform,} from 'react-native';
import { Text, Button, TextInput, IconButton, Title, Subheading, Divider, Card, useTheme, Headline } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';

import DateTimePicker from '@react-native-community/datetimepicker';

import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../../services/api';
import { color } from 'react-native-reanimated';


export default function ServiceOrderPage({ navigation, route }) {

    const { colors } = useTheme();
    const { userData } = useAuthenticate();

    const [service, setService] = useState(route.params.service? route.params.service : null);

    const[errorDate, setErrorDate] = useState(null);
    const[errorHour, setErrorHour] = useState(null);

    const { schedule } = service;

    const weekDays = [
        {
            label:'Domingo',
            value: schedule.sunday
        },{
            label:'Segunda',
            value: schedule.monday,
        },{
            label:'Terça',
            value: schedule.tuesday,
        },{
            label:'Quarta',
            value: schedule.wednesday,
        },{
            label:'Quinta',
            value: schedule.thursday,
        },{
            label:'Sexta',
            value: schedule.friday,
        },
        {
            label:'Sábado',
            value: schedule.saturday,
        }]
        
    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [open, setOpen] = useState(false);
    const [hour, setHour] = useState(null);
    
    const [items, setItems] = useState([
      {label: '18:30', value: '18:30'},
      {label: '19:30', value: '19:30'}
    ]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onSendOrder = async () => {
        const res= await Api.post('/serviceOrders',{
            userServiceId: service.User.id,
            userId: userData.id,
            serviceId:service.id,
            date: date.toLocaleDateString(),
            hour: date.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' }).substring(0,5)    
        });

        if(res.data){
            navigation.pop();
        }
    }


   

    useEffect(()=>{

        if(!!schedule.active){
            if(!weekDays[date.getDay()].value){
                setErrorDate('O dia desejado não está disponivel!');
            }else{
                setErrorDate(null);
            }
            if(date.toLocaleTimeString() < schedule.startTime | date.toLocaleTimeString() > schedule.endTime){
                setErrorHour('O horário desejado não está disponivel!');
            }else{
                setErrorHour(null);
            }
        }
    },[date])

    return (
        <Card style={{margin: '2%', borderRadius:25}}>
            <Title style={{textAlign:'center', textAlignVertical:'center', color: colors.background, backgroundColor:colors.primary, width: '100%', padding: 5, borderTopRightRadius:25, borderTopLeftRadius:25}}>Agendar</Title>
            <Text> Serviço: { service ? service.title : null } </Text>
            <Text> Ofertante: { service ? service.User.firstName : null } </Text>
            <Text> Contratante: { userData.firstName } </Text>
            <Divider/>
            <Title> Agenda do Ofertante: </Title>
            
            {
                schedule.active ?
                
                (
                    <>
                    <Subheading style={{fontWeight:'bold'}}>Dias da Semana: </Subheading>
                    <View style={{flexDirection:'row'}}>
               
                    {
                        weekDays.map( (item, index) => (
                            item.value ? <Subheading key={index}> { `${item.label} ${index === weekDays.length-1 ? '.': ', '}` }</Subheading> : null
                        ))
                    }
                    </View>
                    </>
                ) : <View><Text>O ofertante não expecificou um cronograma!</Text></View>
            }
            
           
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Subheading style={{fontWeight:'bold'}}>Horários: </Subheading>
                <Subheading>{schedule.startTime.substring(0, 5)} - { schedule.endTime.substring(0, 5)}</Subheading>
            </View>
            <Divider/>
            <Title>Dia Desejado: </Title>
            <View style={{flexDirection: "row", width: '100%', alignItems: 'center', justifyContent: 'space-between'}} >
                <TextInput 
                    mode="outlined"
                    editable={false}
                    error={errorDate}
                    label="Data: "
                    value={`${weekDays[date.getDay()].label}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`} 
                    style={{flex: 1}}
                ></TextInput>
                <IconButton icon="calendar" onPress={showDatepicker} icon-size="20" />                
            </View>
            <Text style={{color:'red'}}>{errorDate}</Text>
            <Divider/>
            <Title>Horário Desejado: </Title>
            <View style={{flexDirection: "row", width: '100%', alignItems: 'center', justifyContent: 'space-between'}} >
                <TextInput 
                    mode="outlined"
                    editable={false}
                    error={errorHour}
                    label="Horário: "
                    value={date.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' }).substring(0,5)} 
                    style={{flex: 1}}
                ></TextInput>
                <IconButton icon="clock-outline" onPress={showTimepicker} icon-size="20" />  
            </View>
            <Text style={{color:'red'}}>{errorHour}</Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={Date.now()}
                />
            )}          
                <Button 
                    mode='contained'
                    onPress={onSendOrder} 
                    style={{width: '100%', borderBottomStartRadius: 25, borderBottomEndRadius: 25}}
                    disabled={errorDate || errorHour}   
                >Solicitar Ao Ofertante</Button>        
        </Card>
    );
};