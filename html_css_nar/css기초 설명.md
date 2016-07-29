# css 기초 개념 간단한 설명 및 정리 
display: inline | block | inline-block | none(읽어주지 않는다.)
visility: hidden | visible

width
min-width
max-width
height
min-height
max-height
단위:  mm, cm, inch-일반형태의 단위는 안쓴다.,  
```css
@media print{
	body{width:210mm;}	

}
```

사용하는 단위: 16px, 12pt, 100%, 1em, 1rem, ex, vw, vh, vmax, vmin
background-image:url(), url(), url();
background-repeat:repeat, no-repeat, repeat-x;
background-position:left top, center center;
background-color:#fac, rgba(), hsla();
background-attatchment:scroll fixed;
background-size:100%, cover, contain;

float:left | right; 
clear:both;  div:after{content:""; display:block; clear:both;}

margin
outline
padding
border
box-sizing:border-box;

position: static | fixed | relative | absolute ;

box-shadow     //그림자
text-shadow    // 글씨 그림자
transition     // 움직임
transform      //형태변형
filter         // 효과(일부 지원안함)
border-radius  // 외곽 곡선
animation      // 애니메이션(frameset값 같이사용해야함)



`*` 전체선택자
html, body, h1,h2, h3,h4,h5,h6,p,div,form, table{margin:0; padding:0;}
html div{}
html > body{}
#baca{}
div .box{}
a[title="#"]{}      // a속성중 title="#" 인것
a[title|="abc"]     // 속성이 abc이거나 abc로 시작되는 속성
a[title!="abc"]     // abc가 아닌 속성
a[title^="http"]{}  // http로 시작되는 속성
a[title$="com"]{}   // com으로 끝나는 속성
a[title*="test"]{}  // test 글자가 포함된 속성
a[title~="test"]{}  // test 단어가 포함된 속성

`*`:linked{}  // 처음쓰거나, 안쓰거나둘중 하나만 해야함(기본)
`*`:hover{}   // js 에서는 hover기능은 전후를 모두 써야한다.
`*`:active{}  // 마우스 누르고있는상태
`*`:visited{} // 해당하는 곳을 다녀온상태

`*`:focus{}
`*`::before{}
`*`::after{}
`*`:first-child{}
`*`:last-child{}

_------------------------------

li:nth-child(3){}
li:nth-last-child(2){}
li:nth-child(3n){}
li:nth-child(3n+1){}
li:nth-child(3n-1){}
p:nth-of-type(3){}

```html
<div>
	<p></p>
	<h2></h2>
	<p></p>
</div>
<p></p>
<a href=""></a>
```

## Responsive Web
반응형웹(브라우저/기기의 크기값에 따라 변하는 형태)

### css
```css
@media screen and (max-width:480px){}
@media screen and (min-width:481px) and (max-width:640px){}
@media screen and (min-width:641px) and (max-width:768px){}
@media screen and (min-width:769px) and (max-width:1024px){}
@media screen and (min-width:1025px) and (max-width:1200px){}
@media screen and (min-width:1201px) {}
```
### javascript(jQuery)
```javascript(jQuery)
// 브라우저 크기별 변수선언
var view_browser = $(window).width();
var view = window.innerWidth();
var view_01 = 480;
var view_02 = 640;
var view_03 = 768;
var view_04 = 1024;
var view_05 = 1200;


// 크기값을 확인
if (view_browser <= view_01){
}else if(view_browser > view_01  && view_browser <= view_02){
}else if(view_browser > view_02  && view_browser <= view_03){
}else if(view_browser > view_03  && view_browser <= view_04){
}else if(view_browser > view_04  && view_browser <= view_05){
}else{
}

```