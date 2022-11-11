import React, { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

const Context = createContext<Socket>(null);

export const SocketProvider = Context.Provider;
export default function useSocket<T>(event: string, handler: (payload: T) => void, dependencies: React.DependencyList = []) {
    const socket = useContext(Context);

    useEffect(() => {
        if (event) {
            socket?.on(event, handler);
            return () => {
                socket?.off(event, handler);
            }
        }
    }, [event, ...dependencies]);
}