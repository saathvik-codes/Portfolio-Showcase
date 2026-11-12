import { getProject, types, type ISheet, type ISheetObject } from "@theatre/core";

export interface WalkthroughAct {
  id: string;
  index: string;
  title: string;
  sceneTime: number;
  selector: string;
}

export const THEATRE_SEQUENCE_LENGTH = 12;

export const WALKTHROUGH_ACTS: WalkthroughAct[] = [
  { id: "hero", index: "00", title: "Overview", sceneTime: 0.0, selector: "#hero" },
  { id: "about", index: "01", title: "Background", sceneTime: 2.2, selector: "#about" },
  { id: "experience", index: "02", title: "Experience", sceneTime: 4.5, selector: "#experience" },
  { id: "projects", index: "03", title: "Work", sceneTime: 7.0, selector: "#projects" },
  { id: "skills", index: "04", title: "Skills", sceneTime: 9.0, selector: "#skills" },
  { id: "certifications", index: "05", title: "Credentials", sceneTime: 10.5, selector: "#certifications" },
  { id: "contact", index: "06", title: "Contact", sceneTime: 12.0, selector: "#contact" },
];

type KeyPoint<T> = [position: number, value: T];

function makeTrack<T extends number | { r: number; g: number; b: number; a: number }>(
  trackId: string,
  points: KeyPoint<T>[],
) {
  return {
    type: "BasicKeyframedTrack" as const,
    keyframes: points.map(([position, value], i) => ({
      id: `${trackId}_k${i}`,
      position,
      connectedRight: true,
      handles: [0.42, 0.5, 0.58, 0.5] as [number, number, number, number],
      value,
    })),
  };
}

function buildTracks(
  prefix: string,
  entries: Record<string, KeyPoint<number | { r: number; g: number; b: number; a: number }>[]>,
) {
  const trackIdByPropPath: Record<string, string> = {};
  const trackData: Record<string, ReturnType<typeof makeTrack>> = {};

  let idx = 0;
  for (const dotPath in entries) {
    if (!Object.prototype.hasOwnProperty.call(entries, dotPath)) continue;
    const pts = entries[dotPath];
    const id = `${prefix}_t${idx++}`;
    const propKey = JSON.stringify(dotPath.split("."));
    trackIdByPropPath[propKey] = id;
    trackData[id] = makeTrack(id, pts);
  }

  return { trackIdByPropPath, trackData };
}

const cameraTracks = buildTracks("cam", {
  "position.x": [
    [0.0, 0.6],
    [2.2, 2.8],
    [4.5, -2.5],
    [7.0, 2.2],
    [9.0, -2.2],
    [12.0, 0.8],
  ],
  "position.y": [
    [0.0, 0.3],
    [4.5, 0.85],
    [9.0, -0.4],
    [12.0, 0.2],
  ],
  "position.z": [
    [0.0, 6.8],
    [4.5, 8.2],
    [9.0, 7.6],
    [12.0, 6.6],
  ],
  fov: [
    [0.0, 42],
    [6.0, 46],
    [12.0, 40],
  ],
});

const monolithTracks = buildTracks("mono", {
  "rotation.x": [
    [0.0, 0.25],
    [4.5, 0.6],
    [9.0, -0.25],
    [12.0, 0.15],
  ],
  "rotation.y": [
    [0.0, 0.2],
    [6.0, 2.8],
    [12.0, 5.4],
  ],
  ringSpread: [
    [0.0, 1.0],
    [6.0, 1.25],
    [12.0, 0.96],
  ],
});

const atmosphereTracks = buildTracks("atm", {
  tintShift: [
    [0.0, 0.15],
    [6.0, 0.55],
    [12.0, 0.25],
  ],
});

const theatreProjectState = {
  definitionVersion: "0.4.0",
  revisionHistory: ["saathvik-portfolio-light-v2"],
  sheetsById: {
    MainStage: {
      staticOverrides: { byObject: {} },
      sequence: {
        type: "PositionalSequence",
        length: THEATRE_SEQUENCE_LENGTH,
        subUnitsPerUnit: 30,
        tracksByObject: {
          CameraRig: cameraTracks,
          Monolith: monolithTracks,
          Atmosphere: atmosphereTracks,
        },
      },
    },
  },
};

export interface LightStageRig {
  sheet: ISheet;
  cameraObj: ISheetObject<{
    position: { x: number; y: number; z: number };
    fov: number;
  }>;
  monolithObj: ISheetObject<{
    rotation: { x: number; y: number };
    ringSpread: number;
  }>;
  atmosphereObj: ISheetObject<{
    tintShift: number;
    dayLightColor: ReturnType<typeof types.rgba>;
  }>;
}

let cachedRig: LightStageRig | null = null;

export function getLightStageRig(): LightStageRig {
  if (cachedRig) return cachedRig;

  const project = getProject("SaathvikPortfolioLight", { state: theatreProjectState });
  const sheet = project.sheet("MainStage");

  const cameraObj = sheet.object("CameraRig", {
    position: { x: 0.6, y: 0.3, z: 6.8 },
    fov: 42,
  });

  const monolithObj = sheet.object("Monolith", {
    rotation: { x: 0.25, y: 0.2 },
    ringSpread: 1.0,
  });

  const atmosphereObj = sheet.object("Atmosphere", {
    tintShift: 0.15,
    dayLightColor: types.rgba({ r: 0.15, g: 0.39, b: 0.92, a: 1 }),
  });

  cachedRig = { sheet, cameraObj, monolithObj, atmosphereObj };
  return cachedRig;
}
