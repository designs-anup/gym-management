export const getApiUrl = (path) => {
  const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";
  const pageHostname = window.location.hostname;
  const pageIsLocalhost =
    pageHostname === "localhost" ||
    pageHostname === "127.0.0.1";
  const apiIsLocalhost =
    rawApiBaseUrl.startsWith("http://localhost") ||
    rawApiBaseUrl.startsWith("http://127.0.0.1");

  if (rawApiBaseUrl && (!apiIsLocalhost || pageIsLocalhost)) {
    return `${rawApiBaseUrl.replace(/\/$/, "")}${path}`;
  }

  return path;
};
