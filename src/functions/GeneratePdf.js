import fnApitest from '../services/fnApitest.js';
import { app } from "@azure/functions";

app.http('GeneratePdf', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const json = request.query.get('json') || (await request.json());
            const respuesta = await fnApitest(json);
            if (!respuesta) {
                return { status: 400, jsonBody: { error: "fnApitest" } };
            } else {
                return { body: respuesta };
            }
        } catch (error) {
            console.error("fnApitest error :", error);
            return { status: 500, jsonBody: { error: "Error interno del servidor" } };
        }
    }
});
export default app;
