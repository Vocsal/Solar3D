declare interface PlanetParams {
    radius?: number;
    initPosition?: THREE.Vector3;
    center?: THREE.Vector3 | Function;
    orbitalPeriod?: number;
    inclination?: number,
    rotationPeriod?: number;
    obliquity?: number;

    mesh?: THREE.Mesh;
    trackWidth?: number | Function;
}

declare type PlanetName = "Sun" | "Mercury" | "Venus" | "Earth" | "Moon" | "Mars" | "Jupiter" | "Saturn" | "Uranus" | "Neptune" | "Pluto";