import {defineSecret} from "firebase-functions/params";

// OpenAI 用 APIキー
export const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

// Unsplash 用 APIキー
export const UNSPLASH_ACCESS_KEY = defineSecret("UNSPLASH_ACCESS_KEY");
