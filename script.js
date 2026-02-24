import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import { Trend, Rate } from "k6/metrics";

const users = new SharedArray("users", function () {
    const data = open("./users.csv").trim().split("\n");
    data.shift();
    return data.map(line => {
        const [user, passwd] = line.split(",");
        return { user: user.trim(), passwd: passwd.trim() };
    });
});

const loginDuration = new Trend("login_duration");
const status401 = new Rate("status_401");
const tokenMissing = new Rate("token_missing");

export const options = {
    scenarios: {
        login_20tps: {
            executor: "constant-arrival-rate",
            rate: 20,
            timeUnit: "1s",
            duration: "2m",
            preAllocatedVUs: 50,
            maxVUs: 200
        }
    },
    thresholds: {
        http_req_failed: ["rate<0.03"],
        http_req_duration: ["p(95)<1500"],
        token_missing: ["rate<0.01"]
    }
};

export default function () {

    const u = users[(__VU + __ITER) % users.length];

    const res = http.post(
        "https://fakestoreapi.com/auth/login",
        JSON.stringify({
            username: u.user,
            password: u.passwd
        }),
        {
            headers: { "Content-Type": "application/json" },
            tags: { endpoint: "login" }
        }
    );

    loginDuration.add(res.timings.duration);

    status401.add(res.status === 401);

    let tokenOk = false;
    try {
        tokenOk = !!res.json().token;
    } catch (e) { }

    tokenMissing.add(!tokenOk);

    check(res, {
        "status is 2xx": r => r.status >= 200 && r.status < 300,
        "token exists": () => tokenOk
    });

    sleep(0.2); // simulación usuario humano
}