import axios from "axios";

//-----content generation-----
export const generateContentAPI = async (userPrompt) => {
  const response = await axios.post(
    "http://localhost:7050/api/v1/openai/generate-content",
    {
      prompt: userPrompt,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
