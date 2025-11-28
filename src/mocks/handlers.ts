import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/check", () => {
    return HttpResponse.json({
      status: "ok",
      time: new Date().toISOString(),
    });
  }),
];
