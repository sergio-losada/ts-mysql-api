import { databaseURI, databaseName} from '../config';

class TestRepository {
    // Declaraciones para cliente DB

    constructor() {
        // Inicializaciones para cliente DB
    }

    async connect(): Promise<void> {
        console.log('Connected to DB');
    }

    async disconnect(): Promise<void> {
        console.log('DB connection closed');
    }

    async getTestResponse() {
        return "Kodas Server status: UP";
    }

}

export { TestRepository };