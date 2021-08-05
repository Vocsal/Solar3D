import Planet from 'src/js/planets/planet';
import { PlanetParams, PlanetName } from 'src/js/types/planet'
import Config from "./config";

interface PlanetClass {
    new (options: PlanetParams): Planet,
    name: PlanetName,
}

export function getPlanet(name: PlanetName): Planet {
    return new Config.Planets[name](getPlanetOptions(name));
}

export function getPlanetOptions(name: PlanetName) {
    return Config.options[name];
}