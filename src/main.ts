import './app.css'
import {GM_getValue, GM_setValue} from "$";
import {getAfBalloon} from "./lib/afballoon";
import {AF_WORKING, AUTO_OPEN} from "./lib/constants";
import Modal from "./lib/components/Modal.svelte";

// If AF_WORKING is true, continue getting the balloon data
if (GM_getValue(AF_WORKING, false)) {
    getAfBalloon()
}

// Add app to the body
const app = new Modal({
    target: (() => {
        const app = document.createElement('div');
        document.body.append(app);
        return app;
    })(),
})

export default app;

// If AUTO_OPEN is true, open the modal
if (GM_getValue(AUTO_OPEN, false)) {
    //@ts-ignore
    app_modal.showModal()

    GM_setValue(AUTO_OPEN, false)
}

// Is F10 is pressed, open the modal
document.addEventListener('keydown', (e) => {
    if (e.key == 'F10') {
        //@ts-ignore
        app_modal.showModal()
    }
})
