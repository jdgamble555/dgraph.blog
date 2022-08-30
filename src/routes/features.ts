import { dev } from '$app/environment';
import { Feature } from '../modules/feature';

export async function get() {
    const fService = new Feature(dev);
    return {
        body: (await fService.queryFeature()).data
    };
}