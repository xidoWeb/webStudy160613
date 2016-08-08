# webStudy160613
===
	안녕하세요 이도형입니다.  
	***web standard && web accessibility***   
	수업내용을 진행하려합니다.
	다소 어렵고 힘들더라도 꾸준한 연습과 복습으로 웹을 주름잡아 보세요~
	
## Web Standard
	웹의 측면을 서술하고, 정의하는 공식표준
	웹을 다룬다면 html, css, javascript를 다루는 것을 의미
	
**웹 구성**  
1.	html  
	- 구조를 만들어내는 형태  
	- 현재  html5
	- 16년 6월 21일 웹표준 후보로 등록  
	  (웹표준으로 정식 승인 되기 전)  
2. css  
	- html로 만들어진 형태를 꾸며주거나 디자인하는 형태  
	- 현재 css3  
	- 다양한 효과/ animation등 여러가지 기능이 추가(지속적인 발전중)  
3. javascript  
	- html/css를 제어하는 형태
	- 현재 ECMASCRIPT2015(ES6) 까지 나와있음
	- 움직임, Ajax 등의 다양한 기능을 가짐
	
	
## Web Accessibility
	모든 사람이 웹 사이트를 자유롭게 이용할 권리  
	
### 접근성 4원칙
[출처](http://m.blog.naver.com/staylong78/206595196)  
[다음자료](http://darum.daum.net/accessibility/pc)  
[Web Seoul Lab](http://www.websoul.co.kr/accessibility/WA_guide21.asp)  

**원칙_1** : `인식의 용이성(Perceivable)` : 모든 컨텐츠는 사용자가 인식할 수 있어야 한다.
 
	ex) img - alt값  /  동영상 등 - 자막 제공  /  명료성 - 버튼 alt 등
	 
**검사**  
1. alt  
2. 자막  
3. Color(색맹 대비)   
4. 버튼값 명확히  
5. 텍스트 컨텐츠 명도대비 4.5 대 1 이상  
6. 배경음 사용 금지  
 
___
**원칙_2** : `운용의 용이성(Operable)` : 사용자 인터페이스 구성요소는 조작 가능하고 내비게이션할 수 있어야 한다.
 
	ex) 키보드 접근성  /  충분한 시간 제공  /  광과민성 발작 예방  /  쉬운 내비게이션
 
**검사**
1. 키보드 사용 보장  
2. 초점 이동 : 키보드에 의한 초점은 논리적으로 이동해야 하며 시각적으로 구분 가능(점선, 테두리 등)해야 한다.  
3. 응답 시간 조절 : 시간 제한 컨텐츠는 응답시간을 조절할 수 있어야 함.  
4. 정지기능 제공 : 자동으로 변경되는 컨텐츠는 움직임을 제어할 수 있어야 함.  
5. 깜빡임과 번쩍임 사용 제한  
6. 반복영역 건너띄기  
7. 제목 제공 : 페이지, 프레임 등에 적절한 제목 제공  
8. 적절한 링크 텍스트 : 링크 텍스트는 용도나 목적을 이해할 수 있게 제공  

___ 
**원칙_3** : `이해의 용이성(Understandable)` : 컨텐츠는 이해할 수 있어야 한다. 
 
	ex) 가독성  /  예측 가능성  /  컨텐츠의 논리성  /  입력 도움(입력 오류를 방지하거나 정정할 수 있어야 함)
 
**검사**  
1. 기본 언어 표시  
2. 사용자 요구에 따른 실행 : 새창, 초점 변화 등  
3. 컨텐츠의 선형화 : 논리적인 순서로 제공  
4. 표는 이해하기 쉽게  
5. 레이블 제공 : 입력란에 대응하는 레이블  
6. 오류 정정  
 
> 레이블 : 온라인 서식에서 사용자가 입력하는 컨트롤의 근처에 어떤 데이터를 어떻게 입력해야 하는지를 알려주는 레이블을 컨트롤과 대응하여 제공해야 한다. 레이블을 서식컨트롤과 프로그램이 인식할 수 있도록 대응시키지 않고 단순히 텍스트로만 제공할 경우 보조기기를 통해서 해당 컨트롤의 레이블을 인식할 수 없다.

___ 
**원칙_4** : `견고성(Robust)` : 웹 컨텐츠는 미래의 기술로도 접근할 수 있도록 견고하게 만들어야 한다.
 
	ex) 마크업 언어의 문법 준수  /  접근성(웹 어플리케이션)
 
**검사**  
1. 마크업 오류 방지 : 열고 닫음, 중첩관계 및 속성 선언  
2. 웹 어플리케이션 접근성 준수  
___

### 브라우저 설치
- [IE](https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads)
- [chrome](www.google.com/chrome)
- [firefox](www.mozilla.com)
- [opera](www.opera.com)
___

### 프로그램 설치
- <http://witstudio.net> : 포토샵 이미지저장 프로그램
- <https://git-scm.com> : 깃
- <https://cyberduck.io> : ftp프로그램
- <https://nodejs.org/ko> : node.js
- <http://brackets.io> : 에디트프로그램
	- emmet
	- markdown toolbar
	- markdown preview	
	- custom work
	- hide work file
- <https://www.sublimetext.com> - ( 차후 사용할 에디트프로그램 )

### CLI(Command Line) 이해하기
[참고자료](http://tutorial.djangogirls.org/ko/intro_to_command_line/)  
`mac`: terminal 실행    
`window`: gitbash 실행(mac과 가장 유사한 기능을 실행하기 위함)  

- **폴더이동:** cd .. | cd ~ | cd /
- **목록보기:** ls
- **폴더생성:** mkdir *폴더명*
- **파일생성:** touch *파일명*
- **파일/폴더삭제:** rm -rf *파일/폴더명*

