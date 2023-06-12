import React, { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";

const Context = createContext<Socket | null>(null);

/**
 * The application needs to be wrapped with this provider for the useSocket hook to work. Requires a socket.io client instance returned by the io function.
 */
export const SocketProvider = Context.Provider;
export const useSocketClient = () => useContext(Context);
/**
 * Listenes to the specified websocket event and calls the handler with the events payload.
 * @param event The event to listen to
 * @param handler The handler used to process the payload
 * @param dependencies The handlers dependencies
 */
export default function useSocket<T>(event: string | null, handler: (payload: T) => void, dependencies: React.DependencyList = []) {
    const socket = useContext(Context);

    useEffect(() => {
        if (event !== null) {
            socket?.on(event, handler);
            return () => {
                socket?.off(event, handler);
            }
        }
    }, [event, ...dependencies]);
}