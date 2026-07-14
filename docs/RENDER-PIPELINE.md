# Render Pipeline Baseline

This project now uses a project-wide visual pipeline designed to scale from stylized procedural rooms to photoreal content as assets are introduced.

## Global Runtime Controls

- Quality tiers: `low`, `medium`, `high`
- Brightness scale: persisted user setting
- Bloom strength: persisted user setting
- Room light profiles: centralized exposure/intensity tuning per room index

All settings are wired globally in runtime and affect all rooms.

## Core Modules

- `src/render/qualityProfiles.js`
  - `QUALITY_PROFILES`
  - `DEFAULT_VISUAL_SETTINGS`
  - `ROOM_LIGHT_PROFILES`
- `src/render/assetPipeline.js`
  - GLTF + DRACO + KTX2 + HDR loader scaffold
  - PMREM-ready HDR environment conversion helper

## Asset Structure

- `src/assets/models/` for `.glb/.gltf`
- `src/assets/textures/` for PBR texture sets (prefer KTX2 when possible)
- `src/assets/hdr/` for environment HDR maps

## Migration Strategy (Project-Wide)

1. Keep current procedural rooms as fallback.
2. Introduce room-level GLB assets incrementally (all rooms, one by one).
3. Standardize each room to PBR materials and authored lighting.
4. Use same quality tiers and post effects for all rooms.

## Performance Notes

- Android-first: use `medium` default for device thermal stability.
- Keep `high` quality for desktop/testing.
- Use KTX2 textures and DRACO meshes to reduce memory and load time.
