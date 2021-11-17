import http from "../http-common";

class TutorialDataService {
    async getAll() {
        return await http.get("/tutorials");
    }

    async get(id) {
        return http.get(`/tutorials/${id}`);
    }

    async create(data) {
        return http.post("/tutorials", data);
    }

    async update(data) {
        return http.put("/tutorials", data);
    }

    async delete(id) {
        return http.delete(`/tutorials/${id}`);
    }

    async deleteAll() {
        return http.delete(`/tutorials`);
    }
}

export default new TutorialDataService();