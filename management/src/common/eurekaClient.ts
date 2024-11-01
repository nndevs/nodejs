import { Eureka } from 'eureka-js-client';

export const eurekaClient = new Eureka({
    instance: {
        app: 'management-service', // Application name
        hostName: 'localhost', // Your service hostname
        ipAddr: '127.0.0.1',   // Your service IP address
        port: {
            '$': 4002,          // The port your service listens on
            '@enabled': true,   // Enable port
        },
        vipAddress: 'management-service', // Virtual IP address
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn', // Data center name
        },
    },
    eureka: {
        host: 'localhost', // Eureka server hostname
        port: 8761,        // Eureka server port
    },
});