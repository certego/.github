// Need inport relative to the cwd
import path from 'path';
import { createRequire } from 'module';
const requireFromCwd = createRequire(path.resolve(process.cwd(), 'package.json'));
const { defineConfig, globalIgnores } = requireFromCwd('eslint/config');
const { FlatCompat } = requireFromCwd('@eslint/eslintrc');
const js = requireFromCwd('@eslint/js');
const jsdoc = requireFromCwd('eslint-plugin-jsdoc');
const pluginJest = requireFromCwd('eslint-plugin-jest');
// const importPlugin = requireFromCwd('eslint-plugin-import');
const globals = requireFromCwd('globals');
const nextVitals = requireFromCwd('eslint-config-next/core-web-vitals');

// eslint-plugin-import
const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});
const eslintImport = [
    ...compat.config({
        extends: ['plugin:import/recommended'],
        settings: {
            'import/resolver': {
                next: true,
            },
        },
    }),
];

export default defineConfig([
    globalIgnores([
        'node_modules/**',
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'public/sw.js',
        '.vscode/**',
        '.github/**',
    ]),
    ...nextVitals.map((config) => ({
        ...config,
        files: ['{app,tests}/**/*.{js,mjs,cjs,jsx}'], // Specific for next app
    })),
    ...eslintImport, //  BUG in flat config importPlugin.flatConfigs.recommended (https://github.com/import-js/eslint-plugin-import/issues/3212)
    {
        files: ['**/*.{js,mjs,cjs,jsx}'], // For all files
        plugins: { js, jsdoc },
        extends: ['js/recommended', 'jsdoc/flat/recommended'],
        languageOptions: { globals: { ...globals.node, ...globals.browser } },
        rules: {
            'prefer-destructuring': [
                'error',
                {
                    object: true,
                    array: false,
                },
            ],
            'no-console': [
                'error',
                {
                    allow: ['warn', 'error'],
                },
            ],
            'no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                    args: 'after-used',
                },
            ],
            'no-underscore-dangle': [
                'error',
                {
                    allowAfterThis: true,
                },
            ],
            'jsdoc/require-jsdoc': 0,
            'jsdoc/reject-any-type': 0,
            'jsdoc/reject-function-type': 0,
        },
    },
    {
        files: ['tests/**/*.{js,mjs,cjs,jsx}', '**/*.spec.js', '**/*.test.js'],
        plugins: { jest: pluginJest },
        extends: ['jest/recommended'],
        languageOptions: {
            globals: pluginJest.environments.globals.globals,
        },
    },
]);
