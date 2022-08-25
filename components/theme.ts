import GlobalStore from "react-native-global-state-hooks";

export let themeStore = new GlobalStore("dark");
export const themeHook = themeStore.getHook()


