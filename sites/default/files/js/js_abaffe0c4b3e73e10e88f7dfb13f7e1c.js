// $Id: click_heatmap.js,v 1.1.2.1 2009/09/28 07:09:58 boombatower Exp $

/**
 * If inside the ClickHeat iframe then remove admin menu.
 */
Drupal.behaviors.click_heatmap = function()) {
  if (window.location.href != parent.location.href) {
    $('#admin-menu').remove();
  }
}
;
/** Code by www.labsmedia.com */var clickHeatGroup="";var clickHeatSite="";var clickHeatServer="";var clickHeatLastIframe=-1;var clickHeatTime=0;var clickHeatQuota=-1;var clickHeatBrowser="";var clickHeatDocument="";var clickHeatWait=500;var clickHeatLocalWait=0;var clickHeatDebug=(window.location.href.search(/debugclickheat/)!=-1);function showClickHeatDebug(a){if(clickHeatDebug==true){document.getElementById("clickHeatDebuggerSpan").innerHTML=a;document.getElementById("clickHeatDebuggerDiv").style.display="block"}}function catchClickHeat(l){try{showClickHeatDebug("Gathering click data...");if(clickHeatQuota==0){showClickHeatDebug("Click not logged: quota reached");return true}if(clickHeatGroup==""){showClickHeatDebug("Click not logged: group name empty (clickHeatGroup)");return true}if(l==undefined){l=window.event;c=l.button;element=l.srcElement}else{c=l.which;element=null}if(c==0){showClickHeatDebug("Click not logged: no button pressed");return true}if(element!=null&&element.tagName.toLowerCase()=="iframe"){if(element.sourceIndex==clickHeatLastIframe){showClickHeatDebug("Click not logged: same iframe (a click on iframe opens a popup and popup is closed => iframe gets the focus again)");
return true}clickHeatLastIframe=element.sourceIndex}else{clickHeatLastIframe=-1}var o=l.clientX;var n=l.clientY;var p=clickHeatDocument.clientWidth!=undefined?clickHeatDocument.clientWidth:window.innerWidth;var k=clickHeatDocument.clientHeight!=undefined?clickHeatDocument.clientHeight:window.innerHeight;var j=window.pageXOffset==undefined?clickHeatDocument.scrollLeft:window.pageXOffset;var g=window.pageYOffset==undefined?clickHeatDocument.scrollTop:window.pageYOffset;if(o>p||n>k){showClickHeatDebug("Click not logged: out of document (should be a click on scrollbars)");return true}clickTime=new Date();if(clickTime.getTime()-clickHeatTime<1000){showClickHeatDebug("Click not logged: at least 1 second between clicks");return true}clickHeatTime=clickTime.getTime();if(clickHeatQuota>0){clickHeatQuota=clickHeatQuota-1}params="s="+clickHeatSite+"&g="+clickHeatGroup+"&x="+(o+j)+"&y="+(n+g)+"&w="+p+"&b="+clickHeatBrowser+"&c="+c+"&random="+Date();showClickHeatDebug("Ready to send click data...");
var m=false;if(clickHeatServer.substring(0,4)!="http"){var d=false;try{d=new ActiveXObject("Msxml2.XMLHTTP")}catch(r){try{d=new ActiveXObject("Microsoft.XMLHTTP")}catch(a){d=null}}if(!d&&typeof XMLHttpRequest!=undefined){d=new XMLHttpRequest()}if(d){if(clickHeatDebug==true){d.onreadystatechange=function(){if(d.readyState==4){if(d.status==200){showClickHeatDebug("Click recorded at "+clickHeatServer+" with the following parameters:<br />x = "+(o+j)+" ("+o+"px from left + "+j+"px of horizontal scrolling)<br />y = "+(n+g)+" ("+n+"px from top + "+g+"px of vertical scrolling)<br />width = "+p+"<br />browser = "+clickHeatBrowser+"<br />click = "+c+"<br />site = "+clickHeatSite+"<br />group = "+clickHeatGroup+"<br /><br />Server answer: "+d.responseText)}else{if(d.status==404){showClickHeatDebug("click.php was not found at: "+(clickHeatServer!=""?clickHeatServer:"/clickheat/click.php")+" please set clickHeatServer value")}else{showClickHeatDebug("click.php returned a status code "+d.status+" with the following error: "+d.responseText)
}}clickHeatLocalWait=0}}}d.open("GET",clickHeatServer+"?"+params,true);d.setRequestHeader("Connection","close");d.send(null);m=true}}if(m==false){if(clickHeatDebug==true){showClickHeatDebug("Click recorded at "+clickHeatServer+" with the following parameters:<br />x = "+(o+j)+" ("+o+"px from left + "+j+"px of horizontal scrolling)<br />y = "+(n+g)+" ("+n+"px from top + "+g+"px of vertical scrolling)<br />width = "+p+"<br />browser = "+clickHeatBrowser+"<br />click = "+c+"<br />site = "+clickHeatSite+"<br />group = "+clickHeatGroup+'<br /><br />Server answer:<br /><iframe src="'+clickHeatServer+"?"+params+'" width="700" height="60"></iframe>')}else{var q=new Image();q.src=clickHeatServer+"?"+params}}var b=new Date();clickHeatLocalWait=b.getTime()+clickHeatWait;while(clickHeatLocalWait>b.getTime()){b=new Date()}}catch(f){showClickHeatDebug("An error occurred while processing click (Javascript error): "+l.message)}return true}function initClickHeat(){if(clickHeatDebug==true){document.write('<div id="clickHeatDebuggerDiv" style="padding:5px; display:none; position:absolute; top:10px; left:10px; border:1px solid #888; background-color:#eee; z-index:99;"><strong>ClickHeat debug: <a href="#" onmouseover="document.getElementById(\'clickHeatDebuggerDiv\').style.display = \'none\'; return false">Rollover to close</a></strong><br /><br /><span id="clickHeatDebuggerSpan"></span></div>')
}if(clickHeatGroup==""||clickHeatServer==""){showClickHeatDebug("ClickHeat NOT initialised: either clickHeatGroup or clickHeatServer is empty");return false}domain=window.location.href.match(/http:\/\/[^/]+\//);if(domain!=null&&clickHeatServer.substring(0,domain[0].length)==domain[0]){clickHeatServer=clickHeatServer.substring(domain[0].length-1,clickHeatServer.length)}if(document.addEventListener){document.addEventListener("mousedown",catchClickHeat,false)}else{if(document.attachEvent){document.attachEvent("onmousedown",catchClickHeat)}}iFrames=document.getElementsByTagName("iframe");for(i=0;i<iFrames.length;i++){if(document.addEventListener){iFrames[i].addEventListener("focus",catchClickHeat,false)}else{if(document.attachEvent){iFrames[i].attachEvent("onfocus",catchClickHeat)}}}clickHeatDocument=(document.documentElement!=undefined&&document.documentElement.clientHeight!=0)?document.documentElement:document.body;var a=navigator.userAgent!=undefined?navigator.userAgent.toLowerCase().replace(/-/g,""):"";
clickHeatBrowser=a.replace(/iceweasel/,"firefox").replace(/^.*(firefox|kmeleon|safari|msie|opera).*$/,"$1");if(a==clickHeatBrowser||clickHeatBrowser==""){clickHeatBrowser="unknown"}showClickHeatDebug("ClickHeat initialised with:<br />site = "+clickHeatSite+"<br />group = "+clickHeatGroup+"<br />server = "+clickHeatServer+"<br />quota = "+(clickHeatQuota==-1?"unlimited":clickHeatQuota)+"<br /><br />browser = "+clickHeatBrowser)};;
// $Id: googleanalytics.js,v 1.3.2.8 2009/03/04 07:25:47 hass Exp $

Drupal.behaviors.gaTrackerAttach = function(context) {

  // Attach onclick event to all links.
  $('a', context).click( function() {
    var ga = Drupal.settings.googleanalytics;
    // Expression to check for absolute internal links.
    var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
    // Expression to check for special links like gotwo.module /go/* links.
    var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
    // Expression to check for download links.
    var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");

    try {
      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for download tracking?
        if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          pageTracker._trackEvent("Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, ''));
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          pageTracker._trackPageview(this.href.replace(isInternal, ''));
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^=mailto:]")) {
          // Mailto link clicked.
          pageTracker._trackEvent("Mails", "Click", this.href.substring(7));
        }
        else if (ga.trackOutgoing) {
          // External link clicked.
          pageTracker._trackEvent("Outgoing links", "Click", this.href);
        }
      }
    } catch(err) {}
  });
}
;
