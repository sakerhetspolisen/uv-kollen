const webStorageKeyPrefix = "uvKollen";

export const tryToParseStorageKeyValue = (
  keyName,
  storageType = "local",
  typeOf = "string"
) => {
  // Check if item exists
  let item = null;
  const keyNameWithPrefix = `${webStorageKeyPrefix}.${keyName}`;
  // eslint-disable-next-line default-case
  switch (storageType) {
    case "local":
      item = localStorage.getItem(keyNameWithPrefix);
      break;
    case "session":
      item = sessionStorage.getItem(keyNameWithPrefix);
      break;
  }
  if (!item) {
    return null;
  }
  // Try to parse value
  try {
    const res = JSON.parse(item);
    // eslint-disable-next-line valid-typeof
    if (typeof res === typeOf) {
      return res;
    }
    throw TypeError;
  } catch (e) {
    // eslint-disable-next-line default-case
    switch (storageType) {
      case "local":
        localStorage.removeItem(keyNameWithPrefix);
        break;
      case "session":
        sessionStorage.removeItem(keyNameWithPrefix);
        break;
    }
    return null;
  }
};

export const setStorageElement = (key, value, storageType = "local") => {
  const keyWithPrefix = `${webStorageKeyPrefix}.${key}`;
  const stringVal = JSON.stringify(value);
  // eslint-disable-next-line default-case
  switch (storageType) {
    case "local":
      localStorage.setItem(keyWithPrefix, stringVal);
      break;
    case "session":
      sessionStorage.setItem(keyWithPrefix, stringVal);
      break;
  }
  return true;
};
