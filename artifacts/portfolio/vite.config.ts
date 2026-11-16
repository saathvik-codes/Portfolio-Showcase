import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rawPort = process.env.PORT ?? "5000";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

// Dev-only: serve /api/contact (same handler Vercel runs in production).
function devApi(): Plugin {
  return {
    name: "dev-api-contact",
    configureServer(server) {
      Object.assign(process.env, loadEnv("development", import.meta.dirname, ""));
      server.middlewares.use("/api/contact", (req, res) => {
        let raw = "";
        req.on("data", (c) => (raw += c));
        req.on("end", async () => {
          try {
            const mod = await server.ssrLoadModule("/api/contact.js");
            const r: any = req;
            try { r.body = raw ? JSON.parse(raw) : {}; } catch { r.body = {}; }
            const out: any = res;
            out.status = (c: number) => { res.statusCode = c; return out; };
            out.json = (o: unknown) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); };
            await mod.default(r, out);
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: String(e) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    devApi(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 950,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
