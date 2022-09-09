import supertest from "supertest";
import app from '../index';

const request = supertest(app);

describe('Test endpoint response for Root API Route', () => {
    it('gets the api endpoint', async () : Promise<void> => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    }
)});
