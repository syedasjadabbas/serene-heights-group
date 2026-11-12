// Galiyat elevation data: loading and sampling.
// public/data/galiyat-dem.bin is Int16 metres on a 200 m grid (AWS Terrain Tiles, Terrarium),
// origin at 33.95° N, 73.26° E — the same file the Nathia Gali site's map uses.

export const DEM = { x0: -40, z0: -44, step: 0.2, nx: 371, nz: 461 };
const LAT0 = 33.95;
const LON0 = 73.26;

/** Latitude/longitude → local km (x = east, z = south) on the DEM grid. */
export const project = (lat: number, lon: number) => [(lon - LON0) * 92.3, -(lat - LAT0) * 111.3] as const;

let pending: Promise<Int16Array> | null = null;

/** Load the elevation grid once; every caller shares the same in-flight request and result. */
export function loadDem(): Promise<Int16Array> {
  pending ??= fetch("/data/galiyat-dem.bin")
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.statusText))))
    .then((b) => new Int16Array(b))
    .catch((e) => {
      pending = null; // allow a retry on the next mount
      throw e;
    });
  return pending;
}

/** Bilinear elevation in km at local x, z (km). */
export function sample(d: Int16Array, x: number, z: number) {
  const fx = Math.min(DEM.nx - 1.001, Math.max(0, (x - DEM.x0) / DEM.step));
  const fz = Math.min(DEM.nz - 1.001, Math.max(0, (z - DEM.z0) / DEM.step));
  const i = Math.floor(fx);
  const j = Math.floor(fz);
  const tx = fx - i;
  const tz = fz - j;
  const r0 = j * DEM.nx;
  const r1 = r0 + DEM.nx;
  return (
    ((d[r0 + i] * (1 - tx) + d[r0 + i + 1] * tx) * (1 - tz) + (d[r1 + i] * (1 - tx) + d[r1 + i + 1] * tx) * tz) / 1000
  );
}
