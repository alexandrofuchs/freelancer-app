import React, { useState , useCallback} from 'react';
import { View } from 'react-native';
import {
    Appbar,
    Menu,
    Avatar,
    Searchbar,
    useTheme,
} from 'react-native-paper';
import { useApp } from '../../contexts/AppContext';
import { useAuthenticate } from '../../contexts/UserContext';
import _ from 'lodash';

export default function AppBar(props) {

    const { colors } = useTheme();
    const { search, searchService } = useApp();

    const [visible, setVisible] = useState(false);
    const { signed, signOut } = useAuthenticate();

    const debouncedSearch = useCallback(
		_.debounce(search => searchService(search), 1000),
		[], 
	);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    

    const { route, navigation, back } = props;

    return (
        <Appbar.Header style={{height:80}}>
            {/* <Appbar.Action icon="menu" color="white" onPress={navigation.openDrawer} /> */}
            {/* {signed ? (                
                <Menu
                    onDismiss={navigation.closeDrawer}
                    anchor={
                        <Appbar.Action icon="menu" color="white" onPress={navigation.openDrawer} />
                    }>
                </Menu>
            ) : null} */}

            {back ?
                <Appbar.BackAction onPress={navigation.goBack} />: null}
            {route.name === "Home" ?            
                <Appbar.Action icon="filter-variant" /> : null
            }
                
            {route.name !== "Home" ?            
                <Appbar.Content 
                    title={props.options.title} 
                    color={colors.background}
                    style={{ alignItems: 'center' }}
                /> 
                : 
                <Searchbar
                    style={{ flex: 1, borderRadius: 50 }}
                    placeholder="Buscar"
                    onChangeText={ text => debouncedSearch(text)}
                    defaultValue={search}
                />
            }

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