import httpRequest from "../axios";

const api = httpRequest.api("v1");

async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const response = await api.post(
    "sign",
    { username, password },
    {
      validateStatus: (status) => status === 200,
    }
  );
  return response.data;
}

const signApi = {
  signIn,
};
export default signApi;
