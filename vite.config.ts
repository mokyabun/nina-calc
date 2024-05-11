import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        monkey({
            entry: 'src/main.ts',
            userscript: {
                icon: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihbuMpD-MVs_DTsPPvRNHh-UwGVQbDSCebrSMTIS3q7JfWGIxhFzi21zGLmIdzGIUH4NluidCGVnYglajvhX3mNkRXMi07MzvB4=w2702-h1512',
                namespace: 'sucat.dev',
                author: 'sucat0',
                description: '버츄얼 헤르츠 도네 감사인사용으로 만들어진 Tampermonkey용 팬 제작 스크립트입니다.',
                version: '2.0.1',
                match: ['http://afreehp.kr/setup/alertlist'],
                grant: [
                    'GM.xmlHttpRequest',
                    'GM_getValue',
                    'GM_setValue',
                    'GM_deleteValue',
                    'GM.getValue',
                    'GM.setValue',
                    'GM.deleteValue',
                ],
                license: 'MIT',
                downloadURL: 'https://github.com/sucat0/nina-calc/raw/main/dist/nina-calc.user.js',
                updateURL: 'https://github.com/sucat0/nina-calc/raw/main/dist/nina-calc.user.js',
                require: [
                    'https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js',
                    'https://cdn.jsdelivr.net/npm/@trim21/gm-fetch',
                    'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js',
                    'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js',
                ],
                'run-at': 'document-end',
            },
        }),
    ],
})
