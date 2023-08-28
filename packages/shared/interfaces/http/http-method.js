export var HttpMethod;
(function (HttpMethod) {
    HttpMethod["get"] = "GET";
    HttpMethod["head"] = "HEAD";
    HttpMethod["options"] = "OPTIONS";
    HttpMethod["post"] = "POST";
    HttpMethod["put"] = "PUT";
    HttpMethod["delete"] = "DELETE";
    HttpMethod["patch"] = "PATCH";
})(HttpMethod || (HttpMethod = {}));
