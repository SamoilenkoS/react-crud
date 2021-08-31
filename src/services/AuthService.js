import http from "../http-common";

class AuthService {
    async login(data) {
        return await http.post("/users/login", data);
      }
}

export default new AuthService();