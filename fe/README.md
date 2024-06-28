# Jitsi Frontend

## Requirements
- Node: v20.11
- npm: 10.2.4

## How to start

- make .env file
    - REACT_APP_API_URL: API server url
    - REACT_APP_JVB_URL: Jitsi server url
    - REACT_APP_MAX_PARTICIPANTS: 최대 접속자 수
    - ex)
        ```env
        REACT_APP_API_URL=http://localhost/api
        REACT_APP_JVB_URL=meet.example.com
        REACT_APP_MAX_PARTICIPANTS=9
        ```

- install package
    ```shell
    npm install
    ```

- start server in local
    ```shell
    npm start
    ```

- build
    ```shell
    npm build
    ```

- serve
    ```shell
    npm install -g serve
    serve -s build
    ```

## FE 파일 구조
``` shell
src
+---App.jsx                     # Jitsi FE app
+---Error.module.css            # MaxParticipantContainer의 css
+---index.js                    # FE 진입점
+---JitsiContainer.jsx          # Jitsi container
+---MaxParticipantContainer.jsx # 최대 참석자 container
```