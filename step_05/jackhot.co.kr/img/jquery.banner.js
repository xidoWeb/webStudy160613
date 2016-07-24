/*!
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */

$(function() {
    var f_nBnrCnt = 0;

    $.f_varBanner = {
        defaults: {
            objScr: null,
            objBtn: null,
            objTimer: null,
            nOrderNo: 999,
            nOrderNoBtn: -1,
            nWidth: 0,
            nHeight: 0,
            nCount: 0,
            isActType: "left",
            isShuffle: "N",
            isBtnAct: "mouseover",
            isBtnType: "img",
            nStartUp: 300,
            nDelay: 5000,
            nSpeed: 500,
            nSpeedFade: 300,
            isStartFade:"Y",
            isStartDelay:"N"
        }
    };

    $.fn.jQBanner = function(defaults){
	    var config = $.extend({}, $.f_varBanner.defaults, defaults);
        var isIEChk = jsBrowserCheck();

        config.objScr = "#"+this.attr("id")+" .clsBannerScreen";
        config.objBtn = "#"+this.attr("id")+" .clsBannerButton";

        if (config.isStartDelay=="Y" && isIEChk==true) {
            if (f_nBnrCnt>=0 && f_nBnrCnt<=3) {
                setTimeout( function(){jsBanInit(config)}, f_nBnrCnt*100);
            } else if (f_nBnrCnt>3 && f_nBnrCnt<=6) {
                setTimeout( function(){jsBanInit(config)}, f_nBnrCnt*200);
            } else if (f_nBnrCnt>6 && f_nBnrCnt<=10) {
                setTimeout( function(){jsBanInit(config)}, f_nBnrCnt*300);
            } else if (f_nBnrCnt>10) {
                setTimeout( function(){jsBanInit(config)}, 400);
            }
            f_nBnrCnt++;
        } else {
            jsBanInit(config);
        }

        return this;
    };
    function jsBanInit(config) {
        var nPosFix;
        $(config.objScr).css({'position':'relative','height':config.nHeight+'px','width':config.nWidth+'px','overflow':'hidden'});
        config.nOrderNo = (config.nOrderNo==999) ? Math.floor(Math.random() * config.nCount):config.nOrderNo-1;
        if (config.isActType == "left") {
            $(config.objScr+" div").each(function(i){
                nPosFix = (config.nOrderNo==i)?0:config.nWidth;
                $(this).css({'position':'absolute','top':'0','left':(-1*nPosFix)+'px'});
                if (!(config.nOrderNo==i && config.isStartFade=="N")) {
                    $(this).fadeIn(config.nStartUp);
                }
                $(this).attr("divno",i);
            });
        } else if (config.isActType == "right") {
            $(config.objScr+" div").each(function(i){
                nPosFix = (config.nOrderNo==i)?0:config.nWidth;
                $(this).css({'position':'absolute','top':'0','left':nPosFix+'px'});
                if (!(config.nOrderNo==i && config.isStartFade=="N")) {
                    $(this).fadeIn(config.nStartUp);
                }
                $(this).attr("divno",i);
            });
        } else if (config.isActType == "up") {
            $(config.objScr+" div").each(function(i){
                nPosFix = (config.nOrderNo==i)?0:config.nHeight;
                $(this).css({'position':'absolute','top':(-1*nPosFix)+'px','left':'0'});
                if (!(config.nOrderNo==i && config.isStartFade=="N")) {
                    $(this).fadeIn(config.nStartUp);
                }
                $(this).attr("divno",i);
            });
        } else if (config.isActType == "down") {
            $(config.objScr+" div").each(function(i){
                nPosFix = (config.nOrderNo==i)?0:config.nHeight;
                $(this).css({'position':'absolute','top':nPosFix+'px','left':'0'});
                if (!(config.nOrderNo==i && config.isStartFade=="N")) {
                    $(this).fadeIn(config.nStartUp);
                }
                $(this).attr("divno",i);
            });
        } else if (config.isActType == "fade") {
            $(config.objScr+" div").each(function(i){
                if (config.nOrderNo==i) {
                    nPosFix = 0;
                    if (!(config.nOrderNo==i && config.isStartFade=="N")) {
                        $(this).fadeIn(config.nStartUp);
                    }
                } else {
                    nPosFix = config.nWidth;
                }
                $(this).css({'position':'absolute','top':'0','left':nPosFix+'px'});
                $(this).attr("divno",i);
            });
        } else if (config.isActType == "page") {
            $(config.objScr+" div").each(function(i){
                nPosFix = (config.nOrderNo==i)?0:config.nHeight;
                $(this).css({'position':'absolute','top':nPosFix+'px','left':'0'});
                if (!(config.nOrderNo==i && config.isStartFade=="N")) {
                    $(this).fadeIn(config.nStartUp);
                }
                $(this).attr("divno",i);
            });
        } else if (config.isActType == "none") {
            $(config.objScr+" div").each(function(i){
                if (config.nOrderNo==i) {
                    nPosFix = 0;
                    if (!(config.nOrderNo==i && config.isStartFade=="N")) {
                        $(this).fadeIn(config.nStartUp);
                    }
                } else {
                    nPosFix = config.nWidth;
                }
                $(this).css({'position':'absolute','top':'0','left':nPosFix+'px'});
                $(this).attr("divno",i);
            });
        }
        $(config.objBtn+" "+config.isBtnType).each(function(i){ $(this).attr("btnno",i); $(this).css("cursor","hand") });
        jsBanBtnBind(config);
        jsScrPauseBind(config);
        if (config.isActType != "none" && config.isActType != "page") {
            config.objTimer = setTimeout( function(){jsBanTimer(config)}, config.nDelay);
        }
    };
    function jsBanTimer(config) {
        config.nOrderNoBtn = -1;

        jsBanAction(config);
        config.objTimer = setTimeout( function(){jsBanTimer(config)}, config.nDelay);
    };
    function jsBanAction(config) {
        var nPageSel;
        var nSpeed = config.nSpeed;
        var nDivNoSel = config.nOrderNo;
        var nOrderNext = (config.nOrderNo+1)%(config.nCount);
        if (config.isActType == "page") {
            var nOrderMinus = config.nOrderNoBtn-config.nOrderNo;
            nPageSel = (nOrderMinus==1 || (nOrderMinus==(config.nCount-1)*-1)) ? 1 : 0;
        }

        if (config.nOrderNoBtn >= 0) {
            config.nOrderNo = config.nOrderNoBtn;
            nOrderNext = config.nOrderNoBtn;
            nSpeed = (config.isActType=="fade" || config.isActType=="page" || config.isActType=="none") ? config.nSpeedFade : 0;
        } else {
            config.nOrderNo = ((config.nCount-1)==config.nOrderNo) ? nOrderNext : config.nOrderNo+1;
        }

        var nDivNoNext = nOrderNext;

        var objSelObj = $(config.objScr+" div[divno='"+nDivNoSel+"']");
        var objNextObj = $(config.objScr+" div[divno='"+nDivNoNext+"']");
        if (config.isActType != "page") {
            jsBanBtnRO(config,nOrderNext);
        }
        if (config.isActType == "left") {
            objNextObj.css('left',(config.nWidth)+'px');
            objSelObj.animate({'left':(-1*config.nWidth)+'px'},nSpeed);
            objNextObj.animate({'left':'0'},nSpeed);
        } else if (config.isActType == "right") {
            objNextObj.css('left',(-1*config.nWidth)+'px');
            objSelObj.animate({'left':config.nWidth+'px'},nSpeed);
            objNextObj.animate({'left':'0'},nSpeed);
        } else if (config.isActType == "up") {
            objNextObj.css('top',config.nHeight+'px');
            objSelObj.animate({'top':(-1*config.nHeight)+'px'},nSpeed);
            objNextObj.animate({'top':'0'},nSpeed);
        } else if (config.isActType == "down") {
            objNextObj.css('top',(-1*config.nHeight)+'px');
            objSelObj.animate({'top':config.nHeight+'px'},nSpeed);
            objNextObj.animate({'top':'0'},nSpeed);
        } else if (config.isActType == "fade") {
            objSelObj.css({'left':config.nWidth+'px','display':'none'});
            objNextObj.css('left','0');
            objNextObj.fadeIn(nSpeed);
        } else if (config.isActType == "page") {
            if (nPageSel == 0) {
                objNextObj.css({'top':'0','left':config.nWidth+'px'});
                objSelObj.animate({'left':(-1*config.nWidth)+'px'},nSpeed);
                objNextObj.animate({'left':'0'},nSpeed);
            } else if (nPageSel == 1) {
                objNextObj.css({'top':'0','left':(-1*config.nWidth)+'px'});
                objSelObj.animate({'left':config.nWidth+'px'},nSpeed);
                objNextObj.animate({'left':'0'},nSpeed);
            }
        } else if (config.isActType == "none") {
            objSelObj.css({'left':config.nWidth+'px','display':'none'});
            objNextObj.css('left','0');
            objNextObj.fadeIn(nSpeed);
        }
    }
    function jsScrPauseBind(config) {
        $(config.objScr).mouseover(function(){
            clearTimeout(config.objTimer);
        });
        $(config.objScr).mouseout(function(){
            if (config.isActType != "none" && config.isActType != "page") {
                config.objTimer = setTimeout( function(){jsBanTimer(config)}, config.nDelay);
            }
        });
    }
    function jsBanBtnBind(config) {
        if (config.isActType != "page") {
            jsBanBtnRO(config,config.nOrderNo);
        }
        if (config.isBtnAct=="mouseover") {
            $(config.objBtn+" "+config.isBtnType).mouseover(function(){
                var nImgNo = $(this).attr("btnno");

                if (config.isActType != "none" && config.isActType != "page") {
                    clearTimeout(config.objTimer);
                }

                if (config.isActType == "page") {
                    if (nImgNo == 0) {
                        config.nOrderNoBtn = ((config.nOrderNo-1)<0) ? config.nCount-1 : config.nOrderNo-1;
                    } if (nImgNo == 1) {
                        config.nOrderNoBtn = ((config.nOrderNo+1)==config.nCount) ? (config.nOrderNo+1)%config.nCount : config.nOrderNo+1;
                    }
                    jsBanBtnRO(config,nImgNo);
                } else {
                    config.nOrderNoBtn = parseInt(nImgNo);
                }

                jsBanAction(config);
            });
            $(config.objBtn+" "+config.isBtnType).mouseout(function(){
                if (config.isActType != "none" && config.isActType != "page") {
                    config.objTimer = setTimeout( function(){jsBanTimer(config)}, config.nDelay);
                }
            });

        } else if (config.isBtnAct=="click") {
            $(config.objBtn+" "+config.isBtnType).click(function(){
                var nImgNo = $(this).attr("btnno");

                if (config.isActType != "none" && config.isActType != "page") {
                    clearTimeout(config.objTimer);
                }

                if (config.isActType == "page") {
                    if (nImgNo == 0) {
                        config.nOrderNoBtn = ((config.nOrderNo-1)<0) ? config.nCount-1 : config.nOrderNo-1;
                    } if (nImgNo == 1) {
                        config.nOrderNoBtn = ((config.nOrderNo+1)==config.nCount) ? (config.nOrderNo+1)%config.nCount : config.nOrderNo+1;
                    }
                    jsBanBtnRO(config,nImgNo);
                } else {
                    config.nOrderNoBtn = parseInt(nImgNo);
                }

                jsBanAction(config);

                if (config.isActType != "none" && config.isActType != "page") {
                    config.objTimer = setTimeout( function(){jsBanTimer(config)}, config.nDelay);
                }
            });
        }
    };
    function jsBanBtnRO (config,nSel) {
        if (config.isBtnType=="img") {
            $(config.objBtn+" img").each(function(i){
                if (nSel==i) {
                    $(this).attr("src",$(this).attr("oversrc"));
                } else {
                    $(this).attr("src",$(this).attr("outsrc"));
                }
            });

        } else if (config.isBtnType=="li") {
            $(config.objBtn+" li").each(function(i){
                if (nSel==i) {
                    $(this).attr("class",$(this).attr("overclass"));
                } else {
                    $(this).attr("class",$(this).attr("outclass"));
                }
            });

        }
    }

    function jsBrowserCheck() {
        appname = navigator.appName;
        useragent = navigator.userAgent;

        if(appname == "Microsoft Internet Explorer") appname = "IE";
        IE55 = (useragent.indexOf('MSIE 5.5')>0);  //5.5 버전
        IE6 = (useragent.indexOf('MSIE 6')>0);     //6.0 버전
        IE7 = (useragent.indexOf('MSIE 7')>0);     //7.0 버전
        IE8 = (useragent.indexOf('MSIE 8')>0);     //8.0 버전

        if(appname=="IE" && IE55 || IE6 || IE7 || IE8){
            return true
        }else{
            return false;
        }
    }
});
