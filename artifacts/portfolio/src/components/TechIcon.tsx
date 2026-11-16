import type { IconType } from "react-icons";
import {
  SiAmazonwebservices, SiAndroid, SiCplusplus, SiDeepgram, SiDocker, SiDuckdb, SiElevenlabs, SiExpress, SiFastapi,
  SiFirebase, SiFlask, SiGit, SiGithubactions, SiGo, SiGooglegemini, SiHuggingface, SiJavascript, SiJetpackcompose,
  SiKotlin, SiLangchain, SiLinux, SiMaplibre, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiOllama, SiOpenai,
  SiOpenjdk, SiPandas, SiPostgresql, SiPrometheus, SiPython, SiReact, SiRedis, SiScikitlearn, SiSpringboot, SiSqlite,
  SiLeetcode, SiTailwindcss, SiThreedotjs, SiTypescript, SiWhatsapp,
} from "react-icons/si";

/** Brand logo + brand colour per tech name (Simple Icons). Matching is case-insensitive on the leading word(s). */
const MAP: [RegExp, IconType, string][] = [
  [/^go$/i, SiGo, "#00ADD8"],
  [/^python/i, SiPython, "#3776AB"],
  [/^java\b/i, SiOpenjdk, "#E76F00"],
  [/^c ?\/ ?c\+\+|^c\+\+/i, SiCplusplus, "#00599C"],
  [/^typescript/i, SiTypescript, "#3178C6"],
  [/^javascript/i, SiJavascript, "#C9A800"],
  [/^mysql/i, SiMysql, "#4479A1"],
  [/^kotlin/i, SiKotlin, "#7F52FF"],
  [/^fastapi/i, SiFastapi, "#009688"],
  [/^flask/i, SiFlask, "#16181d"],
  [/^spring boot/i, SiSpringboot, "#6DB33F"],
  [/^node(\.js)?/i, SiNodedotjs, "#5FA04E"],
  [/^express/i, SiExpress, "#16181d"],
  [/^react(\.js)?$/i, SiReact, "#1E9ACB"],
  [/^next\.js/i, SiNextdotjs, "#16181d"],
  [/^three\.js/i, SiThreedotjs, "#16181d"],
  [/^tailwind/i, SiTailwindcss, "#06B6D4"],
  [/^jetpack compose/i, SiJetpackcompose, "#4285F4"],
  [/^openai/i, SiOpenai, "#16181d"],
  [/^langchain/i, SiLangchain, "#1C3C3C"],
  [/^hugging ?face/i, SiHuggingface, "#E0A500"],
  [/^duckdb/i, SiDuckdb, "#C9B400"],
  [/^scikit-learn/i, SiScikitlearn, "#F7931E"],
  [/^pandas/i, SiPandas, "#150458"],
  [/^postgres/i, SiPostgresql, "#4169E1"],
  [/^mongodb/i, SiMongodb, "#47A248"],
  [/^redis/i, SiRedis, "#DC382D"],
  [/^sqlite/i, SiSqlite, "#003B57"],
  [/^docker/i, SiDocker, "#2496ED"],
  [/^aws/i, SiAmazonwebservices, "#16181d"],
  [/^prometheus/i, SiPrometheus, "#E6522C"],
  [/^linux/i, SiLinux, "#16181d"],
  [/^ci\/cd|github actions/i, SiGithubactions, "#2088FF"],
  [/^git$/i, SiGit, "#F05032"],
  [/^firebase/i, SiFirebase, "#DD2C00"],
  [/^ollama/i, SiOllama, "#16181d"],
  [/^gemini/i, SiGooglegemini, "#8E75B2"],
  [/^android/i, SiAndroid, "#3DDC84"],
  [/^maplibre/i, SiMaplibre, "#396CB2"],
  [/^deepgram/i, SiDeepgram, "#13EF93"],
  [/^elevenlabs/i, SiElevenlabs, "#16181d"],
  [/^whatsapp/i, SiWhatsapp, "#25D366"],
  [/^room/i, SiAndroid, "#3DDC84"],
  [/^leetcode/i, SiLeetcode, "#FFA116"],
];

export function techIcon(name: string) {
  const hit = MAP.find(([re]) => re.test(name.trim()));
  return hit ? { Icon: hit[1], color: hit[2] } : null;
}

/** Chip with the tech's logo (monochrome, brand colour on hover). Falls back to text only. */
export function TechChip({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const t = techIcon(name);
  const md = size === "md";
  return (
    <span
      className={`group inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-surface text-muted hover:text-ink hover:border-ink/40 transition-colors ${md ? "px-2.5 py-1.5 text-[.85rem]" : "px-2 py-1 text-[.75rem]"}`}
    >
      {t && (
        <t.Icon
          aria-hidden
          size={md ? 15 : 13}
          className="shrink-0 text-ink/70 transition-colors group-hover:text-[var(--brand)]"
          style={{ ["--brand" as string]: t.color }}
        />
      )}
      {name}
    </span>
  );
}

export function TechList({ items, size }: { items: string[]; size?: "sm" | "md" }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((n) => (
        <li key={n}><TechChip name={n} size={size} /></li>
      ))}
    </ul>
  );
}
