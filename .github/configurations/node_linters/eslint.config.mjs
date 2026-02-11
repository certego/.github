/*
import js from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
*/
// Need require relative to the cwd
import path from 'path';
import { createRequire } from 'module';
const requireFromCwd = createRequire(path.resolve(process.cwd(), 'package.json'));
const { defineConfig, globalIgnores } = requireFromCwd('eslint/config');
const js = requireFromCwd('@eslint/js');
const pluginJest = requireFromCwd('eslint-plugin-jest');
const globals = requireFromCwd('globals');
const nextVitals = requireFromCwd('eslint-config-next/core-web-vitals');

export default defineConfig([
    globalIgnores(['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'public/sw.js']),
    ...nextVitals.map((config) => ({
        ...config,
        files: ['app/**/*.{js,mjs,cjs,jsx}'], // Specific for next app
     })),
    {
        files: ['**/*.{js,mjs,cjs,jsx}'], // For all files
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
    }, {
        files: ['**/*.spec.js', '**/*.test.js'],
        plugins: { jest: pluginJest },
        languageOptions: {
            globals: pluginJest.environments.globals.globals,
        },
    },
]);