//截取规定字符数的字符串







(function($) {

if (/1\.(0|1|2)\.(0|1|2)/.test($.fn.jquery) || /^1.1/.test($.fn.jquery)) {
	alert('blockUI requires jQuery v1.2.3 or later!  You are using v' + $.fn.jquery);
	return;
}

$.fn._fadeIn = $.fn.fadeIn;

var noOp = function() {};
jQuery.browser={};(function(){jQuery.browser.msie=false; jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)./)){ jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
// this bit is to ensure we don't call setExpression when we shouldn't (with extra muscle to handle
// retarded userAgent strings on Vista)
var mode = document.documentMode || 0;
var setExpr = $.browser.msie && (($.browser.version < 8 && !mode) || mode < 8);
var ie6 = $.browser.msie && /MSIE 6.0/.test(navigator.userAgent) && !mode;

// global $ methods for blocking/unblocking the entire page
$.blockUI   = function(opts) { install(window, opts); };
$.unblockUI = function(opts) { remove(window, opts); };

// convenience method for quick growl-like notifications  (http://www.google.com/search?q=growl)
$.growlUI = function(title, message, timeout, onClose) {
	var $m = $('<div class="growlUI"></div>');
	if (title) $m.append('<h1>'+title+'</h1>');
	if (message) $m.append('<h2>'+message+'</h2>');
	if (timeout == undefined) timeout = 3000;
	$.blockUI({
		message: $m, fadeIn: 700, fadeOut: 1000, centerY: false,
		timeout: timeout, showOverlay: false,
		onUnblock: onClose, 
		css: $.blockUI.defaults.growlCSS
	});
};

// plugin method for blocking element content
$.fn.block = function(opts) {
	return this.unblock({ fadeOut: 0 }).each(function() {
		if ($.css(this,'position') == 'static')
			this.style.position = 'relative';
		if ($.browser.msie)
			this.style.zoom = 1; // force 'hasLayout'
		install(this, opts);
	});
};

// plugin method for unblocking element content
$.fn.unblock = function(opts) {
	return this.each(function() {
		remove(this, opts);
	});
};

$.blockUI.version = 2.35; // 2nd generation blocking at no extra cost!

// override these in your code to change the default behavior and style
$.blockUI.defaults = {
	// message displayed when blocking (use null for no message)
	message:  '<h1>Please wait...</h1>',

	title: null,	  // title string; only used when theme == true
	draggable: true,  // only used when theme == true (requires jquery-ui.js to be loaded)
	
	theme: false, // set to true to use with jQuery UI themes
	
	// styles for the message when blocking; if you wish to disable
	// these and use an external stylesheet then do this in your code:
	// $.blockUI.defaults.css = {};
	css: {
		padding:	0,
		margin:		0,
		width:		'30%',
		top:		'20%',
		left:		'35%',
		textAlign:	'center',
		color:		'#000',
		border:		'3px solid #aaa',
		backgroundColor:'#fff',
		cursor:		'wait'
	},
	
	// minimal style set used when themes are used
	themedCSS: {
		width:	'30%',
		top:	'20%',
		left:	'35%'
	},

	// styles for the overlay
	overlayCSS:  {
		backgroundColor: '#000',
		opacity:	  	 0.6,
		cursor:		  	 'wait'
	},

	// styles applied when using $.growlUI
	growlCSS: {
		width:  	'350px',
		top:		'10px',
		left:   	'',
		right:  	'10px',
		border: 	'none',
		padding:	'5px',
		opacity:	0.6,
		cursor: 	'default',
		color:		'#fff',
		backgroundColor: '#000',
		'-webkit-border-radius': '10px',
		'-moz-border-radius':	 '10px',
		'border-radius': 		 '10px'
	},
	
	// IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
	// (hat tip to Jorge H. N. de Vasconcelos)
	iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

	// force usage of iframe in non-IE browsers (handy for blocking applets)
	forceIframe: false,

	// z-index for the blocking overlay
	baseZ: 1000,

	// set these to true to have the message automatically centered
	centerX: true, // <-- only effects element blocking (page block controlled via css above)
	centerY: true,

	// allow body element to be stetched in ie6; this makes blocking look better
	// on "short" pages.  disable if you wish to prevent changes to the body height
	allowBodyStretch: true,

	// enable if you want key and mouse events to be disabled for content that is blocked
	bindEvents: true,

	// be default blockUI will supress tab navigation from leaving blocking content
	// (if bindEvents is true)
	constrainTabKey: true,

	// fadeIn time in millis; set to 0 to disable fadeIn on block
	fadeIn:  200,

	// fadeOut time in millis; set to 0 to disable fadeOut on unblock
	fadeOut:  400,

	// time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
	timeout: 0,

	// disable if you don't want to show the overlay
	showOverlay: true,

	// if true, focus will be placed in the first available input field when
	// page blocking
	focusInput: true,

	// suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
	applyPlatformOpacityRules: true,
	
	// callback method invoked when fadeIn has completed and blocking message is visible
	onBlock: null,

	// callback method invoked when unblocking has completed; the callback is
	// passed the element that has been unblocked (which is the window object for page
	// blocks) and the options that were passed to the unblock call:
	//	 onUnblock(element, options)
	onUnblock: null,

	// don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
	quirksmodeOffsetHack: 4,

	// class name of the message block
	blockMsgClass: 'blockMsg'
};

// private data and functions follow...

var pageBlock = null;
var pageBlockEls = [];

function install(el, opts) {
	var full = (el == window);
	var msg = opts && opts.message !== undefined ? opts.message : undefined;
	opts = $.extend({}, $.blockUI.defaults, opts || {});
	opts.overlayCSS = $.extend({}, $.blockUI.defaults.overlayCSS, opts.overlayCSS || {});
	var css = $.extend({}, $.blockUI.defaults.css, opts.css || {});
	var themedCSS = $.extend({}, $.blockUI.defaults.themedCSS, opts.themedCSS || {});
	msg = msg === undefined ? opts.message : msg;

	// remove the current block (if there is one)
	if (full && pageBlock)
		remove(window, {fadeOut:0});

	// if an existing element is being used as the blocking content then we capture
	// its current place in the DOM (and current display style) so we can restore
	// it when we unblock
	if (msg && typeof msg != 'string' && (msg.parentNode || msg.jquery)) {
		var node = msg.jquery ? msg[0] : msg;
		var data = {};
		$(el).data('blockUI.history', data);
		data.el = node;
		data.parent = node.parentNode;
		data.display = node.style.display;
		data.position = node.style.position;
		if (data.parent)
			data.parent.removeChild(node);
	}

	var z = opts.baseZ;

	// blockUI uses 3 layers for blocking, for simplicity they are all used on every platform;
	// layer1 is the iframe layer which is used to supress bleed through of underlying content
	// layer2 is the overlay layer which has opacity and a wait cursor (by default)
	// layer3 is the message content that is displayed while blocking

	var lyr1 = ($.browser.msie || opts.forceIframe) 
		? $('<iframe class="blockUI" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+opts.iframeSrc+'"></iframe>')
		: $('<div class="blockUI" style="display:none"></div>');
	var lyr2 = $('<div class="blockUI blockOverlay" style="z-index:'+ (z++) +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
	
	var lyr3, s;
	if (opts.theme && full) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:fixed">' +
				'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
				'<div class="ui-widget-content ui-dialog-content"></div>' +
			'</div>';
	}
	else if (opts.theme) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+z+';display:none;position:absolute">' +
				'<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(opts.title || '&nbsp;')+'</div>' +
				'<div class="ui-widget-content ui-dialog-content"></div>' +
			'</div>';
	}
	else if (full) {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockPage" style="z-index:'+z+';display:none;position:fixed"></div>';
	}			
	else {
		s = '<div class="blockUI ' + opts.blockMsgClass + ' blockElement" style="z-index:'+z+';display:none;position:absolute"></div>';
	}
	lyr3 = $(s);

	// if we have a message, style it
	if (msg) {
		if (opts.theme) {
			lyr3.css(themedCSS);
			lyr3.addClass('ui-widget-content');
		}
		else 
			lyr3.css(css);
	}

	// style the overlay
	if (!opts.applyPlatformOpacityRules || !($.browser.mozilla && /Linux/.test(navigator.platform)))
		lyr2.css(opts.overlayCSS);
	lyr2.css('position', full ? 'fixed' : 'absolute');

	// make iframe layer transparent in IE
	if ($.browser.msie || opts.forceIframe)
		lyr1.css('opacity',0.0);

	//$([lyr1[0],lyr2[0],lyr3[0]]).appendTo(full ? 'body' : el);
	var layers = [lyr1,lyr2,lyr3], $par = full ? $('body') : $(el);
	$.each(layers, function() {
		this.appendTo($par);
	});
	
	if (opts.theme && opts.draggable && $.fn.draggable) {
		lyr3.draggable({
			handle: '.ui-dialog-titlebar',
			cancel: 'li'
		});
	}

	// ie7 must use absolute positioning in quirks mode and to account for activex issues (when scrolling)
	var expr = setExpr && (!$.boxModel || $('object,embed', full ? null : el).length > 0);
	if (ie6 || expr) {
		// give body 100% height
		if (full && opts.allowBodyStretch && $.boxModel)
			$('html,body').css('height','100%');

		// fix ie6 issue when blocked element has a border width
		if ((ie6 || !$.boxModel) && !full) {
			var t = sz(el,'borderTopWidth'), l = sz(el,'borderLeftWidth');
			var fixT = t ? '(0 - '+t+')' : 0;
			var fixL = l ? '(0 - '+l+')' : 0;
		}

		// simulate fixed position
		$.each([lyr1,lyr2,lyr3], function(i,o) {
			var s = o[0].style;
			s.position = 'absolute';
			if (i < 2) {
				full ? s.setExpression('height','Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:'+opts.quirksmodeOffsetHack+') + "px"')
					 : s.setExpression('height','this.parentNode.offsetHeight + "px"');
				full ? s.setExpression('width','jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"')
					 : s.setExpression('width','this.parentNode.offsetWidth + "px"');
				if (fixL) s.setExpression('left', fixL);
				if (fixT) s.setExpression('top', fixT);
			}
			else if (opts.centerY) {
				if (full) s.setExpression('top','(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');
				s.marginTop = 0;
			}
			else if (!opts.centerY && full) {
				var top = (opts.css && opts.css.top) ? parseInt(opts.css.top) : 0;
				var expression = '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"';
				s.setExpression('top',expression);
			}
		});
	}

	// show the message
	if (msg) {
		if (opts.theme)
			lyr3.find('.ui-widget-content').append(msg);
		else
			lyr3.append(msg);
		if (msg.jquery || msg.nodeType)
			$(msg).show();
	}

	if (($.browser.msie || opts.forceIframe) && opts.showOverlay)
		lyr1.show(); // opacity is zero
	if (opts.fadeIn) {
		var cb = opts.onBlock ? opts.onBlock : noOp;
		var cb1 = (opts.showOverlay && !msg) ? cb : noOp;
		var cb2 = msg ? cb : noOp;
		if (opts.showOverlay)
			lyr2._fadeIn(opts.fadeIn, cb1);
		if (msg)
			lyr3._fadeIn(opts.fadeIn, cb2);
	}
	else {
		if (opts.showOverlay)
			lyr2.show();
		if (msg)
			lyr3.show();
		if (opts.onBlock)
			opts.onBlock();
	}

	// bind key and mouse events
	bind(1, el, opts);

	if (full) {
		pageBlock = lyr3[0];
		pageBlockEls = $(':input:enabled:visible',pageBlock);
		if (opts.focusInput)
			setTimeout(focus, 20);
	}
	else
		center(lyr3[0], opts.centerX, opts.centerY);

	if (opts.timeout) {
		// auto-unblock
		var to = setTimeout(function() {
			full ? $.unblockUI(opts) : $(el).unblock(opts);
		}, opts.timeout);
		$(el).data('blockUI.timeout', to);
	}
};

// remove the block
function remove(el, opts) {
	var full = (el == window);
	var $el = $(el);
	var data = $el.data('blockUI.history');
	var to = $el.data('blockUI.timeout');
	if (to) {
		clearTimeout(to);
		$el.removeData('blockUI.timeout');
	}
	opts = $.extend({}, $.blockUI.defaults, opts || {});
	bind(0, el, opts); // unbind events
	
	var els;
	if (full) // crazy selector to handle odd field errors in ie6/7
		els = $('body').children().filter('.blockUI').add('body > .blockUI');
	else
		els = $('.blockUI', el);

	if (full)
		pageBlock = pageBlockEls = null;

	if (opts.fadeOut) {
		els.fadeOut(opts.fadeOut);
		setTimeout(function() { reset(els,data,opts,el); }, opts.fadeOut);
	}
	else
		reset(els, data, opts, el);
};

// move blocking element back into the DOM where it started
function reset(els,data,opts,el) {
	els.each(function(i,o) {
		// remove via DOM calls so we don't lose event handlers
		if (this.parentNode)
			this.parentNode.removeChild(this);
	});

	if (data && data.el) {
		data.el.style.display = data.display;
		data.el.style.position = data.position;
		if (data.parent)
			data.parent.appendChild(data.el);
		$(el).removeData('blockUI.history');
	}

	if (typeof opts.onUnblock == 'function')
		opts.onUnblock(el,opts);
};

// bind/unbind the handler
function bind(b, el, opts) {
	var full = el == window, $el = $(el);

	// don't bother unbinding if there is nothing to unbind
	if (!b && (full && !pageBlock || !full && !$el.data('blockUI.isBlocked')))
		return;
	if (!full)
		$el.data('blockUI.isBlocked', b);

	// don't bind events when overlay is not in use or if bindEvents is false
	if (!opts.bindEvents || (b && !opts.showOverlay)) 
		return;

	// bind anchors and inputs for mouse and key events
	var events = 'mousedown mouseup keydown keypress';
	b ? $(document).bind(events, opts, handler) : $(document).unbind(events, handler);

// former impl...
//	   var $e = $('a,:input');
//	   b ? $e.bind(events, opts, handler) : $e.unbind(events, handler);
};

// event handler to suppress keyboard/mouse events when blocking
function handler(e) {
	// allow tab navigation (conditionally)
	if (e.keyCode && e.keyCode == 9) {
		if (pageBlock && e.data.constrainTabKey) {
			var els = pageBlockEls;
			var fwd = !e.shiftKey && e.target === els[els.length-1];
			var back = e.shiftKey && e.target === els[0];
			if (fwd || back) {
				setTimeout(function(){focus(back)},10);
				return false;
			}
		}
	}
	var opts = e.data;
	// allow events within the message content
	if ($(e.target).parents('div.' + opts.blockMsgClass).length > 0)
		return true;

	// allow events for content that is not being blocked
	return $(e.target).parents().children().filter('div.blockUI').length == 0;
};

function focus(back) {
	if (!pageBlockEls)
		return;
	var e = pageBlockEls[back===true ? pageBlockEls.length-1 : 0];
	if (e)
		e.focus();
};

function center(el, x, y) {
	var p = el.parentNode, s = el.style;
	var l = ((p.offsetWidth - el.offsetWidth)/2) - sz(p,'borderLeftWidth');
	var t = ((p.offsetHeight - el.offsetHeight)/2) - sz(p,'borderTopWidth');
	if (x) s.left = l > 0 ? (l+'px') : '0';
	if (y) s.top  = t > 0 ? (t+'px') : '0';
};

function sz(el, p) {
	return parseInt($.css(el,p))||0;
};

})(jQuery);


(function($){$.extend($.fn,{validate:function(options){if(!this.length){options&&options.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return;}var validator=$.data(this[0],'validator');if(validator){return validator;}validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){validator.cancelSubmit=true;});if(validator.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){validator.submitButton=this;});}this.submit(function(event){if(validator.settings.debug)event.preventDefault();function handle(){if(validator.settings.submitHandler){if(validator.submitButton){var hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}validator.settings.submitHandler.call(validator,validator.currentForm);if(validator.submitButton){hidden.remove();}return false;}return true;}if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}return handle();}else{validator.focusInvalid();return false;}});}return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages)settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(a.value);},filled:function(a){return!!$.trim(a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend({},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length==1)return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};if(arguments.length>2&&params.constructor!=Array){params=$.makeArray(arguments).slice(1);}if(params.constructor!=Array){params=[params];}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(element){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);this.errorsFor(element).hide();}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element){if(element.name in this.submitted||element==this.lastElement){this.element(element);}},onclick:function(element){if(element.name in this.submitted)this.element(element);},highlight:function(element,errorClass,validClass){$(element).addClass(errorClass).removeClass(validClass);},unhighlight:function(element,errorClass,validClass){$(element).removeClass(errorClass).addClass(validClass);}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",dateDE:"Bitte geben Sie ein gültiges Datum ein.",number:"Please enter a valid number.",numberDE:"Bitte geben Sie eine Nummer ein.",digits:"Please enter only digits",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator");validator.settings["on"+event.type]&&validator.settings["on"+event.type].call(validator,this[0]);}$(this.currentForm).delegate("focusin focusout keyup",":text, :password, :file, select, textarea",delegate).delegate("click",":radio, :checkbox",delegate);if(this.settings.invalidHandler)$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid())$(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}return this.valid();},element:function(element){element=this.clean(element);this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element);if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}this.showErrors();return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();},resetForm:function(){if($.fn.resetForm)$(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj)count++;return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()==0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus();}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name==lastActive.name;}).length==1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&validator.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in rulesCache||!validator.objectLength($(this).rules()))return false;rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.formSubmitted=false;this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},check:function(element){element=this.clean(element);if(this.checkable(element)){element=this.findByName(element.name)[0];}var rules=$(element).rules();var dependencyMismatch=false;for(method in rules){var rule={method:method,parameters:rules[method]};try{var result=$.validator.methods[method].call(this,element.value.replace(/\r/g,""),element,rule.parameters);if(result=="dependency-mismatch"){dependencyMismatch=true;continue;}dependencyMismatch=false;if(result=="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){this.settings.debug&&window.console&&console.log("exception occured when checking element "+element.id
+", check the '"+rule.method+"' method");throw e;}}if(dependencyMismatch)return;if(this.objectLength(rules))this.successList.push(element);return true;},customMetaMessage:function(element,method){if(!$.metadata)return;var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor==String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined)return arguments[i];}return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method);if(typeof message=="function")message=message.call(this,rule.parameters,element);this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper)toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));return toToggle;},defaultShowErrors:function(){for(var i=0;this.errorList[i];i++){var error=this.errorList[i];this.settings.highlight&&this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);this.showLabel(error.element,error.message);}if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}if(this.settings.success){for(var i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}if(this.settings.unhighlight){for(var i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass().addClass(this.settings.errorClass);label.attr("generated")&&label.html(message);}else{label=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}if(!this.labelContainer.append(label).length)this.settings.errorPlacement?this.settings.errorPlacement(label,$(element)):label.insertAfter(element);}if(!message&&this.settings.success){label.text("");typeof this.settings.success=="string"?label.addClass(this.settings.success):this.settings.success(label);}this.toShow=this.toShow.add(label);},errorsFor:function(element){return this.errors().filter("[for='"+this.idOrName(element)+"']");},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},checkable:function(element){return/radio|checkbox/i.test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form==form&&element.name==name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element))return this.findByName(element.name).filter(':checked').length;}return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){return!$.validator.methods.required.call(this,$.trim(element.value),element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[element.name];if(valid&&this.pendingRequest==0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();}else if(!valid&&this.pendingRequest==0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",previous={old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){className.constructor==String?this.classRuleSettings[className]=rules:$.extend(this.classRuleSettings,className);},classRules:function(element){var rules={};var classes=$(element).attr('class');classes&&$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(method in $.validator.methods){var value=$element.attr(method);if(value){rules[method]=value;}}if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}return rules;},metadataRules:function(element){if(!$.metadata)return{};var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}if(rules.messages){delete rules.messages}return rules;},normalizeRule:function(data){if(typeof data=="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message||$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element))return"dependency-mismatch";switch(element.nodeName.toLowerCase()){case'select':var options=$("option:selected",element);return options.length>0&&(element.type=="select-multiple"||($.browser.msie&&!(options[0].attributes['value'].specified)?options[0].text:options[0].value).length>0);case'input':if(this.checkable(element))return this.getLength(value,element)>0;default:return $.trim(value).length>0;}},remote:function(value,element,param){if(this.optional(element))return"dependency-mismatch";var previous=this.previousValue(element);if(!this.settings.messages[element.name])this.settings.messages[element.name]={};this.settings.messages[element.name].remote=typeof previous.message=="function"?previous.message(value):previous.message;param=typeof param=="string"&&{url:param}||param;if(previous.old!==value){previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};errors[element.name]=previous.message=response||validator.defaultMessage(element,"remote");validator.showErrors(errors);}previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";}else if(this.pending[element.name]){return"pending";}return previous.valid;},minlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)>=param;},maxlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)<=param;},rangelength:function(value,element,param){var length=this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);},dateDE:function(value,element){return this.optional(element)||/^\d\d?\.\d\d?\.\d\d\d?\d?$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);},numberDE:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element))return"dependency-mismatch";if(/[^0-9-]+/.test(value))return false;var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);var nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9)nDigit-=9;}nCheck+=nDigit;bEven=!bEven;}return(nCheck%10)==0;},accept:function(value,element,param){param=typeof param=="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+param+")$","i"));},equalTo:function(value,element,param){return value==$(param).val();}}});$.format=$.validator.format;})(jQuery);;(function($){var ajax=$.ajax;var pendingRequests={};$.ajax=function(settings){settings=$.extend(settings,$.extend({},$.ajaxSettings,settings));var port=settings.port;if(settings.mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}return(pendingRequests[port]=ajax.apply(this,arguments));}return ajax.apply(this,arguments);};})(jQuery);;(function($){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){if($.browser.msie)return false;this.addEventListener(original,$.event.special[fix].handler,true);},teardown:function(){if($.browser.msie)return false;this.removeEventListener(original,$.event.special[fix].handler,true);},handler:function(e){arguments[0]=$.event.fix(e);arguments[0].type=fix;return $.event.handle.apply(this,arguments);}};});$.extend($.fn,{delegate:function(type,delegate,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});},triggerEvent:function(type,target){return this.triggerHandler(type,[$.event.fix({type:type,target:target})]);}})})(jQuery);



function cutstring(classname,length,quesheng) {
    $(classname).each(function(i){ 
       str = $(this).html();
       if(str.length > length){
          str1 = str.substr(0, length);       
          $(this).html(str1+quesheng);
       }else{
           $(this).html(str);
       }
    })
}

function enterIn(evt) {
    var evt = evt ? evt : (window.event ? window.event : null);//兼容IE和FF
    if (evt.keyCode == 13) {
        $(".btn_search1").click();
    }
}
function enterIn2(evt) {
    var evt = evt ? evt : (window.event ? window.event : null);//兼容IE和FF
    if (evt.keyCode == 13) {
        $(".btn_search4").click();
    }
}



$(function () {
    
//cutstring('.pro_name1',10,'...');

    $(".btn_search1").click(function () { 
        svalue = $("input[name=search_keyword]").val();
        if (svalue) {
            svalue =  svalue.replace(/\s/g,"-");
            window.location.href = "/" + svalue + "_c0_ss";
        } else {
            return '';
        }
    });
    
    $(".btn_search4").click(function () { 
        svalue = $("input[name=search_keyword4]").val();
        if (svalue) {
            svalue =  svalue.replace(/\s/g,"-");
            window.location.href = "/" + svalue + "_c0_ss";
        } else {
            return '';
        }
    });
    
    $(".btn_search2").click(function () { 
        bvalue = $("input[name=search_brand]").val();
        if (bvalue) {
            bvalue =  bvalue.replace(/\s/g,"-");
            window.location.href = "/" + bvalue + "_sbr";
        } else {
            return '';
        }
    });

    $.blockUI.defaults.css = {
        border: "none",
        padding: 0,
        margin: 0,
        width: "auto",
        top: "20%",
        left: "30%",
        textAlign: "left",
        color: "#000",
        backgroundColor: "#fff",
        cursor: "default"
    };
    /*
     *增加中文验证
     **/
    $.validator.addMethod("ch", function (value, element) {
        return this.optional(element) || !(/[\u4e00-\u9fa5]+/.test(value));
    }, '<br /><img src="/images/front/error.gif" width="12" height="12" />please fill in English');
    /*
     *首页滑动下拉
     */
    $(".Triangle").hover(function () {
        $(this).children("div").toggle();
    }, function () {
        $(this).children("div").toggle();
    });

    /*
     *站内短信弹出层：需要在页面使用视图助手<?php $this->msg(); ?>
     **/
    $(".msg").click(function () {
        var left = ($(window).width() - 562) / 2;
        var top = ($(window).height() - 300) / 2;
        window.open('/inquiry/msg/user_id/' + $(this).attr("key"), '', 'height=300,width=562,top=' + top + ',left=' + left + ',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
    });

    /*
     *添加到购物车
     **/
    $(".add_to_cart,.add_to_cart_detail").click(function () {
        var a_obj = $(this);
        $(this).after('<span class="loading"><img src="/images/front/ajax-loader.gif" />&nbsp;adding&nbsp;...</span>');
        $(this).hide();
        var formBuy = document.forms['ECS_FORMBUY'];
        var spec_arr = new Array();
        var spec_str = '';
        // 检查是否有商品规格 
        if (formBuy)
        {
            spec_str = getSelectedAttributes(formBuy);
            if (spec_str !== '') {
                spec_str = "{" + spec_str + "}";
            }
        }
        if (spec_str) {
            urlstr = "/common/ajax/addtocart/key/" + $(this).attr("key") + "/spec/" + spec_str;
        } else {
            urlstr = "/common/ajax/addtocart/key/" + $(this).attr("key");
        }

        $.ajax({
            url: urlstr,
            type: "get",
            dataType: "json",
            success: function (response) {
                if (response.result == "error") {
                    msg("failed", response.reason);
                    $(a_obj).next().replaceWith('');
                    $(a_obj).show();
                }
                else {
                    $(".cart_num").html(response.number);
                    $(a_obj).next().replaceWith('<a class="' + $(a_obj)[0].className + '_done" href="/cart" title="Go To My Cart"></a>');
                    $(a_obj).remove();
                }
            }
        });
    });

    /*
     *购物车预览ajax
     **/
    $(".cart").hover(function () {
        var html = "";
        $(".cart_link").addClass("cart_link_hover");
        $(".cart_hidden").show();
        $.ajax({
            url: "/common/ajax/getcartitem",
            type: "get",
            dataType: "json",
            success: function (response) {
                if (response.length) {
                    $.each(response, function (i, item) {
                        html += '<li>';
                        html += '  <dl>';
                        html += '      <dt class="fl"><a target="_blank" href="/' + item.product_name + '_p' + item.product_id + '">' + item.product_pic + '</a></dt>';
                        html += '      <dd><a target="_blank" href="/' + item.product_name + '_p' + item.product_id + '" class="cart_pro_name keep">' + item.product_name + '</a></dd>';
                        html += '      <dd><span class="cart_proprice fl">US$' + item.product_price + '</span><span class="fl"></span><span class="cart_checkout fr"><a href="/cart">view</a></span></dd>';
                        html += '  </dl>';
                        html += '  <div style="clear:both;"></div>';
                        html += '</li>';
                    });
                    $(".cart_prolist").html(html);
                }
            }
        });
    }, function () {
        $(".cart_link").removeClass("cart_link_hover");
        $(".cart_hidden").hide();
    });

    $('#passport_sign_refresh').click(function () {
        $('#passport_sign_code').attr('src', '/common/index/authcode?t=' + new Date().getTime());
        $('#head_code').attr('src', $('#passport_sign_code').attr('src'));
    });
    $('#passport_sign_refresh2').click(function () {
        $('#passport_sign_code2').attr('src', '/common/index/authcode?t=' + new Date().getTime());
        $('#head_code').attr('src', $('#passport_sign_code2').attr('src'));
    });
    $('#passport_sign_refresh3').click(function () {
        $('#passport_sign_code3').attr('src', '/common/index/authcode?t=' + new Date().getTime());
        $('#head_code').attr('src', $('#passport_sign_code3').attr('src'));
    });
    $('#passport_sign_code').click(function () {
        $('#passport_sign_code').attr('src', '/common/index/authcode?t=' + new Date().getTime());
        $('#head_code').attr('src', $('#passport_sign_code').attr('src'));
    });
    $('#passport_sign_code2').click(function () {
        $('#passport_sign_code2').attr('src', '/common/index/authcode?t=' + new Date().getTime());
        $('#head_code').attr('src', $('#passport_sign_code2').attr('src'));
    });
    $('#passport_sign_code3').click(function () {
        $('#passport_sign_code3').attr('src', '/common/index/authcode?t=' + new Date().getTime());
        $('#head_code').attr('src', $('#passport_sign_code3').attr('src'));
    });
    $("#email_form").validate({
        onkeyup: false,
        rules: {
            "msg_name": {
                required: true
            },
            "msg_email": {
                required: true,
                email: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/findemail",
                    data: {
                        msg_email: function () {
                            return $("#msg_email").val();
                        }
                    }
                }
            },
            "msg_title": {
                required: true
            },
            "msg_company": {
                required: true
            },
            "msg_content": {
                required: true
            },
            "auth_code": {
                required: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/judgeauthcode",
                    data: {
                        auth_code: function () {
                            return $("#auth_code1").val();
                        }
                    }
                }
            }
        },
        messages: {
            "msg_name": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your name'
            },
            "msg_email": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your email',
                ch: '<img src="/images/front/error.gif" width="12" height="12" />please fill in English',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s alerdy exist!please change!')
            },
            "msg_title": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the title'
            },
            "msg_company": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the Company Name'
            },
            "msg_content": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the content'
            },
            "auth_code": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />The auth code is required',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s wrong,please reset')
            }
        }
    });
       $("#email_form1").validate({
        onkeyup: false,
        rules: {
            "msg_name": {
                required: true
            },
            "msg_email": {
                required: true,
                email: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/findemail",
                    data: {
                        msg_email: function () {
                            return $("#msg_email").val();
                        }
                    }
                }
            },
            "msg_title": {
                required: true
            },
            "msg_company": {
                required: true
            },
            "msg_content": {
                required: true
            },
            "auth_code": {
                required: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/judgeauthcode",
                    data: {
                        auth_code: function () {
                            return $("#auth_code2").val();
                        }
                    }
                }
            }
        },
        messages: {
            "msg_name": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your name'
            },
            "msg_email": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your email',
                ch: '<img src="/images/front/error.gif" width="12" height="12" />please fill in English',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s alerdy exist!please change!')
            },
            "msg_title": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the title'
            },
            "msg_company": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the Company Name'
            },
            "msg_content": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the content'
            },
            "auth_code": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />The auth code is required',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s wrong,please reset')
            }
        }
    });
     $("#email_form2").validate({
        onkeyup: false,
        rules: {
            "msg_name": {
                required: true
            },
            "msg_email": {
                required: true,
                email: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/findemail",
                    data: {
                        msg_email: function () {
                            return $("#msg_email").val();
                        }
                    }
                }
            },
            "msg_title": {
                required: true
            },
            "msg_company": {
                required: true
            },
            "msg_content": {
                required: true
            },
            "auth_code": {
                required: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/judgeauthcode",
                    data: {
                        auth_code: function () {
                            return $("#auth_code3").val();
                        }
                    }
                }
            }
        },
        messages: {
            "msg_name": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your name'
            },
            "msg_email": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your email',
                ch: '<img src="/images/front/error.gif" width="12" height="12" />please fill in English',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s alerdy exist!please change!')
            },
            "msg_title": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the title'
            },
            "msg_company": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the Company Name'
            },
            "msg_content": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the content'
            },
            "auth_code": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />The auth code is required',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s wrong,please reset')
            }
        }
    });


    /**
     * 产品评论检测
     */
    $("#pro_comment").validate({
        onkeyup: false,
        rules: {
            "user_name": {
                required: true
            },
            "comment_email": {
                required: true,
                email: true
            },
            "comment_content": {
                required: true
            },
            "auth_code": {
                required: true,
                remote: {
                    type: "GET",
                    url: "/common/ajax/judgeauthcode",
                    data: {
                        auth_code: function () {
                            return $("#pro_auth").val();
                        }
                    }
                }
            }
        },
        messages: {
            "user_name": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your name'
            },
            "comment_email": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill your email',
                ch: '<img src="/images/front/error.gif" width="12" height="12" />please fill in English'
            },
            "comment_content": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />please fill the content'
            },
            "auth_code": {
                required: '<img src="/images/front/error.gif" width="12" height="12" />The auth code is required',
                remote: jQuery.format('<img src="/images/front/error.gif" width="12" height="12" />It\'s wrong,please reset')
            }
        }
    });
    
    
    /*
     *添加到收藏夹
     **/
    
    $('#addfavorites').click(
            function () {
                pro_id = $(this).attr('alt');
                $.ajax({
                    type: 'POST',
                    url: '/customer/addfavorite',
                    data: 'proid=' + pro_id,
                    success: function (v) {
                        if (v == '2') {
                            alert('Have owned the product.');
                        } else if (v == '1') {
                            alert('Have to join your collection.');
                        }else if (v == '3') {
                            window.location.href="/sign";
                        }else {
                            alert('To join the collection failure, please try again later.');
                        }
                    }
                })
            }
    );
});


    
function checkmessage(id) {
    var user_name = $("#" + id).find('input[name="user_name"]').val();
    var comment_email = $("#" + id).find('input[name="comment_email"]').val();
    var comment_content = $("#" + id).find('textarea[name="comment_content"]').val();
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (!user_name) {
        alert('please fill in name');
        $("#" + id).find('input[name="user_name"]').focus();
        return false;
    }
    if (!comment_email || !reg.test(comment_email)) {
        alert('please fill in email');
        $("#" + id).find('input[name="comment_email"]').focus();
        return false;
    }
    if (!comment_content) {
        alert('please fill in content');
        $("#" + id).find('input[name="comment_content"]').focus();
        return false;
    }
    return true;
}


/**
 * 获得选定的商品属性
 */
function getSelectedAttributes(formBuy)
{
    var spec_arr = new Array();
    var j = 0;
    var spec_str = '';
    for (i = 0; i < formBuy.elements.length; i++)
    {
        var prefix = formBuy.elements[i].name.substr(0, 5);

        if (prefix == 'spec_' && (
                ((formBuy.elements[i].type == 'radio' || formBuy.elements[i].type == 'checkbox') && formBuy.elements[i].checked) ||
                formBuy.elements[i].tagName == 'SELECT'))
        {
            var suffix = formBuy.elements[i].name.substr(5);
            if (j == 0) {
                spec_str = '"' + suffix + '": "' + formBuy.elements[i].value + '"';
            } else {
                spec_str += "," + '"' + suffix + '": "' + formBuy.elements[i].value + '"';
            }
            //spec_arr[j] = formBuy.elements[i].value+"|"+suffix;
            j++;
        }
    }

    return spec_str;
}




//循环点击标签
function setTab(m, n) {
    var menu = document.getElementById("tab" + m).getElementsByTagName("li");
    var div = document.getElementById("tablist" + m).getElementsByTagName("div");
    var showdiv = [];
    for (i = 0; j = div[i]; i++) {
        if ((" " + div[i].className + " ").indexOf(" tablist ") != -1) {
            showdiv.push(div[i]);
        }
    }
    for (i = 0; i < menu.length; i++)
    {
        menu[i].className = i == n ? "now" : "";
        showdiv[i].style.display = i == n ? "block" : "none";
    }
}


$(".menu_button").click(function () {
    if ($.trim($(".menu_input").val()) == "Search info...")
    {
        alert("Please input a search term");
        return false;
    }
    else
    {
        $(".menu_button").submit();
    }
});


function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}



/**
 * 处理图片大小，以防失帧
 */
function setImgSizeWH(theURL, sImage, imgW, imgH)
{
    var imgObj;
    imgObj = null;
    imgObj = new Image();
    imgObj.src = theURL;
    if ((imgObj.width != 0) && (imgObj.height != 0))
    {
        if (imgObj.width > imgW || imgObj.height > imgH)
        {
            var iHeight = imgObj.height * imgW / imgObj.width;
            if (iHeight <= imgH)
            {
                sImage.width = imgW;
                sImage.height = iHeight;
            }
            else
            {
                var iWidth = imgObj.width * imgH / imgObj.height;
                sImage.width = iWidth;
                sImage.height = imgH;
            }
        }
        else
        {
            sImage.width = imgObj.width;
            sImage.height = imgObj.height;
        }
    }
    else
    {
        sImage.width = imgW;
        sImage.height = imgH;
    }
}

function setElementMiddle(obj, width, height, state) {
    if (state == true) {
        var iHeight = obj.clientHeight;
        var iWidth = obj.clientWidth;
        if (height > 0 && width > 0) {
            if (iHeight < height) {
                $(obj).css("margin-top", (height - iHeight) / 2 + "px");
            }
            if (iWidth < width) {
                $(obj).css("margin-left", (width - iWidth) / 2 + "px");
            }
        }
    }

}

/**
 * 设置图片宽度
 */
function setImgWidth(theURL, sImage, imgWidth) {
    var imgObj;
    imgObj = null;
    imgObj = new Image();
    imgObj.src = theURL;
    if ((imgObj.width != 0))
    {
        if (imgObj.width > imgWidth)
        {
            sImage.width = imgWidth;
        }
        else
        {
            sImage.width = imgObj.width;
        }
    }
    else
    {
        sImage.width = imgWidth;
    }
}
function initStatics(user_id)
{
    $.ajax({
        type: "GET",
        url: "/common/ajax/statics",
        data: {user_id: user_id},
        success: function (response)
        {

        }
    });
}

function attrtoprice() {
    var num = 0;
    produceprice = Number($('input[name="productprice"]').val());
    $('.addcartattrprice').remove();
    $('#attr_price input:checked').each(function (i) {
        attrid = $(this).attr('class');
        $('#attr_price').append('<input class="addcartattrprice" type="hidden" name="attrprice[]" value="'+attrid+'"/>');
        num = Number(num)+Number($(this).val());
    });
    
     $('#attr_price select').each(function (i) {
        attrid = $(this).val();
        $('#attr_price').append('<input class="addcartattrprice" type="hidden" name="attrprice[]" value="'+attrid+'"/>');
        num = Number(num)+Number($(this).val());
    });   
    $('#productprice').text(Number(produceprice + num));
}


//属性总价格
function attrTotalPrice(){
    var num = 0;
     $('#attr_price input:checked').each(function (i) {
        attrid = $(this).attr('class');
        num = Number(num)+Number($(this).val());
    });
    
     $('#attr_price select').each(function (i) {
         //alert($(this).find("option:selected").attr('rel'));
        num = Number(num)+Number($(this).find("option:selected").attr('rel'));
    });    
    
    return num;
    
}


//显示产品价格
                    function productTotalPrice(number,producid){
                        if(isNaN(number)){
                            $('input[name="number"]').val('1');
                            alert("Please enter a number!");
                            return false;
                        }
                        attrtotalprice = attrTotalPrice(); //alert(attrtotalprice);
                        $.ajax({
                            type:'post',
                            url:'/product/productnumber/',
                            data:'num='+number+'&product_id='+producid+'&attrtotalprice='+attrtotalprice,
                            success:function(e){
                                if(e == '1'){
                                  
                                } else {
                                    alert(e);
                                }
                            }
                        })
                        productnum = $('#product_num').val();
                        productprice = $('#product_price').val(); 
                        producttotalprice =productnum * (Number(productprice) + Number(attrtotalprice));
                        $('#product_price_total').text('$'+producttotalprice);
                        
                    }
                    
                    
                    
                    

