import { reactive } from "vue";
import { io, Socket } from "socket.io-client";

type Event = any[];

interface State {
  connected: boolean;
  fooEvents: Event[];
  barEvents: Event[];
}

export const state: State = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL: string = "http://localhost:3008";

export const socket: Socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args: Event) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args: Event) => {
  state.barEvents.push(args);
});