import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, Text, Divider } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';

export default function HomePage({ navigation }) {

    const { signOut } = useAuthenticate();

    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    return (
        <ScrollView>
            <Card style={{margin: 2}}>
                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
                <Card.Content>
                    <Title>Montador de móveis</Title>
                    <Paragraph>R$ 50.00</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button onPress={() => { navigation.navigate("Service") }} >Ver Detalhes</Button>
                </Card.Actions>
            </Card>
            <Divider/>
            <Card>
                {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
                <Card.Content>
                    <Title>Formatação de computadores</Title>
                    <Paragraph>R$ 100.00</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    )
}








