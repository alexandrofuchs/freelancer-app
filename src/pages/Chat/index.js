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

    setMessages([...messages,message]);
    socket.emit('sendMessage', { user: userData.firstName, message, serviceOrderId: route.params.serviceOrderId ? route.params.serviceOrderId : null });
    setMessage('');
  }

  useEffect(() => {
    socket.on("previusMessages", msgs => {
      console.log(msgs);
      setMessages(msgs);
    });
  

  },[])

  useEffect(() => {
    socket.on("receivedMessage", msg => {
      console.log(msg);
      console.log([...messages])
      
    });
  })

  useEffect(() => {
      console.log(messages)
  },[messages])



  return (
    <Card style={{ flex: 1, justifyContent: 'space-between' }}>
      <Card.Content style={{ height: '85%', backgroundColor: '#f1f1f1' }}>
        <ScrollView>
          {
            messages ?
            messages.map( (item, key) => (
              <Card style={{marginVertical: 2}} key={key}>
                <Subheading style={{fontWeight:'bold'}}>{item.user}: </Subheading>
                <Paragraph style={{fontWeight:'600'}}>{item.message}</Paragraph>
              </Card>
            )) : null
          }
        </ScrollView>
      </Card.Content>

      <Card.Actions style={{ flexDirection: 'row', flexGrow: 1 }}>
        <TextInput
          value={message}
          style={{ flex: 1 }}
          onChangeText={text => setMessage(text)}
        />
        <Button
          onPress={sendMessage}
          style={{ backgroundColor: 'red', borderBottomEndRadius: 20, }}
        >Enviar</Button>
      </Card.Actions>

    </Card>
  )
}
