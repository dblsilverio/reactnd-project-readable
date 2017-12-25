const API_URL = 'http://localhost:3001';
const HEADERS = {
    'Accept': 'application/json',
    'Authorization': "App"
  }

export default class ReadAPI {

    async categories(){
        console.log(HEADERS);
        const response = await fetch(`${API_URL}/categories`, {headers: HEADERS});
        return response.json();
    }

}