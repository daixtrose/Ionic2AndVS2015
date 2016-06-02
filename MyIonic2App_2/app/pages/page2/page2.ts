import {Page} from 'ionic-angular';
import * as amqp from 'amqplib/callback_api';

@Page({
  templateUrl: 'build/pages/page2/page2.html',
})

export class Page2 {
    
    connectionUrl: string;
    exchange: string;
    connection: amqp.Connection;
    channel: amqp.Channel;
    error: any;
    
    constructor() {
        this.connectionUrl = 'amqp://regioit:Aachen123.@conan.fev.com:5692';
        this.exchange = 'cam_messages';
    }

    /** SEE: https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html  **/
    setConnection() {
    //  try {
        amqp.connect(this.connectionUrl, (err: any, connection: amqp.Connection) => {
            this.connection = connection;
            this.connection.createChannel((err: any, channel: amqp.Channel) => {
                this.channel = channel;
                this.channel.assertExchange(this.exchange, 'topic', { durable: false });
            });
        });
    // } catch (err) {
        //  this.error = err;
    // }

    }

    // Send a message to the server
    sendMessage() {
        if (this.channel)
            this.channel.publish(this.exchange, '', new Buffer('Hello from the Ionic 2 app'));
    }
    
    // Close connection
    closeConnection(){
        if (this.connection) {
            this.connection.close();
            console.log("SUCCESS: Connection closed");
        } else { 
            console.log("ATTENTION: Connection to the server has not been set yet");
            this.error = null;
        }
    }
  
}
