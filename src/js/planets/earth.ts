import * as THREE from 'three';
import Planet from "./planet";

// @ts-ignore
import EarthMap from "src/file/mesh/earth/earth_atmos_2048.jpg";
// @ts-ignore
import EarthSpecularMap from "src/file/mesh/earth/earth_specular_2048.jpg";
// @ts-ignore
import EarthNormalMap from "src/file/mesh/earth/earth_normal_2048.jpg";
// @ts-ignore
import EarthCloundsMap from "src/file/mesh/earth/earth_clouds_1024.png";

const Name = "Earth";

export default class Earth extends Planet {
    name: PlanetName = Name;
    clouds: THREE.Mesh;
    equator?: THREE.Mesh;
    constructor(options?: PlanetParams) {
        super(options);
    }

    createMesh() {
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const meterial = new THREE.MeshPhongMaterial({
            specular: 0x333333, 
            shininess: 15,
            map: textureLoader.load(EarthMap),
            specularMap: textureLoader.load(EarthSpecularMap),
            normalMap: textureLoader.load(EarthNormalMap),
            normalScale: new THREE.Vector2(0.85, -0.85),
        })
        this.mesh = new THREE.Mesh(sphere, meterial);
        this.mesh.name = Name;

        this.createClouds();

        // this.createEquator();
    }

    createClouds(): void {
        if(!this.mesh) return;
        // 云层
        const sphere = new THREE.SphereGeometry(this.radius, 100, 100);
        const textureLoader = new THREE.TextureLoader();
        const materialClouds = new THREE.MeshLambertMaterial({
            map: textureLoader.load(EarthCloundsMap),
            transparent: true
        });
        const meshClouds = new THREE.Mesh(sphere, materialClouds);
        const cloudsScale = 1.0005;
        meshClouds.scale.set(cloudsScale, cloudsScale, cloudsScale);
        meshClouds.name = Name + "-Clouds";
        this.mesh.add(meshClouds);
        this.clouds = meshClouds;
    }

    createEquator(): void {
        if(!this.mesh) return;
        // 赤道
        const equator = new THREE.Mesh(
            new THREE.RingGeometry(this.radius*0.99, this.radius*1.01, 100, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
            })
        )
        equator.rotation.x = Math.PI / 2;
        equator.name = "Equator";
        this.mesh.add(equator);
    }

    run(): void {
        super.run();
        // 云层转动
        this.clouds && (this.clouds.rotation.y += Math.PI / 3600);
    }
}