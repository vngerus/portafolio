export type DeviceType = "mobile" | "tablet" | "desktop";

export interface ResponsiveSizes {
  catScale: number;
  catPosition: [number, number, number];
  cameraPosition: [number, number, number];
}

export const calculateResponsiveSizes = (deviceType: DeviceType): ResponsiveSizes => {
  switch (deviceType) {
    case "mobile":
      return {
        catScale: 3,
        catPosition: [0.0, -4.0, 1.1],
        cameraPosition: [0, 0, 20],
      };
    case "tablet":
      return {
        catScale: 5,
        catPosition: [0.0, -6.0, 0],
        cameraPosition: [0, 0, 25],
      };
    case "desktop":
    default:
      return {
        catScale: 9,
        catPosition: [0.0, -10.2, 0.0],
        cameraPosition: [0, 0, 30],
      };
  }
};
