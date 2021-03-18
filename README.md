## Liner 사전 과제

### DB모델링

![db모델링](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fef8810ee-6d5b-4c11-a069-87f7b6a288a6%2F__DB.png?table=block&id=a2690738-b470-4555-b703-73fa9222090d&width=3490&userId=00bcb7e1-ceee-442b-927c-0f939fb6f8c0&cache=v2)

DB모델링은 유저의 정보를 저장는 User테이블과 user가 선택한 테마의 정보를 담기 위한 Theme테이블 그리고 Theme별로 color를 저장하기 위해 Color테이블, page의 정보를 담기위한 Page테이블과, 유저가 page에 하이라이팅한 정보를 담기위한 Highlight테이블 총 5개의 테이블을 만들었습니다.

한명의 유저는 여러 page에 하이라이트할 수 있기 때문에 User테이블과 Page테이블은 ```1 : N```관계로 설정을 했습니다. 그리고 page안에는 여러 개의 하이라이트가 존재하기 떄문에 Page테이블과 Highlight테이블의 관계를 ```1 : N```관계로 설정하여 pageId를 통해 해당 페이지에 존재하는 하이라이트 정보를 가져올 수 있도록 설계했습니다.
User는 하나의 테마를 설정하고 theme에 해당하는 color를 사용할 수 있기 때문에 User테이블과 Theme테이블은 ```1 : 1```관게를 설정하여 user에게 themeId를 통해 사용할 수 있는 color를 보여줄 수 있도록 했습니다. 그리고 Color테이블을 만들어 themeId를 통해 theme별로 colorHex를 관리할 수 있도록 설계했습니다.

### API 문서

#### 1. 유저 회원가입
  - Method: POST
  - URL: auth/sighup
  - Request:
    - Body Parameters
      ```
      {
        "email": "liner@getliner.com",
        "password": "liner",
        "nick": "liner"
      }
      ```
  - Response:
    - 201:  Created
      ```
      {
        "message": "Success SignUp"
      }
      ```
    - 400: Bad Request
      ```
      {
        "message": "이미 가입된 회원입니다."
        or
        "message": "필수 값을 입력해주세요."
      }
      ```
#### 2. 유저 로그인
  - Method: POST
  - URL: auth/signin
  - Request:
    - Body Parameters
      ```
      {
        "email": "liner@getliner.com",
        "password": "liner"
      }
      ```
  - Response:
    - 200: OK
      ```
      {
        "message": "로그인에 성공했습니다.",
      }
      ```
    - 400: Bad Request
      ```
      {
        "message": "비밀번호가 일치하지 않습니다." 
        or
        "message": "가입되지 않은 회원입니다."
      }
      ```
#### 3. 유저 정보 가져오기
  - Method: GET
  - URL: auth/userinfo
  - Request:
    - Headers
      ```
      {
        "Cookie": accessToken=jwtToken
      }
      ```
  - Response:
    - 200: OK
      ```
      {
        "userId": 12312,
        "email": "liner@getliner.com",
        "nick": "liner"
      }
      ```
    - 401: Unauthorized
      ```
      The token does not exist
      ```
#### 4. 하이라이트 저장
  - Method: POST
  - URL: highlight/create
  - Request:
    - Headers
      ```
       {
        "Cookie": accessToken=jwtToken
       }
      ```
    - Body Request
      ```
       {
        "pageUrl": "www.getliner.com",
        "colorHex": "#fffff8",
        "text": "라이너 사전과제 입니다."
       }
      ```
  - Response:
    - 200: OK
      ```
      {
        "highlightId": 123,  
        "userId": 12312,
        "pageId": 123,
        "colorHex": "#fffff8",
        "text": "라이너 사전과제 입니다."
      }
      ```
    - 401: Unauthorized
      ```
      The token does not exist
      ```
#### 5. 하이라이트 수정
  - Method: PATCH
  - URL: highlight/update
  - Request:
    - Headers
      ```
      {
        "Cookie": accessToken=jwtToken
      }
      ```
    - Body Parameters
      ```
      {
        "highlightId": 123,
        "colorHex": "#fffff8",
        "text": "변경된 텍스트입니다."
      }
      ```
  - Response:
    - 200: OK
      ```
      {
        "highlightId": 123,  
        "userId": 12312,
        "pageId": 123,
        "colorHex": "#fffff8",
        "text": "변경된 텍스트입니다"  
      }
      ```
    - 401: Unauthorized
      ```
      {
        The token does not exist
      }
      ```
#### 6. 페이지 내 하이라이트 정보가져오기
  - Method: POST
  - URL: highlight/gethighlight
  - Request:
    - Headers
      ```
      {
        "Cookie": accessToken=jwtToken
      }
      ```
    - Body Parameters
      ```
      {
        "pageUrl": "www.getlier.com"
      }
      ```
  - Response:
    - 200: OK
      ```
      [ 
        {
          "highlightId": 123,  
          "userId": 12312,
          "pageId": 123,
          "colorHex": "#fffff8",
          "text": "라이너 사전과제 입니다." 
        },
        ...
      ]
      ```
    - 401: Unauthorized
      ```
      The token does not exist
      ```
#### 7. 유저가 하이라이트한 정보와 체이지 가져오기
  - Method: GET
  - URL: highlight/highlightinfo
  - Request:
    - Headers
      ```
      {
        "Cookie": accessToken=jwtToken
      }
      ```
  - Response:
    - 200: OK
      ```
        [
          {
            "pageId": 123,
            "pageUrl": "www.getliner.com"
            "highlights": [
              {
                "highlightId": 123,  
                "userId": 12312,
                "pageId": 123,
                "colorHex": "#fffff8",
                "text": "라이너 사전과제 입니다."
              },
              ...
            ]
          },
          ...
        ]
      ```
    - 401: Unauthorized
      ```
      The token does not exist
      ```
#### 8. 하이라이트 삭제
  - Method: DELETE
  - URL: highlight/deletehilight
  - Request:
    - Headers
      ```
      {
        "Cookie": accessToken=jwtToken
      }
      ```
    - Body Parameters
      ```
      {
        "highlightId": 12312
      }
      ```
  - Response:
    - 200: OK
    - 401: Unauthorized
      ```
      The token does not exist
      ```
#### 9. 유저의 하이라이트 테마 변경
  - Method: PATCH
  - URL: theme/updatetheme
  - Request:
    - Headers
      ```
      {
        "Cookie": accessToken=jwtToken
      }
      ```
    - Body Parameter
      ```
      {
        "themeId": 2
      }
      ```
  - Response:
    - 200: OK
    - 401: Unauthorized
      ```
      The token does not exist
      ```
