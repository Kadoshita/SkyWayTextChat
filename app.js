var SKYWAY_KEY='6e837f61-b5f8-4a01-aae5-bb21c54ca930';
var ROOM_NAME='TEST';

var msg=document.getElementById('msg');
var messages=document.getElementById('messages');
var come = document.getElementById('come');
var myvideo=document.getElementById('myvideo');

var localStream;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;
var i=0;

var isView=false;

setmode();
startVideo();
come.style.height=window.outerHeight+'px';
myvideo.style.height=window.outerHeight+'px';
myvideo.style.width=window.outerWidth+'px';

// MultiParty インスタンスを生成
multiparty = new MultiParty( {
	'key':SKYWAY_KEY,
	room:ROOM_NAME,
	video:false,
	audio:false,
	debug:0
});

multiparty.on('open',function(myid){
	console.log('connected');
});
multiparty.on('message', function(peerdata) {
	if(isView===true){
		console.log(peerdata.data);
		addcome(i,peerdata.data);
		i++;
	}
	else{
		messages.innerHTML='<li><small>'+getTime()+'</small><br><b>'+
			peerdata.data+'<b></li>'+messages.innerHTML;
	}
});
// サーバとpeerに接続
multiparty.start();

function send(){
	if(check()===true){
		console.log(msg.value);
		multiparty.send(msg.value);
		messages.innerHTML='<li><small>'+getTime()+'</small><br><small>ME:'+msg.value+'</small></li>'+messages.innerHTML;
		msg.value='';
	}
}
function check() {
	if(msg.value===''){
		alert('メッセージを入力してください');
		return false;
	}
	else{
		return  true;
	}
}
function getTime() {
	var date=new Date();
	var time=date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	return time;
}
function setmode(){
	var url = document.location.href;
	var args = url.split('?');
	if (args.length > 1) {
		var mode = args[1];
		if (mode != ""){
			document.getElementById('send').style.display='none';
			isView=true;
			return;
		}
	}
	document.getElementById('view').style.display='none';
	return;
}

function addcome(count,str){
	$('#come').append('<marquee id=\'come'+count+'\''+
		' loop=\'1\' scrolldelay=\'20\' scrollamount=\'8\' style=\'color:#fff;position: absolute;top:'+
		getrand()+'px;z-index:10;text-shadow: 2px 2px 1px #000;\'>'+str+'</marquee>');
}

function getrand() {
	var rand=Math.floor(Math.random()*480);
	console.log(rand);
	return rand;
}

function startVideo() {
	navigator.getUserMedia({video: true, audio: false}, 
		function(stream){
			console.log(stream);
			myvideo.src = window.URL.createObjectURL(stream);
		},
		function(err){
			console.log(err);
		}
	);
}