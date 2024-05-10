import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import path from 'path'
import monkey from "vite-plugin-monkey";

export default defineConfig({
    plugins: [svelte(), monkey({
        entry: 'src/main.ts',
        userscript: {
            icon: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbuMpD-MVs_DTsPPvRNHh-UwGVQbDSCebrSMTIS3q7JfWGIxhFzi21zGLmIdzGIUH4NluidCGVnYglajvhX3mNkRXMi07MzvB4=w2702-h1512',
            namespace: 'sucat.dev',
            author: 'sucat0',
            description: '버츄얼 헤르츠 도네 감사인사용으로 만들어진 Tampermonkey용 팬 제작 스크립트입니다.',
            version: '1.1.1',
            match: ['http://afreehp.kr/setup/alertlist'],
            grant: ["GM.xmlHttpRequest", "GM_getValue", "GM_setValue", "GM_deleteValue", "GM.getValue", "GM.setValue", "GM.deleteValue"],
            license: 'MIT',
            downloadURL: 'https://github.com/sucat0/nina-calc/raw/main/dist/nina-calc.user.js',
            updateURL: 'https://github.com/sucat0/nina-calc/raw/main/dist/nina-calc.user.js',
            require: ['https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js'],
            "run-at": "document-end",
        },
    })],
    // @ts-ignore
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './vitest.setup.ts',
    },
})