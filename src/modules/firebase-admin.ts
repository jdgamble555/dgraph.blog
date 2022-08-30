import { auth, credential } from 'firebase-admin';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';

let process: any;

const p = process?.env ? process.env : import.meta.env;

// initiate firebase admin
const firebase_admin_config = JSON.parse(p.VITE_FIREBASE_ADMIN_API);

getApps().length === 0 ? initializeApp({
    credential: credential.cert(firebase_admin_config)
}) : getApp();

export const getAdminToken = async (uid: string) => {

    // create custom token claim
    const API_KEY = JSON.parse(p.VITE_FIREBASE_API).apiKey;
    const customToken = await auth().createCustomToken(uid, {
        ROLE: 'admin'
    });

    // sign in with custom claim with REST API
    const tokenURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=';
    const response = await fetch(tokenURL + API_KEY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: customToken,
            returnSecureToken: true
        })
    }).then(async (r) => await r.json());

    return response.idToken;
}

export const getVerifiedUser = async (request: Request) => {

    // verify token from request object and get uid
    const user = await request.json();
    const token = user.stsTokenManager.accessToken;
    return await auth().verifyIdToken(token, true);
};