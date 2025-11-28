// src/helper/cache.helper.js  (Deno-compatible)
import axios from "npm:axios@1.6.7";

// NOTE:
// We intentionally DO NOT call dotenv.config() here.
// If you want automatic .env loading, do it once in deno-entry.js by importing:
// import "npm:dotenv@16.4.5/config";
// After that, use Deno.env.get(...) to read env vars.

const CACHE_SERVER_URL = Deno.env.get("CACHE_URL") || null;

export const getCachedData = async (key) => {
  try {
    if (!CACHE_SERVER_URL) {
      // No cache server configured — just return undefined
      // (keep the log for debugging)
      console.log("CACHE_SERVER_URL not set");
      return null;
    }
    const response = await axios.get(`${CACHE_SERVER_URL}/${encodeURIComponent(key)}`);
    return response.data;
  } catch (error) {
    // axios error shape: error.response may exist
    if (error?.response?.status === 404) {
      return null;
    }
    // rethrow so caller can handle
    throw error;
  }
};

export const setCachedData = async (key, value) => {
  try {
    if (!CACHE_SERVER_URL) {
      return;
    }
    await axios.post(CACHE_SERVER_URL, { key, value });
  } catch (error) {
    console.error("Error setting cache data:", error);
    throw error;
  }
};
