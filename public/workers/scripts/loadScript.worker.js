self.onmessage = function (e) {
  const { scriptUrl } = e.data;
  self.importScripts(scriptUrl);
  self.postMessage(`Script loaded: ${scriptUrl}`);
};
