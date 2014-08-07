var JSON;if(!JSON){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="";var k,h,f,j,g,e,d;var b=0;c=Base64._utf8_encode(c);while(b<c.length){k=c.charCodeAt(b++);h=c.charCodeAt(b++);f=c.charCodeAt(b++);j=k>>2;g=((k&3)<<4)|(h>>4);e=((h&15)<<2)|(f>>6);d=f&63;if(isNaN(h)){e=d=64}else{if(isNaN(f)){d=64}}a=a+this._keyStr.charAt(j)+this._keyStr.charAt(g)+this._keyStr.charAt(e)+this._keyStr.charAt(d)}return a},decode:function(c){var a="";var k,h,f;var j,g,e,d;var b=0;c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));g=this._keyStr.indexOf(c.charAt(b++));e=this._keyStr.indexOf(c.charAt(b++));d=this._keyStr.indexOf(c.charAt(b++));k=(j<<2)|(g>>4);h=((g&15)<<4)|(e>>2);f=((e&3)<<6)|d;a=a+String.fromCharCode(k);if(e!=64){a=a+String.fromCharCode(h)}if(d!=64){a=a+String.fromCharCode(f)}}a=Base64._utf8_decode(a);return a},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");var a="";for(var e=0;e<b.length;e++){var d=b.charCodeAt(e);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)}}}return a},_utf8_decode:function(a){var b="";var d=0;var e=c1=c2=0;while(d<a.length){e=a.charCodeAt(d);if(e<128){b+=String.fromCharCode(e);d++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);b+=String.fromCharCode(((e&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+1);c3=a.charCodeAt(d+2);b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}return b}};var X=function(a){return Ext.getCmp(a)};X.state=function(a,b){X.util.setXState(a,b)};X.enable=function(a){X.util.enableSubmitControl(a)};X.disable=function(a){X.util.disableSubmitControl(a)};X.target=function(a){return X.util.getTargetWindow(a)};X.alert=function(){X.util.alert.apply(window,arguments)};X.init=function(){if(typeof(onInit)=="function"){onInit()}};X.ready=function(){if(typeof(onReady)=="function"){onReady()}};X.ajaxReady=function(){if(typeof(onAjaxReady)=="function"){onAjaxReady()}};(function(){X.util={alertTitle:"Alert Dialog",confirmTitle:"Confirm Dialog",formAlertMsg:"Please provide valid value for {0}!",formAlertTitle:"Form Invalid",loading:"Loading...",init:function(f,h,e,c,i,g,b,j,d){Ext.QuickTips.init(false);X.ajax.hookPostBack();if(g){}X.global_enable_ajax=d;X.global_enable_ajax_loading=b;X.global_ajax_loading_type=j;X.ajaxLoadingDefault=Ext.get(X.util.appendLoadingNode());X.ajaxLoadingMask=new Ext.LoadMask(Ext.getBody(),{msg:X.util.loading});X.form_upload_file=false;X.global_disable_ajax=false;X.window_default_group=new Ext.WindowGroup();X.window_default_group.zseed=6000;X.util.setHiddenFieldValue("X_CHANGED","false");document.forms[0].autocomplete="off";if(Ext.form.Field){var a=Ext.form.Field.prototype;a.msgTarget=f;a.labelWidth=h;a.labelSeparator=e;a.autoFitErrors=false}if(c){Ext.getBody().addClass("bigfont")}if(Ext.isIE6||Ext.isIE7){Ext.BLANK_IMAGE_URL=i}},setXState:function(c,d){if(!c||!c.x_state){return}var a,e,b;if(typeof(d.CssClass)!=="undefined"){e=d.CssClass;a=c.x_state["CssClass"];if(!a){a=c.initialConfig.cls}b=c.el;b.removeClass(a);b.addClass(e)}if(typeof(d.FormItemClass)!=="undefined"){e=d.FormItemClass;a=c.x_state["FormItemClass"];if(!a){a=c.initialConfig.itemCls}b=c.el.findParent(".x-form-item",10,true);b.removeClass(a);b.addClass(e)}Ext.apply(c.x_state,d)},stopEventPropagation:function(a){a=a||window.event;if(typeof(a.cancelBubble)==="boolean"){a.cancelBubble=true}else{a.stopPropagation()}},bind:function(b,a){return function(){return b.apply(a,arguments)}},replace:function(d,b){var a=Ext.get(d);if(a){var c=a.wrap().update(b);c.first().insertBefore(c);c.remove()}},removePageLoading:function(a){if(a){Ext.get("loading").remove();Ext.get("loading-mask").fadeOut({remove:true})}else{Ext.get("loading").remove();Ext.get("loading-mask").remove()}},stripHtmlTags:function(a){return a.replace(/<[^>]*>/g,"")},alert:function(d,c,a,b){c=c||X.util.alertTitle;a=a||Ext.MessageBox.INFO;Ext.MessageBox.show({title:c,msg:d,buttons:Ext.MessageBox.OK,icon:a,fn:function(e){if(e==="ok"){if(typeof(b)==="function"){b.call(window)}}}})},appendLoadingNode:function(){return X.util.appendFormNode({tag:"div",cls:"x-ajax-loading",html:X.util.loading})},appendFormNode:function(a){return Ext.DomHelper.append(document.forms[0],a)},setHiddenFieldValue:function(a,b){var c=Ext.get(a);if(c==null){X.util.appendFormNode({tag:"input",type:"hidden",id:a,name:a});Ext.get(a).dom.value=b}else{c.dom.value=b}},getHiddenFieldValue:function(a){var b=Ext.get(a);if(b){return b.getValue()}return null},disableSubmitControl:function(a){X(a).disable();X.util.setHiddenFieldValue("X_TARGET",a)},enableSubmitControl:function(a){X(a).enable();X.util.setHiddenFieldValue("X_TARGET","")},updateViewState:function(b,c){var a=X.util.getHiddenFieldValue("__VIEWSTATE");if(Ext.type(c)=="number"){if(c<a.length){a=a.substr(0,c)}}else{a=""}X.util.setHiddenFieldValue("__VIEWSTATE",a+b)},updateEventValidation:function(a){X.util.setHiddenFieldValue("__EVENTVALIDATION",a)},setPageStateChanged:function(){var a=Ext.get("X_CHANGED");if(a&&a.getValue()=="false"){a.dom.value="true"}},isPageStateChanged:function(){var a=Ext.get("X_CHANGED");if(a&&a.getValue()=="true"){return true}return false},validForms:function(b,d,h){var g=X.util.getTargetWindow(d);var a=true;var f=null;for(var e=0;e<b.length;e++){var j=X(b[e]).isValid();if(!j[0]){a=false;if(f==null){f=j[1]}}}if(!a){if(h){var c=String.format(X.util.formAlertMsg,f.fieldLabel);g.X.util.alert(c,X.util.formAlertTitle,Ext.MessageBox.INFO)}return false}return true},isHiddenFieldContains:function(d,c){c+="";var a=Ext.get(d).dom.value;if(a===""){return false}else{var b=a.split(",");return b.indexOf(c)>=0?true:false}},addValueToHiddenField:function(d,c){c+="";var a=Ext.get(d).dom.value;if(a==""){Ext.get(d).dom.value=c+""}else{var b=a.split(",");if(b.indexOf(c)<0){b.push(c);Ext.get(d).dom.value=b.join(",")}}},removeValueFromHiddenField:function(d,c){c+="";var a=Ext.get(d).dom.value;if(a!=""){var b=a.split(",");if(b.indexOf(c)>=0){b=b.remove(c);Ext.get(d).dom.value=b.join(",")}}},getHiddenFieldValue:function(a){var b=Ext.get(a);if(b==null){return""}else{return b.dom.value}},getFormFieldValue:function(a){if(a.getXType()=="datefield"){return a.value}else{return a.getValue()}},getTargetWindow:function(b){var a=null;if(b==="_self"){a=window}else{if(b==="_parent"){a=parent}else{if(b==="_top"){a=top}}}return a},preloadImages:function(a){var c=[];for(var b=0;b<a.length;b++){c[b]=new Image();c[b].src=a[b]}},hasCSS:function(a){return !!Ext.get(a)},addCSS:function(f,d){if(!Ext.get(f)){var c=document.createElement("style");var e=d;c.setAttribute("type","text/css");c.setAttribute("id",f);if(c.styleSheet){c.styleSheet.cssText=e}else{var a=document.createTextNode(e);c.appendChild(a)}var b=document.getElementsByTagName("head")[0];b.appendChild(c)}},makeAspnetSubmitButtonAjax:function(c){function b(d){d.addListener("click",function(f,e){__doPostBack(e.getAttribute("name"),"");f.stopEvent()})}if(typeof(c)==="undefined"){Ext.each(Ext.DomQuery.select("input[type=submit]"),function(e,d){b(Ext.get(e))})}else{var a=Ext.get(c);if(a.getAttribute("type")==="submit"){b(a)}}},isObjectEmpty:function(a){for(var b in a){if(a.hasOwnProperty(b)){return false}}return true},arrayToObject:function(a){var b={};Ext.each(a,function(d,c){b[d]=true});return b},hideScrollbar:function(){if(Ext.isIE){window.document.body.scroll="no"}else{window.document.body.style.overflow="hidden"}},addMainTab:function(g,d,c,k,i,b){var j,h,e,a,f;if(typeof(d)!=="string"){b=c;c=d.attributes.href;i=d.attributes.icon;k=d.text;d=d.id}if(i){j=i.replace(/\W/ig,"_");if(!X.util.hasCSS(j)){h=[];h.push(".");h.push(j);h.push('{background-image:url("');h.push(i);h.push('")}');X.util.addCSS(j,h.join(""))}}e="dynamic_added_tab"+d.replace("__","-");a=g.getTab(e);if(!a){f={id:e,url:c,title:k,closable:true,bodyStyle:"padding:0px;"};if(i){f.iconCls=j}if(b){f.tbar=b.call(window)}g.addTab(f)}else{g.setActiveTab(a)}},initTreeTabStrip:function(g,d,c){function e(h){h.on("click",function(k,j){if(k.isLeaf()){j.stopEvent();var i=k.attributes.href;window.location.hash="#"+i;X.util.addMainTab(d,k,c)}})}if(g.getXType()==="panel"){g.items.each(function(i){var h=i.items.itemAt(0);if(h&&h.getXType()==="treepanel"){e(h)}})}else{if(g.getXType()==="treepanel"){e(g)}}d.on("tabchange",function(h,i){if(i.url){window.location.hash="#"+i.url}else{window.location.hash="#"}});var b=window.location.hash.substr(1);var f=false;function a(j,m){var l,k,h,m,n;if(!f&&m.hasChildNodes()){h=m.childNodes;for(l=0;l<h.length;l++){k=h[l];if(k.isLeaf()){if(k.attributes.href===b){n=k.getPath();j.expandPath(n);j.selectPath(n);X.util.addMainTab(d,k,c);f=true;return}}else{arguments.callee(j,k)}}}}if(g.getXType()==="panel"){g.items.each(function(i){var h=i.items.itemAt(0);if(h&&h.getXType()==="treepanel"){a(h,h.getRootNode());if(f){i.expand();return false}}})}else{if(g.getXType()==="treepanel"){a(g,g.getRootNode())}}},resolveCheckBoxGroup:function(b,f){var m=[],h,l,j,a,g,d,e,c,k;g=f.X_Items;d=f.SelectedValueArray;e=f.SelectedValue;if(g&&g.length>0){for(h=0,l=g.length;h<l;h++){j=g[h];a=j[1];if(d){c=(d.indexOf(a)>=0)?true:false;k=b+"_"+h}else{c=(e===a)?true:false;k=b}m.push({inputValue:a,boxLabel:j[0],name:k,checked:c})}}else{m.push({inputValue:"tobedeleted",boxLabel:"&nbsp;",name:"tobedeleted"})}return m}}})();(function(){X.ajax={errorMsg:"Error! {0} ({1})",hookPostBack:function(){if(typeof(__doPostBack)!="undefined"){__doPostBack=d}}};function b(){if(typeof(X.control_enable_ajax)==="undefined"){return X.global_enable_ajax}return X.control_enable_ajax}function a(){if(typeof(X.control_enable_ajax_loading)==="undefined"){return X.global_enable_ajax_loading}return X.control_enable_ajax_loading}function h(){if(typeof(X.control_ajax_loading_type)==="undefined"){return X.global_ajax_loading_type}return X.control_ajax_loading_type}function e(){if(typeof(X.util.beforeAjaxPostBackScript)==="function"){X.util.beforeAjaxPostBackScript()}var o=Ext.encode(c());if(Ext.isIE6||Ext.isIE7){X.util.setHiddenFieldValue("X_STATE_URI","true");o=encodeURIComponent(o)}else{o=Base64.encode(o)}X.util.setHiddenFieldValue("X_STATE",o);if(!b()){X.control_enable_ajax=undefined;X.util.setHiddenFieldValue("X_AJAX","false");theForm.submit()}else{X.control_enable_ajax=undefined;X.util.setHiddenFieldValue("X_AJAX","true");var m=document.location.href;var n=m.indexOf("#");if(n>=0){m=m.substring(0,n)}Ext.Ajax.request({form:theForm.id,url:m,isUpload:X.form_upload_file,success:function(r){var p=r.responseText;if(p){var q=p.substr(0,4);if(q.toLowerCase()==="<pre"){p=p.replace(/<\/?pre[^>]*>/ig,"");p=decodeURIComponent(p)}new Function(p)()}X.ajaxReady()},failure:function(p){var q=X.util.getHiddenFieldValue("X_TARGET");if(q){X.enable(q)}if(!X.ajax.errorWindow){j()}X.ajax.errorWindow.show();X.ajax.errorWindow.body.dom.innerHTML=X.wnd.createIFrameHtml("about:blank","EXTASPNET_ERROR");X.ajax.errorWindow.setTitle(String.format(X.ajax.errorMsg,p.statusText,p.status));g(X.ajax.errorWindow.body.query("iframe")[0],p.responseText)}})}}function d(n,m){window.setTimeout(function(){if(!theForm.onsubmit||(theForm.onsubmit()!=false)){theForm.__EVENTTARGET.value=n;theForm.__EVENTARGUMENT.value=m;e()}},100)}function g(m,n){if(m){var o=m.contentWindow.document;if(o){o.open();o.write(n);o.close()}}}function j(){X.ajax.errorWindow=new Ext.Window({id:"EXTASPNET_ERROR",renderTo:window.body,width:550,height:350,border:true,animCollapse:true,collapsible:false,collapsed:false,closeAction:"hide",plain:false,modal:true,draggable:true,minimizable:false,minHeight:100,minWidth:200,resizable:false,maximizable:false,closable:true})}function c(){var m={};Ext.ComponentMgr.all.each(function(o,n){if(o.isXType){var q=o.x_state;if(q&&Ext.isObject(q)){var p=f(o,q);if(!X.util.isObjectEmpty(p)){m[o.id]=p}}}});return m}X.ajax.getXState=c;function f(n,p){var o={};Ext.apply(o,p);function m(r,q){X.util.setHiddenFieldValue(n.id+"_"+r,q)}if(n.isXType("panel")){m("Collapsed",n.collapsed)}if(n.isXType("datepicker")){m("SelectedDate",n.getValue().format(n.initialConfig.format))}if(n.isXType("button")){if(n.initialConfig.enableToggle){m("Pressed",n.pressed)}}if(n.isXType("grid")){m("SelectedRowIndexArray",n.x_getSelectedRows().join(","));m("HiddenColumnIndexArray",n.x_getHiddenColumns().join(","));m("RowStates",Ext.encode(n.x_getRowStates()))}if(n.isXType("treepanel")){m("ExpandedNodes",n.x_getExpandedNodes(n.getRootNode().childNodes).join(","));m("CheckedNodes",n.x_getCheckedNodes().join(","));m("SelectedNodeIDArray",n.x_getSelectedNodes().join(","))}if(n.isXType("tabpanel")){m("ActiveTabIndex",n.x_getActiveTabIndex())}if(n.x_type){if(n.x_type==="tab"){m("Hidden",n.tabEl.style.display==="none")}}return o}function l(m){if(i>0){if(m==="default"){X.ajaxLoadingDefault.setStyle("left",(Ext.getBody().getWidth()-X.ajaxLoadingDefault.getWidth())/2+"px");X.ajaxLoadingDefault.show()}else{X.ajaxLoadingMask.show()}}}function k(m){if(i<=0){i=0;if(m==="default"){X.ajaxLoadingDefault.hide()}else{X.ajaxLoadingMask.hide()}}}var i=0;Ext.Ajax.on("beforerequest",function(n,m){i++;if(!a()){}else{Ext.defer(l,100,window,[h()])}});Ext.Ajax.on("requestcomplete",function(n,m){i--;if(!a()){}else{Ext.defer(k,80,window,[h()])}X.control_enable_ajax_loading=undefined;X.control_ajax_loading_type=undefined});Ext.Ajax.on("requestexception",function(n,m){i--;if(!a()){}else{Ext.defer(k,100)}X.control_enable_ajax_loading=undefined;X.control_ajax_loading_type=undefined})})();(function(){function c(f,e){var h=(f.height-(f.height/1.618))-e.height/2;if(h<0){h=0}var g=(f.width-e.width)/2;if(g<0){g=0}return{left:g,top:h}}function b(f,e){var h=(f.height-e.height)/2;if(h<0){h=0}var g=(f.width-e.width)/2;if(g<0){g=0}return{left:g,top:h}}function a(e,f){return'<iframe frameborder="0" style="overflow:auto;height:100%;width:100%;" name="'+f+'" src="'+e+'"></iframe>'}function d(e){return Ext.get(e.el.findParentNode(".x-window-wrapper"))}X.wnd={closeButtonTooltip:"Close this window",formModifiedConfirmTitle:"Close Confrim",formModifiedConfirmMsg:"Current form has been modified.<br/><br/>Abandon changes?",createIFrameHtml:function(e,f){return a(e,f)},show:function(f,r,q,j,p,l,h){var m=X.util.getTargetWindow(f.box_property_target);var o=f.box_property_guid;if(window.frameElement&&m!==window){if(!m.X[o]){var g=o+"_wrapper";if(!m.Ext.get(g)){m.X.util.appendFormNode('<div class="x-window-wrapper" id="'+g+'"></div>')}else{m.Ext.get(g).dom.innerHTML=""}var i=Ext.apply({},{renderTo:g,manager:m.X.window_default_group,id:o,box_hide:null,box_hide_refresh:null,box_hide_postback:null,box_show:null,box_property_window:window,box_property_ext_window:f},f.initialConfig);m.X[o]=new m.Ext.Window(i)}f=m.X[o]}if(r!==""){X.wnd.updateIFrameNode(f,r)}if(q!=""){f.setTitle(q)}var e=m.window.Ext.getBody().getViewSize();Ext.get(h).dom.value="false";f.show();if(j!==""&&p!==""){f.setPosition(parseInt(j,10),parseInt(p,10))}else{var n=f.getSize(),k;if(l){k=c(e,n)}else{k=b(e,n)}f.setPosition(k.left,k.top)}X.wnd.fixMaximize(f)},hide:function(f,i,h,e,g){var j=X.util.getTargetWindow(i);Ext.get(e).dom.value="true";if(window.frameElement&&j!==window){f=j.X[g]}if(h){f.body.first().dom.src="about:blank";f.x_iframe_url="about:blank"}f.hide()},fixMaximize:function(e){if(e.maximized){var g=X.util.getTargetWindow(e.box_property_target);var f=g.window.Ext.getBody().getViewSize();e.setSize(f.width,f.height);e.setPosition(0,0)}},updateIFrameNode:function(e,f){var g=false;if(e&&e.x_iframe){if(f&&e.x_iframe_url!==f){e.x_iframe_url=f;g=true}if(!e.x_iframe_loaded){window.setTimeout(function(){if(e.body){e.x_iframe_loaded=true;e.body.dom.innerHTML=a(e.x_iframe_url,e.x_iframe_name)}},0)}else{if(g){e.body.first().dom.src=e.x_iframe_url}}}},confirmFormModified:function(e){if(X.util.isPageStateChanged()){Ext.MessageBox.show({title:X.wnd.formModifiedConfirmTitle,msg:X.wnd.formModifiedConfirmMsg,buttons:Ext.MessageBox.OKCANCEL,icon:"ext-mb-warning",fn:function(f){if(f=="cancel"){return false}else{e.apply(window,arguments)}}})}else{e.apply(window,arguments)}},extWindowIFrameFormModifiedConfirm:function(f,g){var e=X.wnd.getIFrameWindowObject(f);if(e.X){e.X.wnd.confirmFormModified(g)}else{f.box_hide()}},getIFrameWindowObject:function(f){if(window.frameElement&&f.box_property_show_in_parent){f=parent.X[f.box_property_guid]}var e=Ext.query("iframe",f.body.dom);if(e.length===0){return window}else{return e[0].contentWindow}},getActiveWindow:function(){var f=parent.window;var e=parent.X.window_default_group.getActive();if(e.box_property_window){f=e.box_property_window;e=e.box_property_ext_window}return[e,f]},writeBackValue:function(){var h=X.wnd.getActiveWindow();var f=h[0]["box_property_save_state_control_client_ids"];var g=Math.min(f.length,arguments.length);for(var e=0;e<g;e++){h[1].Ext.getCmp(f[e]).setValue(arguments[e])}}}})();Ext.override(Ext.Component,{x_setDisabled:function(){this.setDisabled(!this.x_state.Enabled)},x_setVisible:function(){this.setVisible(!this.x_state.Hidden)}});Ext.override(Ext.Panel,{isValid:function(){var b=true;var a=null;this.items.each(function(d){if(d.isXType("field")){if(!d.validate()){b=false;if(a==null){a=d}}}else{if(d.items){var c=this.isValid(d);if(!c[0]){b=false;if(a==null){a=c[1]}}}}});return[b,a]},x_setCollapse:function(){var a=this.x_state.Collapsed;if(a){this.collapse(true)}else{this.expand(true)}},x_setTitle:function(){this.setTitle(this.x_state.Title)}});if(Ext.form.Field){Ext.override(Ext.form.Field,{initComponent:Ext.form.Field.prototype.initComponent.createSequence(function(){this.enableBubble("change")}),hide:function(){Ext.form.Field.superclass.hide.call(this);var a=this.el.findParentNode("div[class*=x-form-item]",10,true);if(a){if(this.hideMode=="display"){a.setVisibilityMode(Ext.Element.DISPLAY)}else{a.setVisibilityMode(Ext.Element.VISIBILITY)}a.hide()}},show:function(){Ext.form.Field.superclass.show.call(this);var a=this.el.findParentNode("div[class*=x-form-item]",10,true);if(a){if(this.hideMode=="display"){a.setVisibilityMode(Ext.Element.DISPLAY)}else{a.setVisibilityMode(Ext.Element.VISIBILITY)}a.show()}},x_setValue:function(){this.setValue(this.x_state.Text)}})}if(Ext.form.Checkbox){Ext.override(Ext.form.Checkbox,{x_setValue:function(){this.setValue(this.x_state.Checked)}})}if(Ext.form.Radio){Ext.override(Ext.form.Radio,{x_setValue:function(){this.setValue(this.x_state.Checked)}})}if(Ext.form.RadioGroup){Ext.override(Ext.form.RadioGroup,{x_setValue:function(a){if(typeof(a)==="undefined"){a=this.x_state.SelectedValue}this.setValue(a)}})}if(Ext.form.CheckboxGroup){Ext.override(Ext.form.CheckboxGroup,{x_reloadData:function(c,a){var b=this.ownerCt;var d=Ext.apply(this.initialConfig,{x_state:this.x_state,items:X.util.resolveCheckBoxGroup(c,this.x_state)});if(b){var e=b.items.indexOf(this);b.remove(this,true);if(a){b.insert(e,new Ext.form.RadioGroup(d))}else{b.insert(e,new Ext.form.CheckboxGroup(d))}b.doLayout()}else{this.destroy();if(a){new Ext.form.RadioGroup(d)}else{new Ext.form.CheckboxGroup(d)}}},x_toBeDeleted:function(){var a=this.items.items[0];if(a&&a.inputValue==="tobedeleted"){a.destroy();this.items.remove(a)}},x_setValue:function(c){var a=c||this.x_state.SelectedValueArray;var b=[];this.eachItem(function(d){if(a.indexOf(d.getRawValue())===-1){b.push(false)}else{b.push(true)}});this.setValue(b)}})}if(Ext.form.ComboBox){Ext.override(Ext.form.ComboBox,{mode:"local",triggerAction:"all",forceSelection:true,editable:true,displayField:"text",valueField:"value",tpl:'<tpl for="."><div class="x-combo-list-item <tpl if="!enabled">x-combo-list-item-disable</tpl>">{prefix}{text}</div></tpl>',x_setValue:function(a){if(typeof(a)==="undefined"){a=this.x_state.SelectedValue}this.setValue(a)},x_loadData:function(a){a=a||this.x_state.X_Items;if(a){this.store.loadData(X.simulateTree.transform(a))}}})}if(Ext.Button){Ext.override(Ext.Button,{x_setTooltip:function(){this.setTooltip(this.x_state.ToolTip)},x_toggle:function(){this.toggle(this.x_state.Pressed)},x_setText:function(){this.setText(this.x_state.Text)}})}if(Ext.grid.GridPanel){Ext.override(Ext.grid.GridPanel,{x_getData:function(){var b=this.x_state.X_Rows["Values"];var d=this.x_tpls;if(typeof(d)==="undefined"){d=this.x_getTpls()}var a={};var c=document.createElement("div");c.innerHTML=d;Ext.each(c.childNodes,function(f,e){a[f.id]=f.outerHTML});Ext.each(b,function(e,f){Ext.each(e,function(i,h){if(i.substr(0,7)==="#@TPL@#"){var g=i.substr(7);e[h]='<div id="'+g+'_container">'+a[g]+"</div>"}})});return b},x_getTpls:function(){var a=Ext.get(this.id+"_tpls");tpls=a.dom.innerHTML;a.remove();return tpls},x_updateTpls:function(b){if(typeof(b)=="undefined"){b=this.x_getTpls()}var a=document.createElement("div");a.innerHTML=b;Ext.each(a.childNodes,function(d,c){var e=d.id;Ext.get(e+"_container").dom.innerHTML=d.outerHTML})},x_loadData:function(){var a=this.x_getData();var d=this.getBottomToolbar();if(d){var c=[];for(var b=d.x_startRowIndex;b<=d.x_endRowIndex;b++){c.push(a[b])}this.getStore().loadData(c)}else{this.getStore().loadData(a)}},x_expandAllRows:function(){for(var a=0,b=this.store.getCount();a<b;a++){this.plugins[0].expandRow(a)}},x_enableTextSelection:function(){if(Ext.isIE){var b=Ext.DomQuery.select("div[unselectable=on]",this.el.dom);for(var c=0,a=b.length;c<a;c++){Ext.get(b[c]).set({unselectable:"off"})}}},x_selectRows:function(a){a=a||this.x_state.SelectedRowIndexArray||[];this.getSelectionModel().selectRows(a)},x_getSelectedRows:function(){var c=this.getSelectionModel().getSelections();var a=this.getStore();var b=[];Ext.each(c,function(d,e){b.push(a.indexOfId(d.id))});return b},x_getHiddenColumns:function(){var c=[],a=this.getColumnModel(),b=a.config;Ext.each(b,function(e,d){if(a.isHidden(d)){c.push(d)}});return c},x_hiddenColumns:function(c){c=c||this.x_state.HiddenColumnIndexArray||[];var a=this.getColumnModel(),b=a.config;Ext.each(b,function(e,d){if(c.indexOf(d)!==-1){a.setHidden(d,true)}else{a.setHidden(d,false)}})},x_setSortIcon:function(c,e){var b=Ext.get(this.id),a=this.x_getColumns();function d(f){if(typeof(f)==="number"){return b.select(".x-grid3-hd-row .x-grid3-cell.x-grid3-td-"+a[f].id)}else{return b.select(".x-grid3-hd-row .x-grid3-cell.x-grid3-hd")}}d().removeClass(["sort-asc","sort-desc"]);Ext.each(a,function(g,f){if(g.x_serverSortable){d(f).addClass("cursor-pointer")}});if(c>=0&&c<a.length){d(c).addClass("sort-"+e.toLowerCase())}},x_getColumns:function(){var b=[];var a=this.getColumnModel().config;Ext.each(a,function(d,c){if(d.id!=="numberer"&&d.id!=="checker"){b.push(d)}});return b},x_setRowStates:function(b){var d=Ext.get(this.id),c=this.x_getColumns(),b=b||this.x_state.X_States||[];function e(h,f){var g=d.select(".x-grid3-body .x-grid3-row .x-grid3-td-"+c[h].id+" .box-grid-checkbox");g.each(function(k,j,i){if(b[i][f]){if(k.hasClass("box-grid-checkbox-unchecked-disabled")){k.removeClass("box-grid-checkbox-unchecked-disabled")}else{k.removeClass("box-grid-checkbox-unchecked")}}else{if(k.hasClass("box-grid-checkbox-disabled")){k.addClass("box-grid-checkbox-unchecked-disabled")}else{k.addClass("box-grid-checkbox-unchecked")}}})}var a=0;Ext.each(c,function(g,f){if(g.x_persistState){if(g.x_persistStateType==="checkbox"){e(f,a);a++}}})},x_getRowStates:function(){var c=Ext.get(this.id),b=this.x_getColumns(),a=[];function d(g){var f=c.select(".x-grid3-body .x-grid3-row .x-grid3-td-"+b[g].id+" .box-grid-checkbox");var e=[];f.each(function(i,h){if(i.hasClass("box-grid-checkbox-unchecked")||i.hasClass("box-grid-checkbox-unchecked-disabled")){e.push(false)}else{e.push(true)}});return e}Ext.each(b,function(f,e){if(f.x_persistState){if(f.x_persistStateType==="checkbox"){a.push(d(e))}}});return a}})}if(Ext.tree.TreePanel){Ext.override(Ext.tree.TreePanel,{x_loadData:function(){var a=this.x_state.X_Nodes;var c=this.x_tranformData(a);var b=this.getRootNode();if(b){b.removeAll()}this.setRootNode(new Ext.tree.AsyncTreeNode({id:this.id+"_root",children:c}))},x_tranformData:function(a){var f=this,c=0,b=[];for(var c=0;c<a.length;c++){var g=a[c],e={};e.text=g[0];e.leaf=!!g[1];e.id=g[2];e.disabled=!g[3];if(!!g[4]){e.checked=!!g[5]}if(!g[1]){e.expanded=!!g[6]}if(g[9]){e.href=g[9];e.hrefTarget=g[8]}if(g[12]){e.icon=g[12]}e.qtip=g[13];e.singleClickExpand=!!g[14];e.listeners={};if(!g[3]){e.listeners.beforeclick=function(){return false}}if(!!g[4]&&!!g[17]){e.listeners.checkchange=function(j,i){var h="Check$"+j.id+"$"+i;__doPostBack(f.name,h)}}var d="";if(g[15]){d+=g[15]+";"}if(!!g[16]){d+="__doPostBack('"+f.name+"', 'Command$"+e.id+"$"+g[18]+"$"+g[19]+"');"}if(d){e.listeners.click=new Function("node",d)}if(g[20]&&g[20].length>0){e.children=f.x_tranformData(g[20])}b.push(e)}return b},x_getExpandedNodes:function(a){var c=0,e=this,b=[];for(;c<a.length;c++){var d=a[c];if(d.isExpanded()){b.push(d.id)}if(d.hasChildNodes()){b=b.concat(e.x_getExpandedNodes(d.childNodes))}}return b},x_getCheckedNodes:function(){return this.getChecked("id")},x_getSelectedNodes:function(){var b=this.getSelectionModel(),a=[];if(b.constructor===Ext.tree.MultiSelectionModel){Ext.each(b.getSelectedNodes(),function(e,d){a.push(e.id)})}else{var c=b.getSelectedNode();if(c){a.push(c.id)}}return a},x_selectNodes:function(){var a=this.x_state.SelectedNodeIDArray||[];var b=this.getSelectionModel(),c=0;for(var c=0;c<a.length;c++){b.select(this.getNodeById(a[c]),null,true)}}})}if(Ext.PagingToolbar){Ext.override(Ext.PagingToolbar,{x_hideRefresh:function(){var a=this.items.indexOf(this.refresh);this.items.get(a-1).hide();this.refresh.hide()}})}if(Ext.TabPanel){Ext.override(Ext.TabPanel,{x_autoPostBackTabsContains:function(a){var b=this.x_state.X_AutoPostBackTabs;return b.indexOf(a)!==-1},x_setActiveTab:function(){var a=this.x_state.ActiveTabIndex;this.setActiveTab(a)},x_getActiveTabIndex:function(){return this.items.indexOf(this.getActiveTab())},activateNextTab:function(b){if(b==this.activeTab){var a=this.stack.next();if(a){this.setActiveTab(a)}if(a=this.items.find(function(c){return c.tabEl.style.display!=="none"})){this.setActiveTab(a)}else{this.setActiveTab(null)}}},hideTab:function(a){a=this.getComponent(a);this.hideTabStripItem(a);a.hide();this.activateNextTab(a)},showTab:function(a){a=this.getComponent(a);this.unhideTabStripItem(a)},addTab:function(f,b,e,d){var a={};if(typeof(f)==="string"){Ext.apply(a,{id:f,title:e,closable:d,url:b})}else{Ext.apply(a,f)}Ext.apply(a,{x_dynamic_added_tab:true,html:'<iframe id="'+a.id+'" name="'+a.id+'" src="'+a.url+'" frameborder="0" style="height:100%;width:100%;overflow:auto;"></iframe>'});var c=this.add(a);this.activate(c);return c},getTab:function(a){return this.getItem(a)},removeTab:function(a){this.remove(a)}})}var originalIsValidHandleChild=Ext.dd.DragDrop.prototype.isValidHandleChild;Ext.dd.DragDrop.prototype.isValidHandleChild=function(a){if(!a||!a.nodeName){return false}return originalIsValidHandleChild.apply(this,[a])};if(Ext.grid.GridPanel){Ext.grid.GridView.prototype.focusCell=function(d,b,c){this.syncFocusEl(this.ensureVisible(d,b,c));var a=this.focusEl;a.focus()}}(function(){function c(h,j,f){if(j>0){for(var g=f-1;g>=0;g--){if(h[g]==j-1){return g}}}return -1}function d(h,j,f){if(f<h.length-1){for(var g=f+1;g<h.length;g++){if(h[g]==j){return true}else{if(h[g]<j){return false}}}}return false}function a(g,f,j){for(var h=0;h<j-1;h++){f=g[f.parentIndex]}return f}function e(g,f,i){if(i===1){if(f.littleBrother){return'<div class="x-elbow"></div>'}else{return'<div class="x-elbow-end"></div>'}}else{var h=a(g,f,i);if(h.littleBrother){return'<div class="x-elbow-line"></div>'}else{return'<div class="x-elbow-empty"></div>'}}return""}function b(h,g){var f=h[g];var l=f.level;var k=[];for(var j=l;j>0;j--){k.push(e(h,f,j))}return k.join("")}X.simulateTree={transform:function(f){if(!f.length||f[0].length<4){return f}var i=[];Ext.each(f,function(k,j){i.push(k[3])});var g=[];Ext.each(i,function(k,j){g.push({level:k,parentIndex:c(i,k,j),littleBrother:d(i,k,j)})});var h=[];Ext.each(f,function(k,j){h.push([k[0],k[1],k[2],b(g,j)])});return h}}})();