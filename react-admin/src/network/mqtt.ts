// import type { MqttClient, OnMessageCallback } from 'mqtt';
// import * as mqtt from 'mqtt/dist/mqtt.min.js';

// class MQTT {
//   url: string
//   topic: string
//   client!: MqttClient
//   options: object
//   constructor(
//     topic: string,
//     options: object = {
//       clean: true,
//       clientId: '111',
//       password: '111',
//       username: '1111',
//       connectTimeout: 4000
//     },
//     url: string = 'ws://11111111/mqtt'
//   ) {
//     this.topic = topic
//     this.url = url
//     this.options = options
//     this.init()
//   }
//   init() {
//     this.client = mqtt.connect(this.url, this.options)
//     this.client.on('error', (error: any) => {
//       console.log(error)
//     })
//     this.client.on('reconnect', (error: Error) => {
//       console.log(error)
//     })
//   }
//   unsubscribes() {
//     this.client.unsubscribe(this.topic, (error: Error) => {
//       if (!error) {
//         console.log(this.topic, '取消订阅成功')
//       } else {
//         console.log(this.topic, '取消订阅失败')
//       }
//     })
//   }
//   link() {
//     this.client.on('connect', () => {
//       this.client.subscribe(this.topic, (error: any) => {
//         if (!error) {
//           console.log('订阅成功')
//         } else {
//           console.log('订阅失败')
//         }
//       })
//     })
//   }
//   get(callback: OnMessageCallback) {
//     this.client.on('message', callback)
//   }
//   over() {
//     this.client.end()
//   }
// }
// export default MQTT;