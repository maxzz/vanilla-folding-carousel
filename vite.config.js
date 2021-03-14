import { defineConfig } from "vite"
import pug from 'vite-plugin-pug';

export default ({mode, command}) => {
    let commonConfig = defineConfig({
        plugins: [
            pug()
        ]
    });
    if (command === 'build') {
        commonConfig.base = '/vanilla-folding-carousel/';
    }
    return commonConfig;
}
