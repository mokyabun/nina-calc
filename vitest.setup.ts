import {vi} from "vitest";

vi.mock("$", () => {
    const data = {}
    return {
        GM: {
            setValue: vi.fn((key: string, value: any) => {
                // @ts-ignore
                data[key] = value
            }),
            getValue: vi.fn((key: string, defaultValue: any) => {
                // @ts-ignore
                return data[key] ?? defaultValue
            }),
            deleteValue: vi.fn((key: string) => {
                // @ts-ignore
                delete data[key]
            })
        },

        GM_getValue: vi.fn((key: string, defaultValue: any) => {
            // @ts-ignore
            return data[key] ?? defaultValue
        }),
        GM_setValue: vi.fn((key: string, value: any) => {
            // @ts-ignore
            data[key] = value
        }),

        GM_deleteValue: vi.fn((key: string) => {
            // @ts-ignore
            delete data[key]
        })
    }
})