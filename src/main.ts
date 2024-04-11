import App from './App.svelte';
import './app.css'
import {GM_getValue} from "$";
import {balloonService} from "./lib/balloon/balloon.service";
import {TEMP_GETTING_DATA} from "./lib/balloon/balloon.constants";

if (GM_getValue(TEMP_GETTING_DATA, false)) {
    balloonService()
}

const app = new App({
    target: (() => {
        const app = document.createElement('div');
        document.body.append(app);
        return app;
    })(),
})

export default app;

document.addEventListener('keydown', (e) => {
    if (e.key == 'F10') {
        //@ts-ignore
        app_modal.showModal()
    }
})
