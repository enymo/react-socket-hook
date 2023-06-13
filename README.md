# React Socket Hook

A simple hook providing a declarative syntax for listening to websocket events using [socket.io](https://socket.io/)

This library was mainly created for use with the [React Resource Hook](https://github.com/enymo/react-resource-hook), but can be used by itself nevertheless.

## Usage
In order to use the ```useSocket``` hook in your components, you app has to be wrapped with the ```SocketProvider``` to configure the hook
```
import { SocketProvider } from "@enymo/react-socket-hook";
import React from "react";
import { io } from "socket.io-client";

function App() {
    const client = io("https://www.example.com");

    return (
        <SocketProvider value={client}>
            {/* your app here */}
        </SocketProvider>
    )
}
```

You can then listen to socket events in your components like this:
```
import React from "react";
import useSocket from "@enymo/react-socket-hook";

export default function Component() {
    useSocket("event", (payload: any) => {
        // do something with payload
    }, []);

    return null;
}
```