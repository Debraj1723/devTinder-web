const constants = {
  baseUrl:
    location.hostname === "localhost" ? "http://localhost:9000/" : "/api/",

  menu: [
    { displayName: "Feed", value: "feed" },
    { displayName: "Connections", value: "connections" },
    { displayName: "Groups", value: "groups" },
    { displayName: "Requests", value: "requests" },
    { displayName: "Profile", value: "profile" },
  ],
};

export default constants;
