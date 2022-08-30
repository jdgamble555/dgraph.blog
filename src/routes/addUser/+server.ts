import { getAdminToken, getVerifiedUser } from "$modules/firebase-admin";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {

    const decodedToken = await getVerifiedUser(request);

    const adminToken = await getAdminToken(decodedToken.uid);

    return new Response(JSON.stringify({
        me: adminToken
    }));
};


/*return await this._dgraph
.type('user')
.add({ id: 1, email: 1, displayName: 1, role: 1, username: 1 })
.set({
    email: u.email,
    displayName: u.displayName,
    role: new EnumType('AUTHOR')
})
.build();*/