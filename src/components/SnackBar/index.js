import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';


export default function SnackBarComponent({ message, setMessage, onDismissSnackBar }){
  const [visible, setVisible] = React.useState(!!message);

  const onToggleSnackBar = () => setVisible(!!message);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={!!message}
        
        onDismiss={() => setMessage('')}
        action={{
          label: 'Undo',
          onPress: () => {
            setMessage('');
          },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

