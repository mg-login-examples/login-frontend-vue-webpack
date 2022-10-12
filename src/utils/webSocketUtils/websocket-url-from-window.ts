export function getWebSocketUrlFromWindow(webSocketPath: string) {
  const loc = window.location;
  let new_uri;
  if (loc.protocol === "https:") {
    new_uri = "wss:";
  } else {
    new_uri = "ws:";
  }
  new_uri += "//" + loc.host;
  new_uri += webSocketPath;
  return new_uri;
}
