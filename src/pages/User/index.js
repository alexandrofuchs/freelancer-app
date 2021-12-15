import React from 'react';
import { View } from "react-native";
import { Text, useTheme, Card, Divider } from "react-native-paper";
import UserUpdate from "./UserUpdate";
import { List } from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';

export default function User({ navigation }) {

  const [expanded, setExpanded] = React.useState({
    accordion1: false,
    accordion2: false,
    accordion3: false,
  });


  const { colors } = useTheme();
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
    <View>
      <List.Section title={`${userData.firstName} > Preferências`}

      >
        <List.AccordionGroup>

          <List.Accordion
            id={'1'}
            style={{
              height: 40,
              justifyContent: 'center',
              backgroundColor: colors.background
            }}
            title="Apresentação"
            left={props => <List.Icon {...props} icon="account-tie" />}
            expanded={expanded.accordion1}
            onPress={() => handlePress(1)}>
            <List.Item title="Atualizar" onPress={() => navigation.push("UserPresentation")} />
            <List.Item title="Visualizar" onPress={() => navigation.push("UserProfile", {
              user: userData
            })} />
          </List.Accordion>

          <List.Accordion
            id={'2'}
            style={{
              height: 40,
              justifyContent: 'center',
              backgroundColor: colors.background
            }}
            title="Serviços contratados"
            left={props => <List.Icon {...props} icon="account-network" />}
            expanded={expanded.accordion2}
            onPress={() => handlePress(2)}>
            <List.Item title="Visualizar" onPress={() => navigation.push("ContractedServices")} />
          </List.Accordion>

          <List.Accordion
            id={'3'}
            style={{
              height: 40,
              justifyContent: 'center',
              backgroundColor: colors.background
            }}
            title="Meus Serviços"
            left={props => <List.Icon {...props} icon="briefcase-account" />}
            expanded={expanded.accordion2}
            onPress={() => handlePress(2)}>
            <List.Item title="Criar Serviço" onPress={() => navigation.push("CreateService")} />
            <Divider/>
            <List.Item title="Meus Serviços" onPress={() => navigation.push("UserServiceList")} />
            <Divider/>
            <List.Item title="Solicitações" onPress={() => navigation.push("SolicitedServices")} />
            <Divider/>
            <List.Item title="Perguntas" onPress={() => { }} />
          </List.Accordion>

          <List.Accordion
            id={'4'}
            title="Meus Dados"
            style={{
              height: 40,
              justifyContent: 'center',
              backgroundColor: colors.background
            }}
            left={props => <List.Icon {...props} icon="account" />}
            expanded={expanded.accordion3}
            onPress={() => handlePress(3)}>
            <List.Item title="Atualizar Dados" onPress={() => navigation.push("UserUpdate")} />
            <List.Item title="Editar Endereço" />
          </List.Accordion>

        </List.AccordionGroup>


      </List.Section>

    </View>
  );
};
