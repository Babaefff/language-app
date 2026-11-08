import { Capacitor } from '@capacitor/core';

/** True inside the Android/iOS app (Capacitor), false on the website. */
export const isNative = Capacitor.isNativePlatform();

/**
 * Recorded clips are too big to ship inside the app (hundreds of MB), so the app streams them
 * from the website; the phone keeps played clips in its cache.
 */
export const AUDIO_ORIGIN = isNative ? 'https://habloso.netlify.app/' : './';
