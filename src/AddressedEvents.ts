import Debug from "debug";

type Listener = (e: any) => Promise<void> | void;

const debug = Debug('connect-eventstream');

export default class AddressedEvents {

    private listeners: Listener[] = [];

    addListener(fn: Listener) {

        this.listeners.push(fn);
        debug("AddressedEvents listener added, " + this.listeners.length + " listeners");

        return () => {
            this.listeners = this.listeners.filter(x => x !== fn);
            debug("AddressedEvents listener removed, " + this.listeners.length + " listeners");
        };

    }

    async addressedEvent(event: any) {

        debug("Calling addressedEvent with " + this.listeners.length + " listeners");
        for (const fn of this.listeners) {
            await fn(event);
        }

    }

}