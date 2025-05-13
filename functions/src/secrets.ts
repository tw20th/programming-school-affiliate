import {defineSecret} from "firebase-functions/params";

// OpenAI 用 APIキー
export const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

// Unsplash 用 APIキー
export const UNSPLASH_ACCESS_KEY = defineSecret("UNSPLASH_ACCESS_KEY");

// Google Sheets API 用サービスアカウント情報
export const GOOGLE_SERVICE_ACCOUNT_EMAIL = defineSecret(
  "GOOGLE_SERVICE_ACCOUNT_EMAIL"
);
export const GOOGLE_PRIVATE_KEY = defineSecret("GOOGLE_PRIVATE_KEY");
