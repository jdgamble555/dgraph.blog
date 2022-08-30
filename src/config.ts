let process: any;

const p = process?.env ? process.env : import.meta.env;

export const dgraph_endpoint = p.VITE_DGRAPH_ENDPOINT;
export const firebase_config = JSON.parse(p.VITE_FIREBASE_API);