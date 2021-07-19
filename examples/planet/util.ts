import Planet from 'src/js/planets/planet';
import { PlanetParams } from 'src/js/types/planet'
import Config from "./config";

interface PlanetClass {
    new (options: PlanetParams): Planet,
    name: string,
}

export function getPlanet(name: string): Planet {
    // @ts-ignore
    return new Config.Planets[name](getPlanetOptions(name));
}

export function getPlanetOptions(name: string) {
    // @ts-ignore
    return Config.options[name];
}