export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const clientGQL = (query: string, variables: any = {}) => {
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") as string)
    : null;
  const headers: any = { "Content-Type": "application/json" };
  if (userData) {
    const token = userData?.user?.token;
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(process.env.NEXT_PUBLIC_HASURA_URL as string, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query, variables }),
  });
};
export const client = async (
  endpoint: string,
  { body, ...customConfig }: any = {}
) => {
  const headers: any = { "Content-Type": "application/json" };
  if (customConfig?.["isMultipart"]) {
    delete headers["Content-Type"];
  }
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") as string)
    : null;
  if (userData) {
    const token = userData?.user?.token;
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  if (body && !customConfig?.["isMultipart"]) {
    config.body = JSON.stringify(body);
  }
  if (customConfig?.["isMultipart"]) {
    config.body = body;
  }
  if (typeof window !== "undefined") {
    let data;
    try {
      const response = await window.fetch(BASE_URL + endpoint, config);
      if (response.ok) {
        if (response.status === 204) {
          return {
            status: response.status,
            headers: response.headers,
            url: response.url,
          };
        }
        data = await response.json();
        // Return a result object similar to Axios
        return {
          status: response.status,
          data,
          headers: response.headers,
          url: response.url,
        };
      } else if (response.status === 401) {
        // TODO: Notification                notification.error({message: 'Un Authorized'})
      } else if (response.status === 403) {
        data = await response.json();
        // TODO: Notification notification.error({message: data.message || 'Forbidden'})
        return;
      } else if (response.status === 400) {
        data = await response.json();
        let message = data.message;
        if (data.errorDetails) {
          message = data.errorDetails.map((e: any) => `${e.error}`).join(", ");
        }
        // TODO: notification.error({message: message || 'Forbidden'})
        return {
          status: response.status,
          data,
          headers: response.headers,
          url: response.url,
        };
      } else if (response.body) {
        data = await response.json();
        // TODO:  notification.error({message: data.message})
        return {
          status: response.status,
          data,
          headers: response.headers,
          url: response.url,
        };
      }

      // TODO: notification.error({message: response.statusText || 'Something went wrong'})

      return Promise.reject(response.statusText);
    } catch (err: any) {
      // TODO: notification.error({message: err.message ? err.message : data})
      return Promise.reject(err.message ? err.message : data);
    }
  }
};

client.get = function (endpoint: string, customConfig: any = {}) {
  let params = [];
  if (customConfig.params) {
    for (let p in customConfig.params) {
      params.push(`${p}=${encodeURIComponent(customConfig.params[p])}`);
    }
  }

  if (customConfig.params) {
    return client(endpoint + "?" + params.join("&"), {
      ...customConfig,
      method: "GET",
    });
  } else {
    delete customConfig.params;
    return client(endpoint, { ...customConfig, method: "GET" });
  }
};

client.post = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: "POST" });
};

client.put = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: "PUT" });
};

client.patch = function (endpoint: string, body: any, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: "PATCH" });
};

client.delete = function (endpoint: string, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "DELETE" });
};
