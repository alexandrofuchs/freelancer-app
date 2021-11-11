import React from 'react';
import { View } from "react-native";
import { Text } from "react-native-paper";
import UserUpdate from "./UserUpdate";
import { List } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';

export default function User({ navigation }) {

  //console.log(navigation)

  const [expanded, setExpanded] = React.useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });

  const { userData } = useAuthenticate();

  const handlePress = (option) => {
    switch (option) {
      case 1:
        setExpanded({ accordion1: true, accordion2: false, accordion3: false });
      case 2:
        setExpanded({ accordion1: false, accordion2: true, accordion3: false });
      case 3:
        setExpanded({ accordion1: false, accordion2: false, accordion3: true });
    }
    setExpanded(!expanded);
  }

  return (
    <List.Section title={`${userData.firstName} > Preferências`}>
      <List.Accordion
        title="Apresentação"
        left={props => <List.Icon {...props} icon="account-tie" />}
        expanded={expanded.accordion1}
        onPress={() => handlePress(1)}>
        <List.Item title="Editar" onPress={() => navigation.push("UserPresentation")} />
        <List.Item title="Visualizar" onPress={() => navigation.push("UserProfile")} />
      </List.Accordion>

      <List.Accordion
        title="Meus Serviços"
        left={props => <List.Icon {...props} icon="briefcase-account" />}
        expanded={expanded.accordion2}
        onPress={() => handlePress(2)}>
        <List.Item title="Atualizar Dados" onPress={<UserUpdate />} />
        <List.Item title="Editar Endereço" />
      </List.Accordion>

      <List.Accordion
        title="Meus Dados"
        left={props => <List.Icon {...props} icon="account" />}
        expanded={expanded.accordion3}
        onPress={() => handlePress(3)}>
        <List.Item title="Atualizar Dados" onPress={() => navigation.push("UserUpdate")} />
        <List.Item title="Editar Endereço" />
      </List.Accordion>
    </List.Section>
  );
};
