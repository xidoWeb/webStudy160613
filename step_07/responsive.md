## 반응형웹 기초
 디바이스 크기에 따라 달라지는 화면형태!!
- html

```html
<meta name="viewport">
```

- css

```css
@media screen and (max-width:480px){} 
@media screen and (min-width:481px) and (max-width:640px){}
@media screen and (min-width:641px) and (max-width:768px){}
@media screen and (min-width:769px) and (max-width:1024px){}
@media screen and (min-width:1025px) and (max-width:1280px){}
@media screen and (min-width:1281px){}
```

-> 

```css
@media screen and (max-width:640px){}
@media screen and (min-width:641px) and (max-width:1024px){}
@media screen and (min-width:1025px){}
```
mobile-v ~480px
mobile-h ~640px
tablet-v ~768px
tablet-h ~1024px
pc ~1280px~
pcAll ~1920px~

## css => sass/scss
> sass/scss(이하 sass)는 단순히 브라우저에서 바로 사용할 수 없다!!
compile(css로 변환)해야함!!

1단계: 
	- prepros.io
	-compass-style.org
2단계:
	- cli를 활용!!! 직접 명령어로 사용!!
3단계:
	- gulp
	- grunt
___
sass사용시 설정하는 폴더
	- sass 폴더 
	- css 폴더
___
