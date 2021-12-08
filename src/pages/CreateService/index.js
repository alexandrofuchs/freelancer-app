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
} from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateServicePage({ navigation, route }) {

    const { userData } = useAuthenticate();

    const { colors } = useTheme();

    const [fixedSchedule, setFixedSchedule] = useState(false);

    const [fields, setFields] = useState({
        id: "",
        title: "",
        abstract: "",
        description: "",
        schedule: {
            active: fixedSchedule | false,
            startTime: null,
            endTime: null,
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
        console.log(res);

        if (res.data) {
            setFields(res.data);
        }

    }

    const [error, setError] = useState(null);
    
    const weekDays = [
        { label: 'Domingo', value: useState(fields.schedule ? fields.schedule.sunday : false) },
        { label: 'Segunda-Feira', value: useState(fields.schedule ? fields.schedule.monday : false) },
        { label: 'Terça-Feira', value: useState(fields.schedule ? fields.schedule.tuesday : false) },
        { label: 'Quarta-Feira', value: useState(fields.schedule ? fields.schedule.wednesday : false) },
        { label: 'Quinta-Feira', value: useState(fields.schedule ? fields.schedule.thursday : false) },
        { label: 'Sexta-Feira', value: useState(fields.schedule ? fields.schedule.friday : false) },
        { label: 'Sábado', value: useState(fields.schedule ? fields.schedule.saturday : false) },
    ]

    const hasErrors = () => {
        return isEmpty(fields.title);
    };

    const onSend = async () => {
        try {
            const res = await Api.post(`users/${userData.id}/services`, {
                title: fields.title,
                abstract: fields.abstract,
                description: fields.description,
                items: fields.items,
                schedule: !!fixedSchedule ? fields.schedule : { active: false },
            });

            console.log(res)

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

    useEffect(()=>{
        isDate()
    },[fields.schedule.startTime, fields.schedule.endTime])

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

    return (
        <>
            <Card style={{ margin: '2%', justifyItems: 'center', borderRadius: 5, flex: 1 }}>
                <ScrollView>
                    <List.AccordionGroup>
                        <List.Accordion title="Descrição do Serviço" id="1">
                            <View>
                                <TextInput
                                    label={'Titulo'}
                                    mode='outlined'
                                    maxLength={50}
                                    left
                                    numberOfLines={1}
                                    placeholder="um titulo"
                                    multiline
                                    value={fields.title}
                                    onChangeText={text => setFields({ ...fields, title: text })}
                                />
                                <TextInput
                                    label={'Resumo'}
                                    mode='outlined'
                                    maxLength={50}
                                    left
                                    numberOfLines={1}
                                    placeholder="uma breve descrição"
                                    multiline
                                    value={fields.abstract}
                                    onChangeText={text => setFields({ ...fields, abstract: text })}
                                />
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
                        </List.Accordion>
                        <List.Accordion title="Agenda" id="2">
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Title>Opções: </Title>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        status={!fixedSchedule ? 'checked' : 'unchecked'}
                                        onPress={() => setFixedSchedule(false)}
                                    />
                                    <Text>A combinar</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        status={fixedSchedule ? 'checked' : 'unchecked'}
                                        onPress={() => setFixedSchedule(true)}
                                    />
                                    <Text>Definir Horário Fixo</Text>
                                </View>
                            </View>
                            {
                                fixedSchedule ?
                                    <View>

                                        <Title>Dias da Semana: </Title>
                                        <ToggleButton.Row>
                                            {
                                                weekDays.map((item, index) => (
                                                    <Button
                                                        onPress={() => item.value[1](!item.value[0])}
                                                        compact
                                                        color={!item.value[0] ? colors.primary : colors.background}
                                                        style={{ backgroundColor: !item.value[0] ? colors.background : colors.primary, borderColor: colors.primary, borderWidth: 0.1 }}
                                                        key={index} children={item.label.substring(0, 3)}
                                                    />
                                                ))
                                            }
                                        </ToggleButton.Row>
                                        <View style={{ flexDirection: 'row', alignItems:'flex-end', justifyContent:'space-between', padding: '2%'}}>
                                            <Subheading>Inicio: </Subheading>
                                            <TextInput
                                                value={fields.schedule.startTime}
                                                mode='outlined'
                                                error={!isNumber(fields.schedule.startTime)}
                                                style={{ height: 40, width: '30%' }}
                                                keyboardType="numeric"
                                                onChangeText={(text) => setFields({...fields, schedule: { ...fields.schedule, startTime: text}})}
                                            ></TextInput>
                                            <Subheading>ás: </Subheading>
                                            <TextInput
                                                value={fields.schedule.endTime}
                                                error={!isNumber(fields.schedule.endTime)}
                                                mode='outlined'                                                
                                                style={{ height: 40, width: '30%' }}
                                                keyboardType="numeric"
                                                onChangeText={(text) => setFields({...fields, schedule: { ...fields.schedule, endTime: text}})}
                                            ></TextInput>
                                        </View>
                                    </View> : null
                            }

                        </List.Accordion>
                        <List.Accordion title="Itens Adicionais" id="3">
                            <ThirdPageComponent />
                        </List.Accordion>
                    </List.AccordionGroup>
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

