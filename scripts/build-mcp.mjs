// Bundles server/mcp.mjs and its dependencies into dist-mcp/server.mjs, one file the container runs with plain node.
import { build } from 'vite';

await build({
  configFile: false,
  logLevel: 'warn',
  publicDir: false,
  ssr: { noExternal: true },
  build: {
    ssr: 'server/mcp.mjs',
    outDir: 'dist-mcp',
    emptyOutDir: true,
    target: 'node24',
    minify: true,
    rollupOptions: { output: { entryFileNames: 'server.mjs', codeSplitting: false } },
  },
});
console.log('built dist-mcp/server.mjs');
