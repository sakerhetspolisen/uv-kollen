/* eslint-disable no-underscore-dangle */
import Router from "next/router";

const isExcludedUrl = (url, patterns) => {
  let excluded = false;
  patterns.forEach((pattern) => {
    if (pattern.exec(url) !== null) {
      excluded = true;
    }
  });
  return excluded;
};

// to push custom events
export function push(args) {
  if (!window._paq) {
    window._paq = [];
  }
  window._paq.push(args);
}

// initialize the tracker
export function init({
  url,
  siteId,
  jsTrackerFile = "matomo.js",
  phpTrackerFile = "matomo.php",
  excludeUrlsPatterns = [],
  onRouteChangeStart = undefined,
  onRouteChangeComplete = undefined,
  onInitialization = undefined,
}) {
  window._paq = window._paq !== null ? window._paq : [];
  let previousPath = "";
  // order is important -_- so campaign are detected
  const excludedUrl =
    typeof window !== "undefined" &&
    isExcludedUrl(window.location.pathname, excludeUrlsPatterns);

  if (onInitialization) onInitialization();

  if (!excludedUrl) {
    push(["trackPageView"]);
  }

  push(["enableLinkTracking"]);
  push(["setTrackerUrl", `${url}/${phpTrackerFile}`]);
  push(["setSiteId", siteId]);
  push(["setRequestMethod", "POST"]);

  /**
   * for initial loading we use the location.pathname
   * as the first url visited.
   * Once user navigate across the site,
   * we rely on Router.pathname
   */

  const scriptElement = document.createElement("script");
  const refElement = document.getElementsByTagName("script")[0];
  scriptElement.type = "text/javascript";
  scriptElement.async = true;
  scriptElement.defer = true;
  scriptElement.src = `${url}/${jsTrackerFile}`;
  if (refElement.parentNode) {
    refElement.parentNode.insertBefore(scriptElement, refElement);
  }
  // eslint-disable-next-line no-restricted-globals
  previousPath = location.pathname;

  const defaultOnRouteChangeStart = (path) => {
    if (isExcludedUrl(path, excludeUrlsPatterns)) return;

    // We use only the part of the url without the querystring to ensure piwik is happy
    // It seems that piwik doesn't track well page with querystring
    const [pathname] = path.split("?");

    if (previousPath) {
      push(["setReferrerUrl", `${previousPath}`]);
    }
    push(["setCustomUrl", pathname]);
    push(["deleteCustomVariables", "page"]);
    push(["setRequestMethod", "POST"]);
    previousPath = pathname;

    if (onRouteChangeStart) onRouteChangeStart(path);
  };

  Router.events.on("routeChangeStart", defaultOnRouteChangeStart);

  const defaultOnRouteChangeComplete = (path) => {
    if (isExcludedUrl(path, excludeUrlsPatterns)) {
      return;
    }

    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      push(["setDocumentTitle", document.title]);
      push(["trackPageView"]);
      push(["setRequestMethod", "POST"]);
    }, 0);

    if (onRouteChangeComplete) onRouteChangeComplete(path);
  };

  Router.events.on("routeChangeComplete", defaultOnRouteChangeComplete);
}

export default init;
