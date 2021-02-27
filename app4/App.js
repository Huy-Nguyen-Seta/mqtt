import React, {useEffect} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import MQTTConnection from './src/MQTTConnection'
import { Buffer } from 'buffer';
global.Buffer = Buffer; 

export default function App() {

  useEffect(() => {
    this.mqttConnect = new MQTTConnection()
    this.mqttConnect.onMQTTConnect = this.onMQTTConnect
    this.mqttConnect.onMQTTLost = this.onMQTTLost
    this.mqttConnect.onMQTTMessageArrived = this.onMQTTMessageArrived
    this.mqttConnect.onMQTTMessageDelivered = this.onMQTTMessageDelivered
    this.mqttConnect.connect("broker.emqx.io",8083)
    onMQTTConnect = () => {
        console.log('App onMQTTConnect')
        this.mqttConnect.subscribeChannel('huydz')
    }

    onMQTTLost = () => {
        console.log('App onMQTTLost')
    }

    onMQTTMessageArrived = (message) => {
        console.log('App onMQTTMessageArrived: ', message);
        console.log('App onMQTTMessageArrived payloadString: ', message.payloadString);
    }

    onMQTTMessageDelivered = (message) => {
        console.log('App onMQTTMessageDelivered: ', message);
    }

    return () => {
      this.mqttConnect.close()
    }

  }, [])

  return (
    <View style={styles.container}>
      <Text>react_native_mqtt</Text>
      <Button
        title="send data to chainel huydz "
        onPress={() => this.mqttConnect.send('huydz', "message form huydz")}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})