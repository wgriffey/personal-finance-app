import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import mkcert from 'vite-plugin-mkcert';

function getTsConfigPaths() {
    // Read and clean the tsconfig.json file
    const tsconfigPath = path.resolve(__dirname, './tsconfig.json');
    const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8');

    // Remove comments (both single-line and multi-line) to parse as JSON
    const tsconfigContentCleaned = tsconfigContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

    const tsconfig = JSON.parse(tsconfigContentCleaned);
    const paths = tsconfig.compilerOptions.paths || {};
    const baseUrl = tsconfig.compilerOptions.baseUrl || './';

    const aliases = {};
    for (const [key, value] of Object.entries(paths)) {
        const aliasKey = key.replace('/*', '');
        const aliasPath = value[0].replace('/*', '');
        aliases[aliasKey] = path.resolve(__dirname, baseUrl, aliasPath);
    }

    return aliases;
}

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: getTsConfigPaths(),
    },
    server: {
        port: 3000,
    },
});
