export async function createRequest(bodyRequest) {
  const response = await fetch("http://localhost:8080", {
    method: "POST",
    body: bodyRequest,
    headers: {
      "x-api-key": "ECA1AB4CE8583613A2C759B445E98",
      "Content-Type": "application/json"
    }
  })  
  return response.json()
}