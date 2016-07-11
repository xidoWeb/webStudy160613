# CSS 기본이해하기
> css란 html문서의 구조형태를 디자인으로 변화시키는것(꾸며주는것)

1. **선택자**
  - type 선택자 : `p{}`, `div{}`
  - id 선택자 : `#box{}`, `#test`
  - class 선택자 : `.box{}`, `.test{}`
  - 자손 선택자 : `div p{}`, `.container ul a{}`
  - 자식 선택자 : `div>ul>li{}`, `.container>ul>li>a{}`
  - 속성 선택자 : `a[href="#"]{}`, `a[taget="_blank"]{}` , `a[herf^="http"]{}`
2. **공간의 이해**
  - margin : 자신의 주변의 공간을 주는것
  - padding : 자신이 커지는것(커지는 크기에는 어떠한 요소를 담을 수 없다.)
  - border: 외곽선을 주는것(부피o, 크기o)
  - outline : 외곽선을 주는것(크기만 존재, 부분을 바꿀 수 없다.- 접근성 사용시 포커스처리될때 사용)  
3. **RGBA, webRGB, HSLA**
  - RGB: red, green, blue 컬러를 이용한 빛의 3원색(3색이 모두 모이면, 흰색)
    + rgb: 0~255(256단계) 0은 색이 없다, 255는 색이 꽉찼다.
    + rgba: red, green, blud, alpha(투명도 0 ~ 1)
    + rgba(red, green, blud, alpha)
  - webRGB: #으로 시작해서 총 6자리의 숫자로 표기(압축시에는 3자리로 표현 가능)
    + 숫자: 0~9, a~f f=16
    + 기본 2자리씩 끊어서 사용: #ff(red)ff(green)ff(blue)
    + f(16)f(16) = ff(256)
    + #000(#000000), #00ff44(#0f4), #fff677(3자리 변경 불가)
    + #000(검정), #fff(흰색), #aaa(회색), #777(회색), #555(회색)
    + 빨간색, 붉으스름한색, 벌건색, 밝가므리한색
    + #faa(밝은 빨강), #afc(녹색이 들어있는 밝은색 계통)
  - HSLA: hue(색상), saturation(채도), light(명도), alpha(투명도)
    + 먼셀 색입체
    + hue(360deg)를 표현: 360 = 0
    + saturation(0~100%): 0%(무채색), 100%(유채색, 순색)
    + light(0~100%): 0(검정), 100%(흰색)
    + hsla(hue, saturation, light, alpha) => hsla(30, 50%, 50%, 1)
    + 색상 읽는 순서: a-l-s-h 순으로 읽는다
4. **float기능 이해**
  - float:left | right;
  - clear










  