import React, { useState } from 'react';
import {
    Appbar,
    Menu,
    Avatar,
    Searchbar,
    useTheme,
} from 'react-native-paper';
import { useAuthenticate } from '../../contexts/UserContext';


export default function AppBar(props) {

    const { colors } = useTheme();

    const [visible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const { signed, signOut } = useAuthenticate();

    const [openCategories, setOpenCategories] = useState(false);

    const onChangeSearch = query => setSearchQuery(query);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    console.log(props);

    const { navigation, back } = props;

    return (  
        <Appbar.Header
            
        >
            {/* <Appbar.Action icon="menu" color="white" onPress={navigation.openDrawer} /> */}
            {/* {signed ? (                
                <Menu
                    onDismiss={navigation.closeDrawer}
                    anchor={
                        <Appbar.Action icon="menu" color="white" onPress={navigation.openDrawer} />
                    }>
                </Menu>
            ) : null} */}

            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={props.options.title} color={colors.background}
                style={{alignItems: 'center'}}
            />
            {signed ? (
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="account" color="white" onPress={openMenu} />
                    }>
                    <Menu.Item onPress={() => { navigation.navigate("UserAccount"); closeMenu() }} title="Preferências" />
                    <Menu.Item onPress={signOut} title="Sair" />
                </Menu>
            ) : null}
        </Appbar.Header>    
   
    );
}