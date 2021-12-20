import React, { useState, useEffect } from 'react';
import { isDate, isEmpty, isNumber } from 'lodash';

import { View, ScrollView } from 'react-native';
import {
    Button,
    Divider,
    Paragraph,
    Text,
    TextInput,
    Title,
    useTheme,
    HelperText,
    Card,
    Checkbox,
    Switch,
    ToggleButton,
    DataTable,
    List,
    RadioButton,
    Subheading,
    FAB,
    Chip,
    Menu,
    ActivityIndicator,
} from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';

export default function CreateServicePage({ navigation, route }) {

    const { userData } = useAuthenticate();

    const { colors } = useTheme();

    const [fixedSchedule, setFixedSchedule] = useState(false);

    const [selectedHour, setSelectedHour] = useState({
        start: '00:00',
        end: '00:00',
    });

    const [fields, setFields] = useState({
        id: null,
        title: "",
        abstract: "",
        description: "",
        typeService:"",
        schedule: {
            active: false,
            startTime: '00:00',
            endTime: '00:00',
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
        },
        userId: "",
        items: []
    });

    const getService = async (id) => {
        const res = await Api.get(`/services/${id}`);
    
        if (res.data) {
            setFields(res.data.data);
        }

    }

    const [error, setError] = useState(null);
    
    const weekDays = [
       'Domingo',
       'Segunda-Feira',
       'Terça-Feira',
       'Quarta-Feira',
       'Quinta-Feira',
       'Sexta-Feira',
       'Sábado',
    ]

    const [selectedServiceType, setSelectedServiceType] = useState('');

    const hours = [
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
    ]


    const hasErrors = () => {
        return isEmpty(fields.title);
    };

    const onSend = async () => {
        try {

            let res = null;
            if(fields.id){

               res = await Api.post(`users/${userData.id}/services/${fields.id}`, {
                    title: fields.title,
                    abstract: fields.abstract,
                    description: fields.description,
                    items: fields.items,
                    schedule: fields.schedule,
                    typeService: fields.typeService,
                });
            }else{
                res = await Api.post(`users/${userData.id}/services`, {
                    title: fields.title,
                    abstract: fields.abstract,
                    description: fields.description,
                    items: fields.items,
                    schedule: fields.schedule,
                    typeService: fields.typeService,
                });

            }

            if (res.error) {
                setError(res.error);
                return;
            }

            if (res.data) {
                navigation.navigate("UserAccount");
            }

        } catch (error) {
            console.log(error);
        }
    }

    const [errorStartTime, setErrorStartTime] = useState('');
    const [errorEndTime, setErrorEndTime] = useState('');

    const [loading, setLoading] = useState(false);

    const setWeekDay = (item) => {
        item === 'Seg' ? setFields({ ...fields, schedule: { ...fields.schedule, monday: !fields.schedule.monday}}) :
        item === 'Ter' ? setFields({ ...fields, schedule: { ...fields.schedule, tuesday: !fields.schedule.tuesday}}) :
        item === 'Qua' ? setFields({ ...fields, schedule: { ...fields.schedule, wednesday: !fields.schedule.wednesday}}) :
        item === 'Qui' ? setFields({ ...fields, schedule: { ...fields.schedule, thursday: !fields.schedule.thursday}}) :
        item === 'Sex' ? setFields({ ...fields, schedule: { ...fields.schedule, friday: !fields.schedule.friday}}) :
        item === 'Sab' ? setFields({ ...fields, schedule: { ...fields.schedule, saturday: !fields.schedule.saturday}}) :
        setFields({schedule: { ...fields.schedule, sunday: !fields.schedule.sunday}}) 

    }

    const getWeekDay = (item) => {
        return item === 'Seg' ? fields.schedule.monday :
            item === 'Ter' ? fields.schedule.tuesday :
            item === 'Qua' ? fields.schedule.wednesday :
            item === 'Qui' ? fields.schedule.thursday:
            item === 'Sex' ? fields.schedule.friday:
            item === 'Sab' ? fields.schedule.saturday :
                            fields.schedule.sunday 

    }

    useEffect(()=>{
        setLoading(true)
        if(route.params){
            getService(route.params.serviceId).then(() => setLoading(false))
        }        
        setLoading(false)
    },[])

    const ThirdPageComponent = () => {
        const [item, setItem] = useState({
            title: '',
            description: '',
        });

        const addItem = () => {

            if (item.title && item.description) {
                setFields({ ...fields, items: [...fields.items, item] })
            }
        }

        const TableComponent = () => (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Item</DataTable.Title>
                    <DataTable.Title>Descrição</DataTable.Title>
                </DataTable.Header>
                {
                    fields.items ? fields.items.map((item, index) =>
                    (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{item.title}</DataTable.Cell>
                            <DataTable.Cell>{item.description}</DataTable.Cell>
                        </DataTable.Row>
                    )) : null

                }
            </DataTable>
        )

        return (
            <View>
                <TableComponent />
                <TextInput
                    mode="outlined"
                    label="Item" value={item.title}
                    onChangeText={text => setItem({ ...item, title: text })}
                />
                <TextInput label="Descrição"
                    mode="outlined"
                    value={item.description}
                    onChangeText={text => setItem({ ...item, description: text })}
                />
                <Button onPress={addItem}>Adicionar</Button>
            </View>
        );

    }

    

    if(loading){
        return(
            <ActivityIndicator/>
        )
    }

    return (
        <>
            <Card style={{ margin: '2%', justifyItems: 'center', borderRadius: 5, flex: 1, padding: '2%'}}>
                <ScrollView>
                    {/* <List.AccordionGroup> */}
                        <View style={{padding: '2%'}}>
                        {/* <List.Accordion title="Descrição do Serviço" id="1"> */}
                            <Title>Descrição do Serviço</Title>
                            <View>
                                <TextInput
                                    style={{ height: 40 }}
                                    label={'Titulo'}
                                    mode='outlined'
                                    maxLength={30}
                                    left                                    
                                    placeholder="um titulo"                                    
                                    value={fields.title}
                                    onChangeText={text => setFields({ ...fields, title: text })}
                                />
                                <TextInput
                                    label={'Resumo'}
                                    mode='outlined'
                                    maxLength={50}
                                    color={colors.primary}
                                    textAlignVertical="top"
                                    textAlign='left'
                                    multiline
                                    numberOfLines={2}
                                    placeholder="resuma o serviço!"                                    
                                    value={fields.abstract}
                                    onChangeText={text => setFields({ ...fields, abstract: text })}
                                />
                                <Subheading>Prévia: </Subheading>
                                <Text>{fields.description}</Text>
                                <TextInput
                                    label={'Descrição'}
                                    mode='outlined'
                                    maxLength={200}
                                    color={colors.primary}
                                    textAlignVertical="top"
                                    left
                                    numberOfLines={10}
                                    placeholder="detalhe o serviço!"
                                    multiline
                                    value={fields.description}
                                    onChangeText={text => setFields({ ...fields, description: text })}
                                />
                            </View>
                        {/* </List.Accordion> */}
                        {/* <List.Accordion title="Itens Adicionais" id="2"> */}
                            <Title>Itens</Title>
                            <ThirdPageComponent />
                        {/* </List.Accordion> */}
                        {/* <List.Accordion title="Agenda" id="3"> */}
                            <Title>Agenda</Title>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Title>Opções: </Title>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        status={!fields.schedule ? 'checked' : 'unchecked'}
                                        onPress={() => setFields({ ...fields, schedule: { ...fields.schedule, active: false}})}
                                    />
                                    <Text>A combinar</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        status={!!fields.schedule ? 'checked' : 'unchecked'}
                                        onPress={() => setFields({ ...fields, schedule: { ...fields.schedule, active: true}})}
                                    />
                                    <Text>Definir Horário Fixo</Text>
                                </View>
                            </View>
                            {
                                fields.schedule ?
                                    <View>

                                        <Title>Dias da Semana: </Title>
                                        <ToggleButton.Row>
                                            {
                                                ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'].map( (item, index) => (
                                                    <Button
                                                        onPress={() => setWeekDay(item)}
                                                        compact
                                                        mode={getWeekDay(item) ? 'contained' : 'outlined' }
                                                        key={index} children={item}
                                                    />
                                                ))
                                            }
                                        </ToggleButton.Row>
                                        <View style={{ flexDirection: 'row', alignItems:'flex-end', justifyContent:'space-between', padding: '2%'}}>
                                            <Subheading>Inicio: </Subheading>
                                            <Picker
                                                style={{flex: 1}}
                                                selectedValue={fields.schedule.startTime}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setFields({ ...fields, schedule: { ...fields.schedule, startTime: itemValue } })
                                                }>
                                                {
                                                    hours.map( (item, index) => (
                                                        <Picker.Item key={index} label={item} value={item} />
                                                    ))
                                                }                           
                                            </Picker>
                                            <Subheading>ás: </Subheading>
                                            <Picker
                                                style={{flex: 1}}
                                                selectedValue={fields.schedule.endTime}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setFields({ ...fields, schedule: { ...fields.schedule, endTime: itemValue } })
                                                }>
                                                {
                                                    hours.map( (item, index) => (
                                                        <Picker.Item key={index} label={item} value={item} />
                                                    ))
                                                }                           
                                            </Picker>
                                        </View>
                                    </View> : null
                            }

                        {/* </List.Accordion> */}
                        <Title>Tipo de Serviço</Title>
                        {/* <List.Accordion title="Adicionar Tags" id="4"> */}
                            <View>
                            {
                                [
                                    'Encomendas',
                                    'Entregas',
                                    'Serviços Gerais',
                                    'Consertos',
                                    'Outros',        
                                ].map((item, index) => (
                                   <View 
                                        key={index}
                                        style={{flexDirection:'row', alignItems: 'center'}}
                                   >
                                    <Checkbox
                                        status={item === fields.typeService ? 'checked' : 'unchecked'}
                                        onPress={() => {setFields({ ...fields, typeService: item})}}
                                        color={colors.primary}        
                                    />   
                                       
                                    <Text>                                        
                                        {item}
                                   </Text>
                                    <Divider></Divider>
                                   </View>
                                   
                                ))                                
                            }
                            </View>                            
                        {/* </List.Accordion> */}
                        </View>
                    {/* </List.AccordionGroup> */}
                    <Text
                        style={{
                            alignSelf: 'center',
                            color: 'red',
                            fontSize: 20,
                            fontWeight: 'bold',
                            backgroundColor: colors.background
                        }}
                    >{error ? error : null}</Text>
                    <Card.Actions style={{ flex: 1 }}>
                        <Button
                            onPress={onSend}
                            style={{
                                flex: 1,
                                backgroundColor: colors.primary
                            }}
                            color={colors.background}
                        >Salvar</Button>
                    </Card.Actions>

                </ScrollView>
            </Card>
        </>
    )
}

