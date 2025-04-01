import { http, HttpResponse } from "msw";
export interface MockResponse {
  body: string;
  error?: string;
}

const mockResponse: MockResponse = {
  body: "Mock Data",
};
export const handlers = [
  http.get("https://api.com", () => {
    return HttpResponse.json(mockResponse, { status: 200 });
  }),
];
