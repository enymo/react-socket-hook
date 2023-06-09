import React, { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

const Context = createContext<Socket | null>(null);

export const SocketProvider = Context.Provider;
export const useSocketClient = () => useContext(Context);
export default function useSocket<T>(event: string | undefined, handler: (payload: T) => void, dependencies: React.DependencyList = []) {
    const socket = useContext(Context);

    useEffect(() => {
        if (event !== undefined) {
            socket?.on(event, handler);
            return () => {
                socket?.off(event, handler);
            }
        }
    }, [event, ...dependencies]);
}