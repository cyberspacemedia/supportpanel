// src/config/apiConfig.js

const apiVersion = "v1";
const apiType = "support";
const apiBaseUrl = "https://api.trafficshield.io/";
export const apiURL = `${apiBaseUrl}${apiVersion}/${apiType}`;
export const apiKey = "7qttpzTQ2tRlkaAVQjTmysXRuLILTWqP";
export const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-api-key": `${apiKey}`,
    },
  };
