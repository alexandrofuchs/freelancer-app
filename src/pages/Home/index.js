import React, { useEffect, useState } from 'react';
import {
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  VirtualizedList,
} from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  useTheme,
  Modal,
  Portal,
  Text,
  Provider,
  ActivityIndicator,
  Menu,
  ToggleButton,
  
} from 'react-native-paper';
import { ceil } from 'react-native-reanimated';
import { useApp } from '../../contexts/AppContext';

import { useAuthenticate } from '../../contexts/UserContext';
import Api from '../../services/api';
import styles from './styles';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { Drawer } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider>
  );
};

export default function Home({ navigation }) {

  const { search } = useApp();
  const { colors } = useTheme();

  const limit = 2

  const initialState = {
    data: [],
    page: 1,
    loading: false,
    totalPages: undefined,
  }

  const [state, setState] = useState(initialState);

  const [refreshing, setRefreshing] = useState(false);


  const loadServices = async (page) => {

    if(page === 1){
      setState(initialState);
    }

    if (state.page >= state.totalPages) {
      return;
    }

    if (state.loading) {
      return;
    };

    setState({ ...state, loading: true });
    
    const res = await Api.get(`/services?search=${search}&limit=${limit}&page=${page}`);
    
    if (res.data) {
      setState({
        data: [...state.data, ...res.data.rows],
        page: res.data.page,
        totalPages: res.data.totalPages,
        loading: false,
      });
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setState(initialState);
    loadServices(1).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let cancel = false;

    loadServices(1).then(() => {
    if (cancel) return;
      setState({...state, loading: false});
    });

  return () => { 
    cancel = true;
  }
    
  },[]);

  useEffect(() => {
    setState(initialState);
    loadServices(1);
  }, [search])

  const renderItem = ({ item }) => (
    <Card style={{ margin: 10, borderRadius: 25, borderWidth: 1, borderColor:colors.primary}}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <View style={{flexDirection:'row'}}>
      <Card.Cover
        style={{ width: 100, height: 100, margin:'1%' ,borderRadius:25}}
        source={require('../../../assets/serviceimage.png')} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <View style={{flexDirection:'row'}}>
          {
           
          [1, 2, 3, 4, 5].map((index) =>
            <Ionicons key={index} name={index <=2 ? "star" : "star-outline"} size={20} color={colors.primary} />
          )}
        </View>

      </Card.Content>
      </View>
      
        <Button
          onPress={() => {
            navigation.navigate("Service", {
              serviceId: item.id
            })
          }}
          style={{ 
            borderBottomStartRadius: 25,
            borderBottomEndRadius: 25, 
            backgroundColor: colors.primary, 
            width: '100%' }}
          color={colors.background}
        >Detalhes</Button>
    </Card>
  );

  const renderFooter = () => {
    if (!state.loading) return null;
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const [viewFilterMenu, setViewFilterMenu] = useState(false);
  const [viewSortMenu, setViewSortMenu] = useState(false);

  const openViewFilterMenu = () => {
    setViewFilterMenu(true);
  }

  const closeViewFilterMenu = () => {
    setViewFilterMenu(false);
  }

  const openViewSortMenu = () => {
    setViewSortMenu(true);
  }

  const closeViewSortMenu = () => {
    setViewSortMenu(false);
  }

  if(state.loading){
    return (<ActivityIndicator />)
  }

  return (
    <View>
      <View style={{flexDirection:'row', width:'100%', alignItems:'center',justifyContent:'center'}}>
      <Menu
          visible={viewFilterMenu}
          onDismiss={closeViewFilterMenu}
          anchor={<Button onPress={openViewFilterMenu}  icon={'filter-variant'}  compact>Filtrar</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
        <Menu
          visible={viewSortMenu}
          onDismiss={closeViewSortMenu}
          anchor={<Button onPress={openViewSortMenu} icon={'sort-variant'} compact>Ordenar</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
      
        <FlatList
        //contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          data={state.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onEndReached={() => loadServices(state.page+1)}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
    </View>    
  )
}






