# Jitsi API Server
## Desciption
- 해당 서버는 Jitsi meet 회의 프로젝트를 위한 API 서버 입니다.
- 데이터 베이스는 임시로 메모리를 사용하여 구현합니다.

## Requirements
- node: v20.11
- yarn: v1.22

## Api 서버 실행

- 패키지 설치
```shell
yarn
```

- build
```shell
yarn build
```

- Run Server
```shell
node ./dist/src/main.js
```

- Enter Swagger
    - http://localhost/api-docs


## 파일 구조
```shell
src
├─app.module.ts     # app 모듈
├─main.ts           # 서버 진입 점
├─dto               # dto 관련 객체 모음 디렉토리
├─participants      # participants 모듈
├─rooms             # room 모듈
└─utils             # util 관련 함수
```