$(document).ready(function(){
$("#btngenerate").on("click",function(){
var generateurl = $("#generateurl").val(),
generatelink = $("#generatelink"),		
generateloading = $("#generateloading"),		
resulturl = $('#resulturl');			
if (generateurl == "") {
$("#generateurl").focus();
return false;
}
$("#copytoclipboard").html("<span class='fa fa-floppy-o'></span> انسخ الرابط");
generateloading.removeClass('hidden');
generatelink.addClass('hidden');
$.ajax({
url : '/feeds/posts/summary?alt=json-in-script',
type: 'get',
dataType: 'jsonp',
success: function(data) {
var link = '',
content = data.feed.entry,
links =new Array();	
if (content !== undefined) {
for (var i = 0; i < content.length; i++) {
for (var j = 0; j < content[i].link.length; j++) {
if (content[i].link[j].rel == "alternate") {
link = content[i].link[j].href;
break;
}
}
links[i] = link;
var randindex = Math.random() * links.length; 
randindex = parseInt(randindex);
}
resultgenerate = links[randindex] + "#?o=" + aesCrypto.encrypt(convertstr(generateurl),convertstr('root'));
generateloading.addClass('hidden');
generatelink.removeClass('hidden');
resulturl.val(resultgenerate);
}else {
resulturl.val('ليست هناك نتيجة!');
}
},
error: function() {
resulturl.val('فشل انتقال !');
}
});
});

var clipboard = new ClipboardJS('.copytoclipboard');
clipboard.on('success', function(e) {
$("#copytoclipboard").html("<span class='fa fa-check'></span> تم نسخ الرابط في الحافضة");
});	

})
//]]>
</b:if>
<b:if cond='data:view.isPost'>
//<![CDATA[

$(document).ready(function(){

$.urlParam = function(name){
var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
if (results==null){
return null;
}
else{
return decodeURI(results[1]) || 0;
}
}		

var getlink = $("#getlink"),
gotolink = $("#gotolink"),
timer = $('#timer');

if ($.urlParam('o') != null){
timer.pietimer({
timerSeconds: 5,
color: '#03a9f4',
fill: false,
showPercentage: true,
callback: function() {
getlink.prop('disabled',false);						
getlink.removeClass('hidden');
timer.addClass('hidden');
}
});				
}
function gotolinkcountdown(){
var countDown = 3;
gotolink.removeClass('hidden');
var x = setInterval(function() {
var distance = countDown -= 1;
gotolink.html('<i class="material-icons">autorenew</i></br> المرجو انتضار...');
if (distance < 0) {
clearInterval(x);
gotolink.prop('disabled',false);
gotolink.html('<i class="material-icons">open_in_new</i></br> انتقال الى الرابط');
}
}, 1000);
}				
var request = false;
getlink.click(function() {
if (request == false) {
gotolinkcountdown();
request = true;		
}
$('html, body').animate({
scrollTop: eval(gotolink.offset().top - 10)
}, 100);
});	
gotolink.on("click",function(){
var realurl = aesCrypto.decrypt(convertstr($.urlParam('o')),convertstr('root'));
window.location.href=realurl;
});					
fuckAdBlock.on(true, function() {
$("#adbs").html("Adblock Detected");
$("#adb").removeClass('hidden');
}).on(false, function() {
});
