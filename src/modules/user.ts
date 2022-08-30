import { dgraph, EnumType } from "j-dgraph";
import { dgraph_endpoint } from "../config";
import { loading } from "$stores/core";
import { getToken } from "./firebase";

export class User {

    private _dgraph: dgraph;

    constructor(dev = false) {
        this._dgraph = new dgraph({
            isDevMode: dev,
            url: dgraph_endpoint,
            headers: async () => ({
                "X-Auth-Token": await getToken()
            })
        });
    }

    async getUser(u: any) {
        try {
            loading.set(true);
            return await this._dgraph
                .type('user')
                .get({ id: 1, email: 1, displayName: 1, role: 1, username: 1 })
                .filter({ email: u.email })
                .build();
        } catch (e: any) {
            console.error(e);
        } finally {
            loading.set(false);
        }
    }

    async createUser(u: any) {
        try {
            loading.set(true);
            const r = await postData('addUser', u);
            console.log(r);
        } catch (e: any) {
            console.error(e);
        } finally {
            loading.set(false);
        }
    }

    async updateUser(id: string, u: any) {
        try {
            loading.set(true);
            /*return await this._dgraph
                .type('user')
                .update({ id: 1, email: 1, displayName: 1, role: 1, username: 1 })
                .filter(id)
                .set(u)
                .build();*/
        } catch (e: any) {
            console.error(e);
        } finally {
            loading.set(false);
        }
    }
}

const postData = async (url: string, data: any) => {
    const r = await fetch(`/${url}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await r.json();
};


