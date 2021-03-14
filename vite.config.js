import { defineConfig } from "vite"
import pug from 'vite-plugin-pug';

export default () => {
    let commonConfig = defineConfig({
        plugins: [
            pug()
        ]
    });
    return commonConfig;
}
