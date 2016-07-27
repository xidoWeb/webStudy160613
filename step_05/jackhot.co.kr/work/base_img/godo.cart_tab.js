var nsGodo_cartTab = function() {

	function $(id) {
		return document.getElementById(id);
	}

	function setContents(data,mode) {

		switch (mode) {
			case 'list' :
				nsGodo_cartTab.list(data);
				break;
			default :
				data = data.shift();

				$("el-godo-cart-tab-menu-1").innerHTML = data.today;
				$("el-godo-cart-tab-menu-2").innerHTML = data.wishlist;
				$("el-godo-cart-tab-menu-3").innerHTML = data.cart;
				break;
		}

	}

	function getContents(url, param, mode) {

		try
		{
			var ajax = new XMLHttpRequest();
		}
		catch (e)
		{
			var ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if (param == undefined) param = '';

		ajax.onreadystatechange = function() {

			if(ajax.readyState==4) {	// complete
				if(ajax.status==200){
					$('el-godo-cart-tab-loader').style.display = 'none';
					$('el-godo-cart-tab-content').style.display = 'block';

					var json = eval(ajax.responseText);
					setContents(json,mode);
				}
			}
			else {
				if ( $('el-godo-cart-tab-loader').style.display != 'block' ) {
					$('el-godo-cart-tab-loader').style.display = 'block';
					$('el-godo-cart-tab-content').style.display = 'none';
				}
			}
		}

		ajax.open("POST", url, true);

		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		if( navigator.appName.indexOf("Microsoft") > -1 ){ //ie
			ajax.setRequestHeader("Content-length", param.length);
			ajax.setRequestHeader("Connection", "close");
		}


		ajax.send(param);
	}

	return {
		cfg : {},
		objects : {},
		status: null,
		data : null,
		active : null,
		// 초기화
		prevent : function() {

			if (parent != self)
			{
				if (parent.window.location.pathname == '/') return false;
				if (parent.window.location.pathname == '/index.php') return false;
				return true;
			}

			return false;
		},
		timer : null,
		init : function(opt) {

			if (this.prevent() == true ) {
				return false;
			}

			try
			{
				this.cfg = {
					'logged':  opt.logged || false,
					'path' : '../data/skin/' + opt.skin + '/cart_tab',
					'width' : opt.width || 900,
					'width' : opt.width || 900,
					'tpl' : opt.tpl || '01',	// 01~06
					'dir' : opt.dir	|| 'horizon' // vertical or horizon
				};
			}
			catch (e) {
				return;
			}

			// 카트탭 출력
			if ( this.draw() === true)
			{
				this.cfg.list_width = this.cfg.width - 161; // 총 넓이 - (우측 버튼 넓이 + 1 + 테두리 두께)

				// 쿠키를 읽어 상태 세팅
				if (getCookie('_godo_cart_tab_status') == 'o') {
					this.open();
				}
				else {
					this.close();
				}

				if (getCookie('_godo_cart_tab_current')) {
					this.change( getCookie('_godo_cart_tab_current') );
				}
				else {
					this.change( 'today' );
				}

			}
			else {
				// 오류.

			}
		},
		draw : function() {

			if ($('el-godo-cart-tab')) return false;


			var _layout = '';

			_layout += '<div class="wrap" id="el-godo-cart-tab-body" style="width:'+this.cfg.width+'px;">';
			_layout += '	<div class="head">';
			_layout += '		<table border="0" cellpadding="0" cellspacing="0">';
			_layout += '		<tr>';
			_layout += '			<td style="width:5px;background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/top_left.gif) no-repeat top left;"></td>';
			_layout += '			<td style="background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/top_center.gif) repeat-x top left;position:relative;">';
			_layout += '				<div class="menu a" id="el-godo-cart-tab-menu" style="background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/teb_a.gif) no-repeat bottom left;">';
			_layout += '					<ul>';
			_layout += '						<li class="tab1" id="el-godo-cart-tab-menu-1" onClick="nsGodo_cartTab.change(\'today\');"></li>';
			_layout += '						<li class="tab2" id="el-godo-cart-tab-menu-2" onClick="nsGodo_cartTab.change(\'wishlist\');"></li>';
			_layout += '						<li class="tab3" id="el-godo-cart-tab-menu-3" onClick="nsGodo_cartTab.change(\'cart\');"></li>';
			_layout += '					</ul>';
			_layout += '				</div>';
			_layout += '				<div class="toggler"><img id="el-godo-cart-tab-toggler" src="' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_down.gif"></div>';
			_layout += '			</td>';
			_layout += '			<td style="width:5px;background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/top_right.gif) no-repeat top left;"></td>';
			_layout += '		</tr>';
			_layout += '		</table>';
			_layout += '	</div>';
			_layout += '	<div class="body">';
			_layout += '		<table border="0" cellpadding="0" cellspacing="0">';
			_layout += '		<tr>';
			_layout += '			<td style="width:5px;background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/center_left.gif) repeat-y top left;"></td>';
			_layout += '			<td style="background:#ffffff;">';

			_layout += '			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0"><tr><td>';
			_layout += '				<div class="loader" id="el-godo-cart-tab-loader"><img src="'+this.cfg.path+'/tpl/common/loader.gif"></div>';

			_layout += '				<div class="contents" id="el-godo-cart-tab-content" style="width:'+this.cfg.list_width+'px"><!--{BODY}--></div>';
			_layout += '			</td>';
			_layout += '			<td width="1"><img src="'+this.cfg.path+'/tpl/common/line.jpg"></td>';
			_layout += '			<td width="150" align="center" valign="top" style="padding-top:27px;vertical-align:top;width:150px;">';
			_layout += '			<div id="el-cart-tab-list-action-button">';
			//-- 우측 버튼 set (오늘본 상품)
			_layout += '			<div class="a">';
			_layout += '				<div style="margin-bottom:5px;"><a href="javascript:void(0);" onClick="nsGodo_cartTab.action(\'truncate\');return false;"><img src=" '+ this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_delete.gif"></a></div>';
			_layout += '				<div><a href="javascript:void(0);" onClick="nsGodo_cartTab.action(\'view\');return false;"><img src=" '+ this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_todayview.gif"></a></div>';
			_layout += '			</div>';

			//-- 우측 버튼 set (상품 보관함)
			_layout += '			<div class="b">';
			_layout += '				<div style="margin-bottom:5px;"><a href="javascript:void(0);" onClick="nsGodo_cartTab.action(\'truncate\');return false;"><img src=" '+ this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_delete.gif"></a></div>';
			_layout += '				<div><a href="javascript:void(0);" onClick="nsGodo_cartTab.action(\'view\');return false;"><img src=" '+ this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_wishlist.gif"></a></div>';
			_layout += '			</div>';

			//-- 우측 버튼 set (장바구니)
			_layout += '			<div class="c">';
			_layout += '				<div style="margin-bottom:5px;"><a href="javascript:void(0);" onClick="nsGodo_cartTab.action(\'truncate\');return false;"><img src=" '+ this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_delete.gif"></a></div>';
			_layout += '				<div><a href="javascript:void(0);" onClick="nsGodo_cartTab.action(\'view\');return false;"><img src=" '+ this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_cartview.gif"></a></div>';

			_layout += '				<div style="width:111px;text-align:left;font-size:11px;margin:20px 0 20px 0">';
			_layout += '					<img src=" '+ this.cfg.path + '/tpl/common/bullet.gif" align="absmiddle"> 총 수량 : <span id="el-cart-tab-total-ea">0</span> <br>';
			_layout += '					<img src=" '+ this.cfg.path + '/tpl/common/bullet.gif" align="absmiddle"> 총 금액 : <span id="el-cart-tab-total-price">0</span>';
			_layout += '				</div>';

			_layout += '				<div><a href="javascript:void(0);" onClick="nsGodo_cartTab.action(\'buy\');return false;"><img src=" '+ this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_buy.gif"></a></div>';
			_layout += '			</div>';
			_layout += '			</div>';
			_layout += '			</td></tr></table>';

			_layout += '			</td>';
			_layout += '			<td style="width:5px;background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/center_right.gif) repeat-y top left;"></td>';
			_layout += '		</tr>';
			_layout += '		</table>';
			_layout += '	</div>';
			_layout += '	<div class="foot">';
			_layout += '		<table border="0" cellpadding="0" cellspacing="0">';
			_layout += '		<tr>';
			_layout += '			<td style="width:5px;background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/bottom_left.gif) no-repeat top left;"></td>';
			_layout += '			<td style="background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/bottom_center.gif) repeat-x top left;"><img class="blank"></td>';
			_layout += '			<td style="width:5px;background:url(' + this.cfg.path + '/tpl/' + this.cfg.tpl + '/bottom_right.gif) no-repeat top left;"></td>';
			_layout += '		</tr>';
			_layout += '		</table>';
			_layout += '	</div>';
			_layout += '</div>';


			this.objects.tab = document.createElement("div");
			this.objects.tab.id = 'el-godo-cart-tab';
			this.objects.tab.innerHTML = _layout;
			this.objects.tab.className = 'tpl' + this.cfg.tpl;
			this.objects.tab.style.position = "fixed";
			this.objects.tab.style.bottom = "0";
			this.objects.tab.style.left = "50%";
			this.objects.tab.style.width = this.cfg.width + "px";
			this.objects.tab.style.marginLeft = "-" + (this.cfg.width / 2) + "px";
			document.body.appendChild(this.objects.tab);

			this.objects.body = $('el-godo-cart-tab-body');
			this.objects.toggler = $('el-godo-cart-tab-toggler');

			// 열고 닫기 이벤트
			if (document.addEventListener) {
				this.objects.toggler.addEventListener('click', function(){
				nsGodo_cartTab.toggle();
				}, false);
			}
			else {
				this.objects.toggler.attachEvent('onclick', function(){
					nsGodo_cartTab.toggle();
				});
			}

			// 내용 가져 와서 출력
			getContents('../proc/indb.cart.tab.php');

			return true;

		},
		action : function(type,idx) {

			if (this.active == null) return;

			var returnUrl = encodeURIComponent(window.location.href);
			var param = '?action=ok&tab='+this.active+'&type='+type+'&returnUrl='+returnUrl;
			if (idx != undefined) param += '&idx='+idx;

			window.location.href = '../proc/indb.cart.tab.php'+ param;
		},
		list : function(data, page) {

			if (data === '') data = {};
			else if (data === true) data = this.data;
			else this.data = data;

			var row, data_size = data ? data.length : 0;

			if (page == undefined) page = 1;
			else page = parseInt(page);

			var cols = Math.floor((this.cfg.list_width - 70) / 110);	// 넓이에 따라 자동 계산

			var s_i	= cols * (page - 1);
			var e_i = s_i + cols;
			var max_page = Math.ceil(data_size / cols);

			var _layout = '';
			_layout += '<ul class="goodslist" style="width:'+ (cols * 110 + 70) +'px">'; //  style="width:'+this.cfg.list_width+'px"
			_layout += '<li class="nav"><a href="javascript:void(0);" onClick="nsGodo_cartTab.list(true,'+ ((page - 1) > 0 ? page - 1 : page) +');"><img src="'+ this.cfg.path+'/tpl/common/btn_prev.gif"></a></li>';
			_layout += '<li>';

			_layout += '	<ol style="width:'+ cols * 110+'px">';
			var tot_ea = 0, tot_price = 0;
			var g_price,g_opt;

			if (data_size > 0)
			{
				for (var i=0;i<data_size ;i++) {

					if (data[i] == undefined) continue;
					row = data[i];

					// 상품 단가
					g_price = parseInt(row.price) + (parseInt(row.addprice) || 0);

					if (i >= s_i && i < e_i)
					{
						_layout += '<li>';
						_layout += '<div class="goodsimg" style="background:url('+ ( /^http(s)?:\/\//.test(row.img) ? row.img  : '../data/goods/'+ row.img ) +') no-repeat center center;position:relative;">';
						_layout += '<div class="del"><a href="javascript:void(0);" onClick="nsGodo_cartTab.action(\'delete\',\''+i+'\');return false;"><img src="'+this.cfg.path+'/tpl/common/btn_x.gif"></a></div>';
						_layout += '</div>';
						_layout += '<div style="overflow:hidden;height:30px;line-height:15px;"><a href="../goods/goods_view.php?goodsno='+row.goodsno+'">'+row.goodsnm+'</a></div>';

						g_opt = '';

						if (row.opt1) {
							g_opt = row.opt1;
						}
						if (row.opt2) {
							g_opt += (g_opt != '') ? ' / ' : '';
							g_opt += row.opt2;
						}

						if (g_opt != '') {
							_layout += '<div><a href="../goods/goods_view.php?goodsno='+row.goodsno+'">'+g_opt+'</a></div>';
						}

						_layout += '<div><span class="bold">'+comma(g_price)+'</span>원</div>';

						if (this.active == 'cart') {
							_layout += '<div style="width:46px;">';
							_layout += '<div style="float:left;"><input type=text name=_multi_ea[] id="el-cart-tab-ea-'+i+'" size=2 value='+ row.ea +' style="border:1px solid #D3D3D3;width:30px;text-align:right;height:20px" onChange="nsGodo_cartTab.cart_ea(\'set\',\''+i+'\');"></div>';
							_layout += '<div style="float:left;padding-left:3">';
							_layout += '<div style="padding:1 0 2 0"><img src="'+this.cfg.path+'/tpl/common/btn_ea_up.gif" onClick="nsGodo_cartTab.cart_ea(\'up\',\''+i+'\');" style="cursor:pointer"></div>';
							_layout += '<div><img src="'+this.cfg.path+'/tpl/common/btn_ea_down.gif" onClick="nsGodo_cartTab.cart_ea(\'down\',\''+i+'\');" style="cursor:pointer"></div>';
							_layout += '</div>';
							_layout += '</div>';
						}
						else {
							_layout += '<div><a href="javascript:void(0);" onClick="nsGodo_cartTab.cart(\''+row.goodsno+'\')"><img src="'+this.cfg.path+'/tpl/common/cart.gif"></a></div>';
						}

						_layout += '</li>';
					}

					// 총 수량, 금액 for 장바구니
					if (this.active == 'cart')
					{
						tot_ea += parseInt(row.ea);
						tot_price += parseInt(g_price * row.ea);
					}
				}
			}
			_layout += '	</ol>';
			_layout += '</li>';

			_layout += '<li class="nav"><a href="javascript:void(0);" onClick="nsGodo_cartTab.list(true,'+ ((page + 1) <= max_page ? page + 1 : page) +');"><img src="'+ this.cfg.path+'/tpl/common/btn_next.gif"></a></li>';
			_layout += '</ul>';

			$('el-godo-cart-tab-content').innerHTML = _layout;
			jQuery($('el-godo-cart-tab-content')).find(".goodsimg").css("backgroundSize", "cover");

			if (this.active == 'cart') {
				$('el-cart-tab-total-ea').innerHTML = comma(tot_ea) + ' 개';
				$('el-cart-tab-total-price').innerHTML = comma(tot_price) + ' 원';
			}

		},
		cart_ea : function(dir, key) {	// up, down, set

			var self = this;

			var el = $('el-cart-tab-ea-'+key);

			if (dir == 'up') {
				el.value = parseInt(el.value) + 1;
			}
			else if (dir == 'down'){
				el.value = parseInt(el.value) - 1;
			}
			else {
				el.value = parseInt(el.value);
			}

			if (el.value < 1)
			{
				el.value = 1;
			}

			// 수량 즉각적으로 반응을 하지 아니함.
			if (this.timer != null) clearTimeout(this.timer);

			this.timer = setTimeout(function(){

				try
				{
					var ajax = new XMLHttpRequest();
				}
				catch (e)
				{
					var ajax = new ActiveXObject("Microsoft.XMLHTTP");
				}

				var rn = 1301;
				var param = 'action=ok&type=cart_ea&idx='+key+'&ea='+el.value+'&rn='+rn;

				ajax.onreadystatechange = function() {

					if(ajax.readyState==4) {	// complete
						if(ajax.status==200){
							var resCode = '';
							if (rn >= 1301 && ajax.responseText.substr(2,3) == 'xml' && typeof(createXMLFromString) != 'undefined') {
								var xml = createXMLFromString(ajax.responseText);
								var result = xml.getElementsByTagName('result');
								var code = result[0].getElementsByTagName('code')[0].firstChild.nodeValue;
								var aceScript = result[0].getElementsByTagName('aceScript')[0].firstChild.nodeValue;
								resCode = code; // ok or error
								if (aceScript !='') {
									eval(aceScript);
								}
							} else {
								resCode = ajax.responseText; // '' or error
							}

							if (resCode == 'error') return;

							self.data[key].ea = el.value;

							var tot_ea = 0, tot_price = 0;
							var row, data_size = self.data ? self.data.length : 0;

							if (data_size > 0)
							{
								for (var i=0;i<data_size ;i++) {

									if (self.data[i] == undefined) continue;
									row = self.data[i];

									tot_ea += parseInt(row.ea);
									tot_price += (parseInt(row.price) + (parseInt(row.addprice) || 0))  * row.ea;

								}
							}

							$('el-cart-tab-total-ea').innerHTML = comma(tot_ea) + ' 개';
							$('el-cart-tab-total-price').innerHTML = comma(tot_price) + ' 원';
						}
					}
				}

				ajax.open("GET", '../proc/indb.cart.tab.php?'+param, true);
				ajax.send(null);

			}, 250);

		},
		cart : function(goodsno) {
			window.open('../goods/goods_view.php?goodsno='+goodsno+'&preview=y','GOODSPREVIEWWIN','width=800,height=450,scrollbars=1');
		},
		open : function() {

			this.objects.tab.style.height = '258px';
			//this.objects.body.style.display = 'block';
			this.objects.toggler.src = this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_down.gif';

			setCookie('_godo_cart_tab_status', 'o', 0, '/');
			this.status = true;
		},
		close : function() {

			this.objects.toggler.src = this.cfg.path + '/tpl/' + this.cfg.tpl + '/btn_up.gif';

			this.objects.tab.style.height = '32px';
			//this.objects.body.style.display = 'none';

			setCookie('_godo_cart_tab_status', 'x', 0, '/');

			this.status = false;

		},
		toggle : function() {
			return (this.status == true) ? this.close() : this.open();
		},
		change : function(tab) {

			var code = '';
			var req_logged = false;

			switch (tab) {
				case 'cart':	// c
					code = 'c';
					break;
				case 'wishlist':	// b
					code = 'b';
					req_logged = true;
					break;
				case 'today':	// a
					code = 'a';
					break;
				default:
					return;
					break;
			}

			// 탭 이미지 교체
			var el = $('el-godo-cart-tab-menu');
			el.style.cssText = 'background:url('+this.cfg.path + '/tpl/' + this.cfg.tpl + '/teb_' + code + '.gif) no-repeat top left;';
			el.className = 'menu ' + code;

			// 우측 버튼 교체
			$('el-cart-tab-list-action-button').className = tab;


			if (req_logged == true && this.cfg.logged == false)
			{
				var _layout = '';
				_layout += '<div class="login">';
				_layout += '<p>로그인 후 이용하실 수 있습니다.</p>';
				_layout += '<a href="../member/login.php"><img src="'+this.cfg.path+'/tpl/common/btn_login.gif">';
				_layout += '</div>';
				// 내용 가져 와서 출력
				$('el-godo-cart-tab-content').innerHTML = _layout;
			}
			else {
				// 내용 가져 와서 출력
				getContents('../proc/indb.cart.tab.php','tab='+tab, 'list');
			}

			setCookie('_godo_cart_tab_current', tab, 0, '/');

			this.active = tab;

		}
	}
}();