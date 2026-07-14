import { PMREMGenerator } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export function createAssetPipeline(renderer){
  const dracoLoader=new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

  const ktx2Loader=new KTX2Loader();
  ktx2Loader.setTranscoderPath("https://unpkg.com/three@0.166.1/examples/jsm/libs/basis/");
  ktx2Loader.detectSupport(renderer);

  const gltfLoader=new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.setKTX2Loader(ktx2Loader);

  const rgbeLoader=new RGBELoader();
  const pmremGenerator=new PMREMGenerator(renderer);

  async function loadEnvironmentHDR(hdrUrl){
    const hdrTexture=await rgbeLoader.loadAsync(hdrUrl);
    const envMap=pmremGenerator.fromEquirectangular(hdrTexture).texture;
    hdrTexture.dispose();
    return envMap;
  }

  return {
    gltfLoader,
    rgbeLoader,
    ktx2Loader,
    dracoLoader,
    loadEnvironmentHDR,
    dispose(){
      pmremGenerator.dispose();
      ktx2Loader.dispose();
      dracoLoader.dispose();
    },
  };
}
