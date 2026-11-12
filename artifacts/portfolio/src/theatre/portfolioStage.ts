import { getProject, types, type ISheet, type ISheetObject } from "@theatre/core";

export interface WalkthroughAct {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  sceneTime: number;
  selector: string;
}

export const THEATRE_SEQUENCE_LENGTH = 12;

export const WALKTHROUGH_ACTS: WalkthroughAct[] = [
  {
    id: "hero",
    index: "00",
    title: "Prologue",
    subtitle: "Opening Convo",
    sceneTime: 0.0,
    selector: "#hero",
  },
  {
    id: "about",
    index: "01",
    title: "Philosophy",
    subtitle: "Systems Craft",
    sceneTime: 2.1,
    selector: "#about",
  },
  {
    id: "experience",
    index: "02",
    title: "Production",
    subtitle: "Darwix · Caterworld · AIMaster",
    sceneTime: 4.4,
    selector: "#experience",
  },
  {
    id: "projects",
    index: "03",
    title: "Case Reel",
    subtitle: "7 Walkthrough Builds",
    sceneTime: 6.9,
    selector: "#projects",
  },
  {
    id: "skills",
    index: "04",
    title: "Arsenal",
    subtitle: "Stack & Archive",
    sceneTime: 8.8,
    selector: "#skills",
  },
  {
    id: "certifications",
    index: "05",
    title: "Credentials",
    subtitle: "NPTEL · Azure · Cisco",
    sceneTime: 10.3,
    selector: "#certifications",
  },
  {
    id: "contact",
    index: "06",
    title: "Epilogue",
    subtitle: "Start a Convo",
    sceneTime: 12.0,
    selector: "#contact",
  },
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
    [0.0, 0.55],
    [2.1, 2.3],
    [4.4, -2.0],
    [6.9, 0.15],
    [8.8, 1.85],
    [10.3, -1.2],
    [12.0, 0.35],
  ],
  "position.y": [
    [0.0, 0.25],
    [2.1, 0.72],
    [4.4, -0.32],
    [6.9, 0.92],
    [8.8, 1.38],
    [10.3, 0.55],
    [12.0, 0.08],
  ],
  "position.z": [
    [0.0, 6.4],
    [2.1, 5.8],
    [4.4, 5.2],
    [6.9, 7.25],
    [8.8, 6.1],
    [10.3, 5.5],
    [12.0, 4.95],
  ],
  "target.x": [
    [0.0, 0.0],
    [2.1, -0.35],
    [4.4, 0.42],
    [6.9, 0.0],
    [8.8, -0.2],
    [10.3, 0.22],
    [12.0, 0.0],
  ],
  "target.y": [
    [0.0, 0.05],
    [2.1, 0.12],
    [4.4, -0.05],
    [6.9, 0.0],
    [8.8, 0.18],
    [10.3, 0.06],
    [12.0, 0.0],
  ],
  fov: [
    [0.0, 44],
    [2.1, 41],
    [4.4, 39],
    [6.9, 49],
    [8.8, 43],
    [10.3, 40],
    [12.0, 38],
  ],
});

const lightsTracks = buildTracks("lgt", {
  keyIntensity: [
    [0.0, 3.2],
    [2.1, 2.7],
    [4.4, 3.8],
    [6.9, 2.9],
    [8.8, 2.6],
    [10.3, 3.0],
    [12.0, 3.6],
  ],
  rimIntensity: [
    [0.0, 2.2],
    [2.1, 2.8],
    [4.4, 2.1],
    [6.9, 3.1],
    [8.8, 2.4],
    [10.3, 2.7],
    [12.0, 1.9],
  ],
  keyColor: [
    [0.0, { r: 0.92, g: 0.68, b: 0.38, a: 1 }],
    [4.4, { r: 0.95, g: 0.63, b: 0.34, a: 1 }],
    [6.9, { r: 0.65, g: 0.56, b: 0.98, a: 1 }],
    [10.3, { r: 0.88, g: 0.72, b: 0.45, a: 1 }],
    [12.0, { r: 0.96, g: 0.71, b: 0.42, a: 1 }],
  ],
  rimColor: [
    [0.0, { r: 0.58, g: 0.51, b: 0.98, a: 1 }],
    [4.4, { r: 0.46, g: 0.76, b: 0.96, a: 1 }],
    [6.9, { r: 0.76, g: 0.53, b: 0.98, a: 1 }],
    [12.0, { r: 0.63, g: 0.54, b: 0.98, a: 1 }],
  ],
});

const monolithTracks = buildTracks("mono", {
  "rotation.x": [
    [0.0, 0.22],
    [2.1, 0.48],
    [4.4, 0.15],
    [6.9, -0.35],
    [8.8, 0.42],
    [10.3, 0.18],
    [12.0, 0.1],
  ],
  "rotation.y": [
    [0.0, 0.35],
    [2.1, 1.45],
    [4.4, 2.65],
    [6.9, 4.1],
    [8.8, 5.2],
    [10.3, 6.05],
    [12.0, 6.65],
  ],
  ringSpread: [
    [0.0, 1.0],
    [2.1, 1.18],
    [4.4, 1.08],
    [6.9, 1.42],
    [8.8, 1.24],
    [10.3, 1.06],
    [12.0, 0.92],
  ],
  coreScale: [
    [0.0, 1.0],
    [2.1, 0.92],
    [4.4, 1.06],
    [6.9, 0.86],
    [8.8, 1.02],
    [12.0, 1.1],
  ],
});

const atmosphereTracks = buildTracks("atm", {
  shaderMix: [
    [0.0, 0.18],
    [4.4, 0.52],
    [6.9, 0.85],
    [10.3, 0.36],
    [12.0, 0.22],
  ],
  particleSpread: [
    [0.0, 1.0],
    [6.9, 1.38],
    [12.0, 0.88],
  ],
});

const theatreProjectState = {
  definitionVersion: "0.4.0",
  revisionHistory: ["saathvik-portfolio-cinematic-v1"],
  sheetsById: {
    MainStage: {
      staticOverrides: {
        byObject: {},
      },
      sequence: {
        type: "PositionalSequence",
        length: THEATRE_SEQUENCE_LENGTH,
        subUnitsPerUnit: 30,
        tracksByObject: {
          CameraRig: cameraTracks,
          Lights: lightsTracks,
          Monolith: monolithTracks,
          Atmosphere: atmosphereTracks,
        },
      },
    },
  },
};

export interface StageRigObjects {
  sheet: ISheet;
  cameraObj: ISheetObject<{
    position: { x: number; y: number; z: number };
    target: { x: number; y: number; z: number };
    fov: number;
  }>;
  lightsObj: ISheetObject<{
    keyIntensity: number;
    rimIntensity: number;
    keyColor: ReturnType<typeof types.rgba>;
    rimColor: ReturnType<typeof types.rgba>;
  }>;
  monolithObj: ISheetObject<{
    rotation: { x: number; y: number };
    ringSpread: number;
    coreScale: number;
  }>;
  atmosphereObj: ISheetObject<{
    shaderMix: number;
    particleSpread: number;
  }>;
}

let cachedRig: StageRigObjects | null = null;

export function getPortfolioStageRig(): StageRigObjects {
  if (cachedRig) return cachedRig;

  const project = getProject("SaathvikPortfolioWalkthrough", {
    state: theatreProjectState,
  });

  const sheet = project.sheet("MainStage");

  const cameraObj = sheet.object("CameraRig", {
    position: { x: 0.55, y: 0.25, z: 6.4 },
    target: { x: 0.0, y: 0.05, z: 0.0 },
    fov: 44,
  });

  const lightsObj = sheet.object("Lights", {
    keyIntensity: 3.2,
    rimIntensity: 2.2,
    keyColor: types.rgba({ r: 0.92, g: 0.68, b: 0.38, a: 1 }),
    rimColor: types.rgba({ r: 0.58, g: 0.51, b: 0.98, a: 1 }),
  });

  const monolithObj = sheet.object("Monolith", {
    rotation: { x: 0.22, y: 0.35 },
    ringSpread: 1.0,
    coreScale: 1.0,
  });

  const atmosphereObj = sheet.object("Atmosphere", {
    shaderMix: 0.18,
    particleSpread: 1.0,
  });

  cachedRig = {
    sheet,
    cameraObj,
    lightsObj,
    monolithObj,
    atmosphereObj,
  };

  return cachedRig;
}
