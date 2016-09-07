var SKYWAY_KEY='9a496dd9-0f6e-48ce-b8b5-7037607a9bf0';
var ROOM_NAME='TEST';

var msg=document.getElementById('msg');
var messages=document.getElementById('messages');

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
	messages.innerHTML='<li><small>'+getTime()+'</small><br><b>'+peerdata.data+'<b></li>'+messages.innerHTML;
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