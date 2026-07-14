export const ROOM_ASSET_REGISTRY={
  0:{ key:"lvl-01", label:"The Come Up", modelUrl:null, environmentUrl:null, hideProcedural:false, sceneConfig:null, materialTuning:null },
  1:{ key:"lvl-02", label:"The Cook Up", modelUrl:null, environmentUrl:null, hideProcedural:false, sceneConfig:null, materialTuning:null },
  2:{ key:"lvl-03", label:"The Graveyard Shift", modelUrl:null, environmentUrl:null, hideProcedural:false, sceneConfig:null, materialTuning:null },
  3:{ key:"lvl-04", label:"The Front", modelUrl:null, environmentUrl:null, hideProcedural:false, sceneConfig:null, materialTuning:null },
  4:{ key:"lvl-05", label:"Top Floor", modelUrl:null, environmentUrl:null, hideProcedural:false, sceneConfig:null, materialTuning:null },
  5:{ key:"lvl-06", label:"The Warehouse", modelUrl:null, environmentUrl:null, hideProcedural:false, sceneConfig:null, materialTuning:null },
};

function applyTransform(target, transform={}){
  const { position, rotation, scale }=transform;
  if(position) target.position.set(position[0]||0,position[1]||0,position[2]||0);
  if(rotation) target.rotation.set(rotation[0]||0,rotation[1]||0,rotation[2]||0);
  if(scale){
    if(Array.isArray(scale)) target.scale.set(scale[0]||1,scale[1]||1,scale[2]||1);
    else target.scale.setScalar(scale||1);
  }
}

function tuneMaterial(material, tuning={}){
  if(!material) return;
  if(typeof tuning.envMapIntensity==="number"&&"envMapIntensity" in material) material.envMapIntensity=tuning.envMapIntensity;
  if(typeof tuning.roughness==="number"&&"roughness" in material) material.roughness=tuning.roughness;
  if(typeof tuning.metalness==="number"&&"metalness" in material) material.metalness=tuning.metalness;
  if(typeof tuning.normalScale==="number"&&material.normalScale?.setScalar) material.normalScale.setScalar(tuning.normalScale);
  if(typeof tuning.flatShading==="boolean"&&"flatShading" in material) material.flatShading=tuning.flatShading;
  material.needsUpdate=true;
}

function applyMaterialTuning(node, entry){
  const tuning=entry.materialTuning;
  if(!node.isMesh||!tuning) return;
  if(Array.isArray(node.material)) node.material.forEach(mat=>tuneMaterial(mat,tuning));
  else tuneMaterial(node.material,tuning);
}

export async function applyRoomAssetLayer({
  levelIndex,
  levelGroup,
  scene,
  assetPipeline,
  decorateNode,
  shouldApply,
}){
  const entry=ROOM_ASSET_REGISTRY[levelIndex];
  if(!entry||(!entry.modelUrl&&!entry.environmentUrl)) return { applied:false, reason:"no-assets" };
  if(shouldApply&&!shouldApply()) return { applied:false, reason:"stale-request" };

  if(entry.environmentUrl){
    const envMap=await assetPipeline.loadEnvironmentHDR(entry.environmentUrl);
    if(shouldApply&&!shouldApply()) return { applied:false, reason:"stale-request" };
    scene.environment=envMap;
    if(entry.useEnvironmentAsBackground) scene.background=envMap;
  }

  if(entry.modelUrl){
    const existingChildren=entry.hideProcedural?[...levelGroup.children]:null;
    const gltf=await assetPipeline.loadGLTF(entry.modelUrl);
    if(shouldApply&&!shouldApply()) return { applied:false, reason:"stale-request" };
    const roomRoot=gltf.scene;
    applyTransform(roomRoot,entry.transform);
    roomRoot.traverse(node=>{
      if(node.isMesh){
        node.castShadow=true;
        node.receiveShadow=true;
      }
      applyMaterialTuning(node,entry);
      if(decorateNode) decorateNode(node);
    });
    if(existingChildren) existingChildren.forEach(child=>{ child.visible=false; });
    levelGroup.add(roomRoot);
  }

  return { applied:true, entry, sceneConfig:entry.sceneConfig||null };
}
