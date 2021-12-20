import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, StatusBar } from 'react-native';
import { Button, Card, Paragraph, Subheading, Text, TextInput, useTheme } from 'react-native-paper';
import io from 'socket.io-client';

import { BASE_URL } from '@env';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuthenticate } from '../../contexts/UserContext';

export default function ChatPage({ navigation, route }) {

  const { colors } = useTheme();
  const { userData } = useAuthenticate();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [socket , setSocket]  = useState(io(BASE_URL));
  
  const sendMessage = () => {

    socket.emit('sendMessage', { user: userData.firstName, message, serviceOrderId: route.params.serviceOrderId ? route.params.serviceOrderId : null });
    setMessage('');
  }

  useEffect(() => {
    socket.on("previusMessages", msgs => {
      setMessages(msgs);
    });
  

  },[])

  useEffect(() => {
    socket.on("receivedMessage", msg => {
      setMessages([...messages,msg])
    });
  })


  return (
    <Card style={{ flex: 1, justifyContent: 'space-between',borderBottomLeftRadius: 25, borderBottomRightRadius: 25, padding: 5, margin: 5}}>
        <ScrollView>
          {
            messages ?
            messages.map( (item, key) => (
              <Card style={{marginVertical: 2, borderRadius: 5}} key={key}>
                <View style={{flexDirection:'row', alignItems:'center', padding: 2}}>
                <Subheading style={{fontWeight:'bold'}}>{item.user}: </Subheading>
                <Text style={{flex: 1, fontWeight:'600'}}>{item.message}</Text>
                </View>
              </Card>
            )) : null
          }
        </ScrollView>

      <View style={{ flexDirection: 'row'}}>
        <TextInput
          value={message}
          style={{ flex: 1, height: 40,borderBottomLeftRadius:25}}
          onChangeText={text => setMessage(text)}
        />
        <Button
          onPress={sendMessage}
          mode='contained'
          style={{height: 40, borderBottomEndRadius: 20, }}
        >Enviar</Button>
      </View>
    </Card>
  )
}
