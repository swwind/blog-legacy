$(document).ready(function(Z){var a4=document.getElementById("canvas");var V=a4.getContext("2d");var ab=$("#canvas");var F=ab.css("cursor");var P=600,X=600,l=0,k=0,O=0,M=0;var D=O;var j=M;var U=P/2;var aR=X/2;var aH=[U,aR];var u=0;var a1=1;var az=30;var E=a1;var aP="";var aB=20;var aJ=aB/2;var r=true,aS=false,a2=false,ao=false,a0=false,d=false,ak=false;var Q="20px";var ap=1;var aQ=[];var S=[];var ac=[];var aM=[];var al=[];var aO=[];var aL=[];var aG=[];var ax=[];var an=[];var aT=[];var at=[];var K=[];var T=[];var ai=[];var aq=[];var aj=[];var R=0;var af=0.2;var ah=0,ag=0;var aV=2;var aC=-7;var aA=0;var ay=0;var av=0;var ae=0;var b=0;var aY=0.2;var am=1;var o=Math.PI/2;var n=false;var aX=false;var ad=true;var N=false;var Y=false;var aZ=10;var aK=true;var g=false;var ar="#fcfcfc";var I="#999";var aW="#999";var G="#999";var aF="#fcfcfc";var B=100,z=100,C=60,J=30,f=85,aU=40;var q=z;var L=B;var aI=0;var aD=[];a4.width=P;a4.height=X;V.fillStyle="#000";V.fillRect(0,0,P,X);function H(){V.fillStyle="#fcfcfc";V.fillRect(0,0,P,X);if(r){aN()}if(d){aa()}if(a2){A()}if(ao){au()}if(a0){aw()}if(N){s()}if(aS){t()}if(ak){p()}if(ad){window.requestAnimationFrame(H)}}ab.mousemove(function(a){l=a.pageX-ab.offset().left-parseInt(ab.css("border-left-width"));k=a.pageY-ab.offset().top-parseInt(ab.css("border-top-width"));aE()});function aE(){if(r){if(l>=250&&l<=350&&k>=288&&k<=318){Q="22px";ab.css("cursor","pointer")}else{if(l>=270&&l<=330&&k>=362&&k<=386){ab.css("cursor","pointer");ar="#000"}else{Q="20px";ar="#fcfcfc";ab.css("cursor",F)}}}if(d&&aD.length){if(l>=270&&l<=330&&k>=482&&k<=506){aF="#000";ab.css("cursor","pointer")}else{aF="#fcfcfc";for(var a=0;a<az;a++){if(l>=aD[a].x&&l<=aD[a].x+C&&k>=aD[a].y&&k<=aD[a].y+J){aD[a].c="#000";ab.css("cursor","pointer");break}else{aD[a].c="#fcfcfc";ab.css("cursor",F)}}}}if(a2){if(l>=560&&l<=590&&k>=10&&k<=35){I="#bbb";ab.css("cursor","pointer")}else{if(l>=520&&l<=540&&k>=12&&k<=32){aW="#bbb";ab.css("cursor","pointer")}else{if(l>=478&&l<=502&&k>=9&&k<=37){G="#bbb";ab.css("cursor","pointer")}else{I="#999";aW="#999";G="#999";ab.css("cursor",F)}}}}if(ak){if(Math.sqrt(Math.pow(l-300,2)+Math.pow(k-300,2))<=100){ab.css("cursor","pointer")}else{ab.css("cursor",F)}}}ab.click(function(){if(r){if(l>=250&&l<=350&&k>=288&&k<=318){r=false;Q="20px";ab.css("cursor",F);aS=true}else{if(l>=270&&l<=330&&k>=362&&k<=386){r=false;Q="20px";ar="#fcfcfc";ab.css("cursor",F);d=true}}}if(d&&aD.length){for(var a=0;a<az;a++){if(l>=aD[a].x&&l<=aD[a].x+C&&k>=aD[a].y&&k<=aD[a].y+J){a1=a+1;ab.css("cursor",F);aS=true;d=false;break}}if(l>=270&&l<=330&&k>=482&&k<=506){d=false;r=true}}if(a2){if(l>=560&&l<=590&&k>=10&&k<=35){r=true;a0=false;a2=false;ao=false;a1=1;E=1}else{if(l>=520&&l<=540&&k>=12&&k<=32){m()}else{if(l>=478&&l<=502&&k>=9&&k<=37){ad=false;ak=true}}}}if(ak){if(Math.sqrt(Math.pow(l-300,2)+Math.pow(k-300,2))<=100){ad=true;ak=false;a2=true;a0=true;H()}}});function p(){a2=false;a0=false;V.fillStyle="rgba(0,0,0,.5)";V.fillRect(0,0,P,X);V.beginPath();V.fillStyle="#000";V.arc(300,300,100,0,4*o);V.closePath();V.fill();V.beginPath();V.fillStyle="#fcfcfc";V.arc(300,300,96,0,4*o);V.closePath();V.fill();V.beginPath();V.fillStyle="#000";V.moveTo(370,300);V.lineTo(250,230);V.lineTo(250,370);V.closePath();V.fill()}function aa(){V.fillStyle="#999";V.fillRect(0,0,P,X);for(var a=0;a<az;a++){if(!aD[a]){aD[a]={}}aD[a].x=B+(aI*f);aD[a].y=z;V.beginPath();V.strokeStyle=aD[a].c||"#fcfcfc";V.strokeRect(B+(aI*f),z,C,J);V.closePath();V.fillStyle=aD[a].c||"#fcfcfc";V.font="16px 微软雅黑";V.fillText(a+1,B+(aI*f)+C/2,z+J*2/3);aI++;if((a+1)%5==0&&a!=1){z+=aU;B=L;aI=0}}V.fillStyle=aF;V.font="16px 微软雅黑";V.fillText("返回",300,500);V.beginPath();V.strokeStyle=aF;V.strokeRect(270,482,60,24);V.closePath();z=q;B=L;aI=0}function aN(){V.fillStyle="#999";V.fillRect(0,0,P,X);V.font=Q+" 微软雅黑";V.fillStyle="#fcfcfc";V.textAlign="center";V.fillText("开始游戏",300,310);V.fillStyle=ar;V.font="16px 微软雅黑";V.fillText("选关",300,380);V.beginPath();V.strokeStyle="#fcfcfc";V.strokeRect(250,288,100,30);V.closePath();V.beginPath();V.strokeStyle=ar;V.strokeRect(270,362,60,24);V.closePath()}function t(){V.fillStyle="#fcfcfc";V.fillRect(0,0,P,X);if(E!=1){if(aK){u=Math.max.apply(null,aH)-aZ;aZ*=-1;aK=false}if(u<=0){aZ*=-1}u+=aZ}else{u+=aZ}V.fillStyle="#999";V.fillRect(0-u,0-u,U,aR);V.fillRect(U+u,0-u,U,aR);V.fillRect(0-u,aR+u,U,aR);V.fillRect(U+u,aR+u,U,aR);if(u>=U&&u>=aR){aK=true;u=0;m()}}function m(){aS=false;ao=true;a2=true;a0=true;aQ=[];S=[];ac=[];al=[];aM=[];an=[];aO=[];aL=[];aG=[];ax=[];aT=[];at=[];K=[];T=[];ai=[];aq=[];aj=[];ap=1;R=0;aP=a1;if(a1==0){}else{if(a1==1){aQ.push([0,500,200,100]);aQ.push([200,400,200,200]);aQ.push([400,300,200,300]);S=[560,280,aB,aB];O=20;M=400}else{if(a1==2){aQ.push([0,500,250,100]);aQ.push([350,500,250,100]);S=[500,480,aB,aB];O=100;M=400}else{if(a1==3){aQ.push([0,500,P,100]);ac.push([290,100,20,400]);at.push([240,460,40,40,12.5,true]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==4){aq.push([0,500,150,100,2]);aq.push([290,500,20,100,2]);aq.push([450,500,600,100,2]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==5){aQ.push([0,500,200,100]);aQ.push([500,300,100,10]);aO.push([200,400,40,10,0.05,5,1,false]);aO.push([300,400,40,10,0.05,5,1,false]);aO.push([400,400,40,10,0.05,5,1,false]);S=[560,280,aB,aB];O=20;M=400}else{if(a1==6){aQ.push([0,500,100,100]);aj.push([200,500,500,100]);ac.push([300,460,40,40]);ac.push([440,460,40,40]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==7){aQ.push([0,500,100,100]);aQ.push([500,400,100,10]);T.push([200,500,100,10,1.5,true]);T.push([360,500,100,10,-1.5,true]);S=[560,380,aB,aB];O=20;M=400}else{if(a1==8){aQ.push([0,500,P,100]);ac.push([200,420,40,80]);ac.push([400,420,40,80]);S=[500,480,aB,aB];O=100;M=400}else{if(a1==9){aQ.push([0,500,P,100]);ai.push([200,460,40,40,2,5,1,100,500,true]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==10){aQ.push([0,500,100,100]);aQ.push([500,500,100,100]);aq.push([200,500,150,10,4]);ac.push([350,440,30,70]);T.push([380,500,100,10,-1.5,true]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==11){aQ.push([100,0,300,X]);aQ.push([0,500,100,10]);aQ.push([400,500,200,10]);aQ.push([400,400,200,10]);K.push([80,480,aB,aB,400,480,aB,aB,true]);K.push([580,480,aB,aB,400,380,aB,aB,true]);ax.push([500,405,80,20,20,-1,o+0.8,o+1,0.06,0.002]);S=[560,380,aB,aB];O=20;M=400}else{if(a1==12){aQ.push([0,500,100,100]);aQ.push([500,500,100,100]);at.push([60,460,40,40,12,true]);aq.push([100,100,400,10,5]);ac.push([100,0,400,10]);ai.push([240,60,40,40,2,4,1,240,358,true]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==13){aQ.push([0,500,100,100]);aQ.push([500,500,100,100]);aM.push([201,400,50,10,"x",100,250,4,-1,0,1]);T.push([380,400,100,10,-1.8,true]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==14){aQ.push([0,550,50,50]);aQ.push([50,500,150,100]);aQ.push([250,500,400,200]);aQ.push([200,550,50,50]);al.push([0,260,400,200,"y",200,300,3,-1,0,1]);al.push([450,260,150,200,"y",200,300,3,-1,0,1]);al.push([400,260,50,150,"y",200,300,3,-1,0,1]);S=[560,480,aB,aB];O=20;M=520}else{if(a1==15){aQ.push([0,500,100,100]);aq.push([100,500,100,100,7]);aQ.push([200,500,100,100]);aT.push([145,-10,10,10,620,0,0,15,true]);T.push([300,500,200,10,4,true]);aQ.push([500,500,100,10]);ac.push([480,460,40,40]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==16){aQ.push([0,500,170,100]);aQ.push([300,500,200,100]);aQ.push([500,100,100,10]);at.push([460,460,40,40,12,true]);al.push([450,250,20,20,"x",400,500,3,1,0,2]);S=[560,80,aB,aB];O=20;M=400}else{if(a1==17){aQ.push([0,500,150,10]);aQ.push([280,500,100,10]);aQ.push([510,500,90,10]);aQ.push([0,200,100,10]);T.push([230,200,100,10,1,true]);aQ.push([460,200,140,10]);ax.push([270,205,240,80,80,-1,o+0.8,o+1,0.05,0.001]);K.push([580,480,aB,aB,0,180,aB,aB,true]);S=[560,180,aB,aB];O=40;M=400}else{if(a1==18){aQ.push([0,500,100,100]);aQ.push([500,500,100,100]);aM.push([201,400,50,10,"x",100,260,3,-1,0,1.5]);aM.push([301,400,50,10,"x",300,450,4,1,0,3]);S=[560,480,aB,aB];O=20;M=400}else{if(a1==19){aQ.push([0,500,100,100]);aQ.push([500,100,100,10]);aM.push([201,400,50,10,"x",100,260,3,-1,0,1.5]);aM.push([400,400,50,10,"y",200,450,4,1,0,3]);S=[560,80,aB,aB];O=20;M=400}else{if(a1==20){aQ.push([0,500,100,100]);aQ.push([200,500,50,100]);aQ.push([350,500,50,100]);aQ.push([0,200,400,20]);ac.push([120,180,60,20]);ac.push([360,140,20,60]);aM.push([500,400,50,10,"y",200,550,4,1,0,3]);al.push([140,450,20,20,"y",350,500,3,1,0,2]);al.push([290,450,20,20,"y",350,500,4,1,0,1]);S=[80,180,aB,aB];O=20;M=400}else{if(a1==21){aQ.push([0,500,P,100]);aQ.push([0,300,500,10]);aQ.push([550,400,50,10]);al.push([200,480,20,20,"x",100,300,3,1,0,3]);al.push([200,400,40,60,"x",100,300,4,1,0,4]);al.push([400,480,20,20,"x",340,500,8,1,0,3]);al.push([515,400,20,20,"y",240,440,5,1,0,3]);al.push([200,260,40,40,"x",100,460,12,1,0,1]);S=[20,280,aB,aB];O=20;M=400}else{if(a1==22){aQ.push([0,500,20,20]);aQ.push([100,400,20,20]);aQ.push([200,284,20,20]);aQ.push([300,166,20,20]);aQ.push([400,400,200,20]);ac.push([79,405,20,20]);ac.push([179,289,20,20]);ac.push([233,275,20,20]);ac.push([455,380,20,20]);ac.push([505,380,20,20]);S=[480,380,aB,aB];O=0;M=400}else{if(a1==23){aQ.push([0,300,100,10]);aQ.push([200,300,50,10]);aQ.push([350,300,50,10]);aQ.push([500,300,100,10]);ac.push([60,280,30,20]);ac.push([210,280,30,20]);ac.push([360,280,30,20]);ac.push([525,280,20,20]);ac.push([575,280,20,20]);S=[550,280,aB,aB];O=20;M=200}else{if(a1==24){aQ.push([450,580,40,20]);aQ.push([100,350,50,10]);aQ.push([250,250,50,10]);aQ.push([400,400,50,10]);aO.push([320,430,60,10,0.05,5,1,false]);aM.push([20,401,60,10,"y",200,450,5,-1,0,3]);aM.push([170,401,60,10,"y",100,450,6,-1,0,6]);aM.push([500,501,50,10,"y",450,550,2,-1,0,0.5]);ac.push([100,0,50,300]);ac.push([100,360,50,240]);ac.push([250,0,50,200]);ac.push([250,260,50,340]);ac.push([400,0,50,350]);ac.push([400,410,50,200]);ac.push([550,410,50,200]);ac.push([450,410,50,50]);S=[460,560,aB,aB];O=40;M=160}else{if(a1==25){aQ.push([0,580,P,20]);aQ.push([400,50,200,50]);ac.push([0,420,400,50]);ac.push([450,420,150,50]);ac.push([0,250,50,50]);ac.push([100,250,500,50]);ac.push([0,50,350,50]);aO.push([120,240,50,10,0.05,5,1,false]);aO.push([180,160,50,10,0.05,5,1,false]);aO.push([270,220,50,10,0.05,5,1,false]);aM.push([400,500,50,10,"y",420,520,3,1,0,0.5]);aM.push([300,380,50,10,"x",120,340,3,1,0,2]);aM.push([50,300,50,10,"y",250,380,2,1,0,0.5]);aM.push([350,120,50,10,"y",100,200,2,1,0,0.5]);aG.push([475,75,50,20,20,-1,o,0.03]);S=[560,30,aB,aB];O=100;M=540}else{if(a1==26){aQ.push([0,500,100,100]);aQ.push([0,100,500,10]);aQ.push([550,200,50,10]);aO.push([150,400,50,10,0.05,5,1,false]);aO.push([270,330,50,10,0.05,5,1,false]);aO.push([400,260,50,10,0.05,5,1,false]);aG.push([175,405,40,20,20,1,o,0.03]);aG.push([425,265,40,20,20,-1,o,0.05]);ax.push([200,0,80,40,40,-1,o+0.8,o+1,0.05,0.001]);aT.push([270,-50,50,50,700,0.1,0.5,0,true]);S=[20,80,aB,aB];O=20;M=400}else{if(a1==27){aQ.push([0,500,100,100]);aQ.push([150,480,50,10]);aQ.push([250,460,50,10]);aQ.push([350,440,50,10]);aQ.push([450,420,50,10]);aQ.push([550,400,50,10]);aQ.push([550,300,50,10]);aQ.push([550,200,50,10]);aQ.push([450,180,50,10]);aQ.push([350,160,50,10]);aQ.push([250,140,50,10]);aQ.push([150,120,50,10]);aQ.push([0,100,100,10]);aT.push([115,-20,20,20,620,0.2,0.5,1,true]);aT.push([215,-20,20,20,620,0.5,1,1,true]);aT.push([315,-20,20,20,620,1,0,0,true]);aT.push([415,-20,20,20,620,0.1,1,3,true]);aT.push([500,-20,20,20,620,0.2,0.2,3,true]);aT.push([530,-20,20,20,620,0.1,0,5,true]);S=[20,80,aB,aB];O=20;M=400}else{if(a1==28){aQ.push([250,580,100,20]);aQ.push([250,50,100,10]);aM.push([101,500,50,10,"x",100,450,2,1,0,2]);aM.push([300,400,40,10,"x",100,460,2.5,1,0,2.5]);aM.push([400,300,30,10,"x",100,470,3,-1,0,3]);aM.push([400,200,20,10,"x",100,480,4,1,0,4]);aO.push([200,100,20,10,0.05,5,1,false]);aO.push([380,100,20,10,0.05,5,1,false]);ac.push([200,480,20,20]);ac.push([380,480,20,20]);ac.push([280,380,20,20]);ac.push([180,280,20,20]);ac.push([420,280,20,20]);ac.push([100,140,60,60]);ac.push([440,140,60,60]);al.push([225,60,20,20,"y",0,100,3,1,0,0.1]);al.push([355,80,20,20,"y",0,100,2.5,-1,0,0.5]);S=[290,30,aB,aB];O=290;M=540}else{if(a1==29){aQ.push([400,500,200,100]);aQ.push([380,400,160,10]);aQ.push([360,300,180,10]);aQ.push([340,200,200,10]);aQ.push([100,100,440,10]);aQ.push([280,200,10,400]);aQ.push([530,100,10,400]);aQ.push([100,100,10,410]);aQ.push([150,200,130,10]);aQ.push([150,300,130,10]);aQ.push([150,400,130,10]);aQ.push([150,500,130,10]);aQ.push([110,450,130,10]);aQ.push([110,350,130,10]);aQ.push([110,250,130,10]);an.push([540,400,60,60,0.01,1,1]);aO.push([0,150,50,10,0.05,5,1,false]);aO.push([0,250,50,10,0.05,5,1,false]);aO.push([0,350,50,10,0.05,5,1,false]);aO.push([0,450,50,10,0.05,5,1,false]);aO.push([50,500,50,10,0.05,5,1,false]);aO.push([50,400,50,10,0.05,5,1,false]);aO.push([50,300,50,10,0.05,5,1,false]);aO.push([50,200,50,10,0.05,5,1,false]);aM.push([101,550,50,10,"x",0,200,3,1,0,2]);aT.push([170,-40,40,40,640,0.1,0.5,0,true]);ax.push([200,100,88,20,20,-1,o+0.8,o+1,0.05,0.003]);ax.push([400,0,78,40,40,1,o-0.8,o+1,0.1,0.002]);aG.push([225,455,40,10,10,1,o,0.05]);S=[560,480,aB,aB];O=440;M=440}else{if(a1==30){aQ.push([0,590,P,10]);aQ.push([0,490,500,10]);aQ.push([100,390,500,10]);aQ.push([0,290,500,10]);aQ.push([100,190,500,10]);aQ.push([0,90,500,10]);aG.push([495,495,50,10,10,1,o,0.03]);aG.push([105,395,50,10,10,-1,o,0.05]);aG.push([495,295,50,10,10,1,o,0.07]);aG.push([105,195,50,10,10,-1,o,0.09]);aG.push([495,95,50,10,10,1,o,0.11]);al.push([150,450,40,90,"y",400,500,4,1,0,0.2]);al.push([350,306,40,90,"y",300,400,5,1,0,0.2]);al.push([300,286,40,90,"y",200,300,2,1,0,1.5]);al.push([200,86,40,90,"y",0,200,8,1,0,1.5]);al.push([400,1,40,90,"y",0,100,2,1,0,1.5]);ax.push([300,0,68,40,40,-1,o+0.8,o+1,0.08,0.002]);aL.push([40,40,40,40,3,3]);S=[20,70,aB,aB];O=20;M=560}else{N=true}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}D=O;j=M}function A(){V.fillStyle="#999";for(var a=0;a<aQ.length;a++){V.fillRect(aQ[a][0],aQ[a][1],aQ[a][2],aQ[a][3])}V.fillStyle="#B9CDF6";for(var a=0;a<aq.length;a++){V.fillRect(aq[a][0],aq[a][1],aq[a][2],aq[a][3])}V.fillStyle="#222";for(var a=0;a<aj.length;a++){V.fillRect(aj[a][0],aj[a][1],aj[a][2],aj[a][3])}V.fillStyle="#999";for(var a=0;a<aO.length;a++){if(aO[a][7]){aO[a][6]-=aO[a][4]}if(aO[a][6]<-aO[a][5]){aO[a][6]=1;aO[a][7]=false}if(aO[a][6]>=0){V.fillStyle="rgba(205,198,115,"+aO[a][6]+")";V.fillRect(aO[a][0],aO[a][1],aO[a][2],aO[a][3])}}for(var a=0;a<T.length;a++){V.fillStyle="#cdb5cd";V.fillRect(T[a][0],T[a][1],T[a][2],T[a][3]);V.fillStyle="#ad85ad";if(T[a][4]>=0){if(T[a][5]){T[a][5]=false;T[a][6]=T[a][0];T[a][7]=T[a][0]+(T[a][2]/2);T[a][8]=T[a][2]/4}T[a][6]+=T[a][4];T[a][7]+=T[a][4];if(T[a][6]>=T[a][0]+(T[a][2]/2)){T[a][6]=T[a][0];T[a][7]=T[a][0]+(T[a][2]/2)}if(T[a][7]>T[a][0]+(3*T[a][2]/4)){T[a][8]=T[a][0]+T[a][2]-T[a][7];V.fillRect(T[a][0],T[a][1],(T[a][2]/4)-T[a][8],5)}else{T[a][8]=T[a][2]/4}V.fillRect(T[a][6],T[a][1],T[a][2]/4,5);V.fillRect(T[a][7],T[a][1],T[a][8],5)}else{if(T[a][5]){T[a][5]=false;T[a][6]=T[a][0]+T[a][2]/4;T[a][7]=T[a][0]+(3*T[a][2]/4);T[a][8]=T[a][2]/4}T[a][6]+=T[a][4];T[a][7]+=T[a][4];if(T[a][7]<=T[a][0]+T[a][2]/4){T[a][6]=T[a][0]+T[a][2]/4;T[a][7]=T[a][0]+(3*T[a][2]/4)}if(T[a][6]<T[a][0]){T[a][6]=T[a][0];T[a][8]+=T[a][4];V.fillRect(T[a][0]+(3*T[a][2]/4)+T[a][8],T[a][1],T[a][2]/4-T[a][8],5)}else{T[a][8]=T[a][2]/4}V.fillRect(T[a][6],T[a][1],T[a][8],5);V.fillRect(T[a][7],T[a][1],T[a][2]/4,5)}}V.fillStyle="#8ad";for(var a=0;a<at.length;a++){if(at[a][5]){at[a][5]=false;at[a][6]=at[a][3];at[a][7]=at[a][1];at[a][8]=true}V.fillRect(at[a][0],at[a][1],at[a][2],10);V.fillRect(at[a][0],at[a][1]+at[a][3]-10,at[a][2],10);V.strokeStyle="#999";V.lineWidth=2;V.lineCap="round";V.beginPath();V.moveTo(at[a][0]+5,at[a][1]+5);V.lineTo(at[a][0]+at[a][2]-5,at[a][1]+at[a][3]-5);V.stroke();V.closePath();V.beginPath();V.moveTo(at[a][0]+5,at[a][1]+at[a][3]-5);V.lineTo(at[a][0]+at[a][2]-5,at[a][1]+5);V.stroke();V.closePath()}for(var a=0;a<K.length;a++){V.lineWidth=2;V.strokeStyle="#F08080";V.strokeRect(K[a][0],K[a][1],K[a][2],K[a][3]);V.strokeRect(K[a][4],K[a][5],K[a][6],K[a][7]);V.font="14px 微软雅黑";V.fillStyle="#F08080";V.fillText(a+1,K[a][0]+10,K[a][1]+16);V.fillText(a+1,K[a][4]+10,K[a][5]+16)}V.fillStyle="#d08";for(var a=0;a<ac.length;a++){V.fillRect(ac[a][0],ac[a][1],ac[a][2],ac[a][3])}for(var a=0;a<an.length;a++){an[a][6]-=an[a][4];if(an[a][6]<-an[a][5]){an[a][6]=1}if(an[a][6]>0){V.fillRect(an[a][0],an[a][1],an[a][2],an[a][3])}}for(var a=0;a<aG.length;a++){aG[a][6]+=aG[a][7]*aG[a][5];aG[a][8]=aG[a][0]+(aG[a][2]*Math.cos(aG[a][6]))-(aG[a][3]/2);aG[a][9]=aG[a][1]+(aG[a][2]*Math.sin(aG[a][6]))-(aG[a][4]/2);V.fillRect(aG[a][8],aG[a][9],aG[a][3],aG[a][4])}for(var a=0;a<ax.length;a++){ax[a][10]=Math.abs((Math.abs(ax[a][6]-o)-Math.abs(ax[a][7]-o))*ax[a][8])/Math.abs(ax[a][7]-o);if(ax[a][10]<=ax[a][9]){ax[a][10]=ax[a][9]}if(Math.abs(ax[a][6]-o)>=Math.abs(ax[a][7]-o)){ax[a][5]*=-1}ax[a][6]+=ax[a][10]*ax[a][5];ax[a][11]=ax[a][0]+(ax[a][2]*Math.cos(ax[a][6]))-(ax[a][3]/2);ax[a][12]=ax[a][1]+(ax[a][2]*Math.sin(ax[a][6]))-(ax[a][4]/2);V.fillRect(ax[a][11],ax[a][12],ax[a][3],ax[a][4]);V.beginPath();V.strokeStyle="#999";V.lineWidth=(ax[a][3]+ax[a][4])/20;V.lineCap="round";V.moveTo(ax[a][0],ax[a][1]);V.lineTo(ax[a][0]+(ax[a][2]*Math.cos(ax[a][6])),ax[a][1]+(ax[a][2]*Math.sin(ax[a][6])));V.stroke();V.closePath()}for(var a=0;a<aL.length;a++){aL[a][0]+=aL[a][4];aL[a][1]+=aL[a][5];if(aL[a][0]<0){aL[a][0]*=-1;aL[a][4]*=-1}else{if(aL[a][0]+aL[a][2]>P){aL[a][0]=2*(P-aL[a][2])-aL[a][0];aL[a][4]*=-1}}if(aL[a][1]<0){aL[a][1]*=-1;aL[a][5]*=-1}else{if(aL[a][1]+aL[a][3]>X){aL[a][1]=2*(X-aL[a][3])-aL[a][1];aL[a][5]*=-1}}V.fillRect(aL[a][0],aL[a][1],aL[a][2],aL[a][3])}V.fillStyle="#999";for(var a=0;a<aM.length;a++){if(aM[a][4]=="x"){aM[a][9]=aM[a][7]*aM[a][8]*Math.min.apply(null,[aM[a][6]-aM[a][0],aM[a][0]-aM[a][5]])/(aM[a][6]-aM[a][5]);if(Math.abs(aM[a][9])<=aM[a][10]){aM[a][9]=aM[a][10]*aM[a][8]}if(aM[a][0]+aM[a][9]>=aM[a][6]||aM[a][0]+aM[a][9]<=aM[a][5]){aM[a][8]*=-1}aM[a][11]=aM[a][0];aM[a][0]+=aM[a][9];V.fillRect(aM[a][0],aM[a][1],aM[a][2],aM[a][3])}else{aM[a][9]=aM[a][7]*aM[a][8]*Math.min.apply(null,[aM[a][6]-aM[a][1],aM[a][1]-aM[a][5]])/(aM[a][6]-aM[a][5]);if(Math.abs(aM[a][9])<=aM[a][10]){aM[a][9]=aM[a][10]*aM[a][8]}if(aM[a][1]+aM[a][9]>=aM[a][6]||aM[a][1]+aM[a][9]<=aM[a][5]){aM[a][8]*=-1}aM[a][11]=aM[a][1];aM[a][1]+=aM[a][9];V.fillRect(aM[a][0],aM[a][1],aM[a][2],aM[a][3])}}V.fillStyle="#d08";for(var a=0;a<ai.length;a++){if(ai[a][9]){ai[a][9]=false;ai[a][10]=ai[a][1];ai[a][11]=-1*ai[a][5]}ai[a][0]+=(ai[a][4]*ai[a][6]);ai[a][11]+=af;ai[a][1]+=ai[a][11];if(ai[a][1]>=ai[a][10]){ai[a][1]=ai[a][10];ai[a][11]=-1*ai[a][5]}if(ai[a][0]<=ai[a][7]){ai[a][6]*=-1;ai[a][0]=2*ai[a][7]-ai[a][0]}else{if(ai[a][0]+ai[a][2]>=ai[a][8]){ai[a][6]*=-1;ai[a][0]=2*(ai[a][8]-ai[a][2])-ai[a][0]}}V.fillRect(ai[a][0],ai[a][1],ai[a][2],ai[a][3])}for(var a=0;a<aT.length;a++){if(aT[a][8]){aT[a][8]=false;aT[a][9]=aT[a][1];aT[a][10]=aT[a][7];aT[a][11]=aT[a][6]}aT[a][6]-=0.01;if(aT[a][6]<=0){aT[a][7]+=aT[a][5];aT[a][1]+=aT[a][7]}if(aT[a][1]+aT[a][3]>aT[a][4]){aT[a][1]=aT[a][9];aT[a][7]=aT[a][10];aT[a][6]=aT[a][11]}V.fillRect(aT[a][0],aT[a][1],aT[a][2],aT[a][3])}for(var a=0;a<al.length;a++){if(al[a][4]=="x"){al[a][9]=al[a][7]*al[a][8]*Math.min.apply(null,[al[a][6]-al[a][0],al[a][0]-al[a][5]])/(al[a][6]-al[a][5]);if(Math.abs(al[a][9])<=al[a][10]){al[a][9]=al[a][10]*al[a][8]}if(al[a][0]+al[a][9]>=al[a][6]||al[a][0]+al[a][9]<=al[a][5]){al[a][8]*=-1}al[a][11]=al[a][0];al[a][0]+=al[a][9];V.fillRect(al[a][0],al[a][1],al[a][2],al[a][3])}else{al[a][9]=al[a][7]*al[a][8]*Math.min.apply(null,[al[a][6]-al[a][1],al[a][1]-al[a][5]])/(al[a][6]-al[a][5]);if(Math.abs(al[a][9])<=al[a][10]){al[a][9]=al[a][10]*al[a][8]}if(al[a][1]+al[a][9]>=al[a][6]||al[a][1]+al[a][9]<=al[a][5]){al[a][8]*=-1}al[a][11]=al[a][1];al[a][1]+=al[a][9];V.fillRect(al[a][0],al[a][1],al[a][2],al[a][3])}}V.lineWidth=2;V.strokeStyle="#32CD32";V.strokeRect(S[0],S[1],S[2],S[3])}function au(){ap-=0.01;V.fillStyle="rgba(34,136,221,"+ap+")";V.font="30px 微软雅黑";V.textAlign="center";V.fillText("第 "+aP+" 关",300,310);if(ap<=0){ap=1;ao=false}}function aw(){aA=O;ay=M;if(ah&&!ag){O-=ah;am=-1}else{if(!ah&&ag){O+=ag;am=1}}if(O<0){O=0}else{if(O+aB>P){O=P-aB}}aX=true;g=true;for(var a=0;a<aQ.length;a++){if(aA+aB<=aQ[a][0]&&O+aB>=aQ[a][0]&&M+aB>aQ[a][1]&&M<=aQ[a][1]+aQ[a][3]){O=aQ[a][0]-aB}else{if(aA>=aQ[a][0]+aQ[a][2]&&O<=aQ[a][0]+aQ[a][2]&&M+aB>aQ[a][1]&&M<=aQ[a][1]+aQ[a][3]){O=aQ[a][0]+aQ[a][2]}}if(O+aB>aQ[a][0]&&O<aQ[a][2]+aQ[a][0]&&parseInt(M+aB)<=aQ[a][1]&&parseInt(M+aB+R)>=aQ[a][1]){R=0;M=aQ[a][1]-aB}else{if(O+aB>aQ[a][0]&&O<aQ[a][2]+aQ[a][0]&&parseInt(M)>aQ[a][1]+aQ[a][3]&&parseInt(M+R)<=aQ[a][1]+aQ[a][3]){R=0;M=aQ[a][1]+aQ[a][3]}}if(M==aQ[a][1]-aB&&R!=aC){if(O+aB<=aQ[a][0]||O>=aQ[a][2]+aQ[a][0]){aX=true}else{R=0;aX=false;if(n){R=aC}}}if(!aX){g=false}}for(var a=0;a<aj.length;a++){if(aA+aB<=aj[a][0]&&O+aB>=aj[a][0]&&M+aB>aj[a][1]&&M<=aj[a][1]+aj[a][3]){O=aj[a][0]-aB}else{if(aA>=aj[a][0]+aj[a][2]&&O<=aj[a][0]+aj[a][2]&&M+aB>aj[a][1]&&M<=aj[a][1]+aj[a][3]){O=aj[a][0]+aj[a][2]}}if(O+aB>aj[a][0]&&O<aj[a][2]+aj[a][0]&&parseInt(M+aB)<=aj[a][1]&&parseInt(M+aB+R)>=aj[a][1]){R=0;M=aj[a][1]-aB}else{if(O+aB>aj[a][0]&&O<aj[a][2]+aj[a][0]&&parseInt(M)>aj[a][1]+aj[a][3]&&parseInt(M+R)<=aj[a][1]+aj[a][3]){R=0;M=aj[a][1]+aj[a][3]}}if(M==aj[a][1]-aB&&R!=aC){if(O+aB<=aj[a][0]||O>=aj[a][2]+aj[a][0]){aX=true}else{R=0;aX=false;if(n){R=aC}O=aA}}if(!aX){g=false}}for(var a=0;a<aq.length;a++){if(aA+aB<=aq[a][0]&&O+aB>=aq[a][0]&&M+aB>aq[a][1]&&M<=aq[a][1]+aq[a][3]){O=aq[a][0]-aB}else{if(aA>=aq[a][0]+aq[a][2]&&O<=aq[a][0]+aq[a][2]&&M+aB>aq[a][1]&&M<=aq[a][1]+aq[a][3]){O=aq[a][0]+aq[a][2]}}if(O+aB>aq[a][0]&&O<aq[a][2]+aq[a][0]&&parseInt(M+aB)<=aq[a][1]&&parseInt(M+aB+R)>=aq[a][1]){R=0;M=aq[a][1]-aB}else{if(O+aB>aq[a][0]&&O<aq[a][2]+aq[a][0]&&parseInt(M)>aq[a][1]+aq[a][3]&&parseInt(M+R)<=aq[a][1]+aq[a][3]){R=0;M=aq[a][1]+aq[a][3]}}if(M==aq[a][1]-aB&&R!=aC){if(O+aB<=aq[a][0]||O>=aq[a][2]+aq[a][0]){aX=true}else{R=0;aX=false;if(n){R=aC}O=aA+(aq[a][4]*am);if(O<0){O=0}else{if(O+aB>P){O=P-aB}}}}if(!aX){g=false}}for(var a=0;a<T.length;a++){if(aA+aB<=T[a][0]&&O+aB>=T[a][0]&&M+aB>T[a][1]&&M<=T[a][1]+T[a][3]){O=T[a][0]-aB}else{if(aA>=T[a][0]+T[a][2]&&O<=T[a][0]+T[a][2]&&M+aB>T[a][1]&&M<=T[a][1]+T[a][3]){O=T[a][0]+T[a][2]}}if(O+aB>T[a][0]&&O<T[a][2]+T[a][0]&&parseInt(M+aB)<=T[a][1]&&parseInt(M+aB+R)>=T[a][1]){R=0;M=T[a][1]-aB}else{if(O+aB>T[a][0]&&O<T[a][2]+T[a][0]&&parseInt(M)>T[a][1]+T[a][3]&&parseInt(M+R)<=T[a][1]+T[a][3]){R=0;M=T[a][1]+T[a][3]}}if(M==T[a][1]-aB&&R!=aC){if(O+aB<=T[a][0]||O>=T[a][2]+T[a][0]){aX=true}else{O+=T[a][4];R=0;aX=false;if(n){R=aC}}}if(!aX){g=false}}for(var a=0;a<at.length;a++){if(aA+aB<=at[a][0]&&O+aB>=at[a][0]&&M+aB>at[a][1]&&M<=at[a][1]+at[a][3]){O=at[a][0]-aB}else{if(aA>=at[a][0]+at[a][2]&&O<=at[a][0]+at[a][2]&&M+aB>at[a][1]&&M<=at[a][1]+at[a][3]){O=at[a][0]+at[a][2]}}if(O+aB>at[a][0]&&O<at[a][2]+at[a][0]&&parseInt(M+aB)<=at[a][1]&&parseInt(M+aB+R)>=at[a][1]){R=0;M=at[a][1]-aB}else{if(O+aB>at[a][0]&&O<at[a][2]+at[a][0]&&parseInt(M)>at[a][1]+at[a][3]&&parseInt(M+R)<=at[a][1]+at[a][3]){R=0;M=at[a][1]+at[a][3]}}if(M==at[a][1]-aB&&R!=aC){if(O+aB<=at[a][0]||O>=at[a][2]+at[a][0]){aX=true}else{if(at[a][3]>=21&&at[a][8]){at[a][1]+=1;at[a][3]-=1;M=at[a][1]-aB}else{if(at[a][3]-10>=at[a][6]){at[a][3]=at[a][6];at[a][1]=at[a][7];M=at[a][1]-aB;R=-at[a][4];at[a][8]=true}else{at[a][1]-=10;at[a][3]+=10;M=at[a][1]-aB;R=0;at[a][8]=false}}aX=false;if(n){R=aC}}}else{if(at[a][3]+10>=at[a][6]){at[a][3]=at[a][6];at[a][1]=at[a][7]}else{at[a][1]-=10;at[a][3]+=10}}if(!aX){g=false}}for(var a=0;a<aO.length;a++){if(aO[a][6]>=0){if(aA+aB<=aO[a][0]&&O+aB>=aO[a][0]&&M+aB>aO[a][1]&&M<=aO[a][1]+aO[a][3]){O=aO[a][0]-aB}else{if(aA>=aO[a][0]+aO[a][2]&&O<=aO[a][0]+aO[a][2]&&M+aB>aO[a][1]&&M<=aO[a][1]+aO[a][3]){O=aO[a][0]+aO[a][2]}}if(O+aB>aO[a][0]&&O<aO[a][2]+aO[a][0]&&parseInt(M+aB)<=aO[a][1]&&parseInt(M+aB+R)>=aO[a][1]){R=0;M=aO[a][1]-aB;aO[a][7]=true}else{if(O+aB>aO[a][0]&&O<aO[a][2]+aO[a][0]&&parseInt(M)>aO[a][1]+aO[a][3]&&parseInt(M+R)<=aO[a][1]+aO[a][3]){R=0;M=aO[a][1]+aO[a][3]}}if(M==aO[a][1]-aB&&R!=aC){if(O+aB<=aO[a][0]||O>=aO[a][2]+aO[a][0]){aX=true}else{R=0;aX=false;if(n){R=aC}}}if(!aX){g=false}}}for(var a=0;a<aM.length;a++){if(aM[a][4]=="x"){if(aA+aB<=aM[a][11]&&O+aB>=aM[a][0]&&M+aB>aM[a][1]&&M<=aM[a][1]+aM[a][3]){O=aM[a][0]-aB}else{if(aA>=aM[a][11]+aM[a][2]&&O<=aM[a][0]+aM[a][2]&&M+aB>aM[a][1]&&M<=aM[a][1]+aM[a][3]){O=aM[a][0]+aM[a][2]}}if(O+aB>aM[a][0]&&O<aM[a][2]+aM[a][0]&&parseInt(M+aB)<=aM[a][1]&&parseInt(M+aB+R)>=aM[a][1]){R=0;M=aM[a][1]-aB}else{if(O+aB>aM[a][0]&&O<aM[a][2]+aM[a][0]&&parseInt(M)>aM[a][1]+aM[a][3]&&parseInt(M+R)<=aM[a][1]+aM[a][3]){R=0;M=aM[a][1]+aM[a][3]}}if(M==aM[a][1]-aB&&R!=aC){if(O+aB<=aM[a][0]||O>=aM[a][2]+aM[a][0]){aX=true}else{O-=(aM[a][11]-aM[a][0]);R=0;aX=false;if(n){R=aC}}}if(!aX){g=false}}else{if(aA+aB<=aM[a][0]&&O+aB>=aM[a][0]&&M+aB>aM[a][1]&&M<=aM[a][1]+aM[a][3]){O=aM[a][0]-aB}else{if(aA>=aM[a][0]+aM[a][2]&&O<=aM[a][0]+aM[a][2]&&M+aB>aM[a][1]&&M<=aM[a][1]+aM[a][3]){O=aM[a][0]+aM[a][2]}}if(O+aB>aM[a][0]&&O<aM[a][2]+aM[a][0]&&parseInt(M+aB)<=parseInt(aM[a][11])&&parseInt(M+aB+R)>=aM[a][1]){R=0;M=aM[a][1]-aB;aM[a][12]=true}else{if(O+aB>aM[a][0]&&O<aM[a][2]+aM[a][0]&&parseInt(M)>=aM[a][1]+aM[a][3]&&parseInt(M+R)<=aM[a][1]+aM[a][3]+aM[a][9]){R=0;M=aM[a][1]+aM[a][3]}}if(aM[a][12]){M=aM[a][1]-aB;if(R==aC){aM[a][12]=false}}if(M==aM[a][1]-aB&&R!=aC){if(O+aB<=aM[a][0]||O>=aM[a][2]+aM[a][0]){aM[a][12]=false;aX=true}else{R=0;aX=false;if(n){R=aC}}}if(!aX){g=false}}}for(var a=0;a<K.length;a++){if(O>K[a][0]-aJ&&O<K[a][0]+aJ&&M>K[a][1]-aJ&&M<K[a][1]+aJ){if(K[a][8]){O=K[a][4];M=K[a][5];R=0;K[a][8]=false}}else{if(O>K[a][4]-aJ&&O<K[a][4]+aJ&&M>K[a][5]-aJ&&M<K[a][5]+aJ){if(K[a][8]){O=K[a][0];M=K[a][1];R=0;K[a][8]=false}}else{K[a][8]=true}}}aX=g;for(var a=0;a<ac.length;a++){if(O+aB>ac[a][0]&&O<ac[a][0]+ac[a][2]&&M+aB>ac[a][1]&&M<ac[a][1]+ac[a][3]){a3();break}}for(var a=0;a<ai.length;a++){if(O+aB>ai[a][0]&&O<ai[a][0]+ai[a][2]&&M+aB>ai[a][1]&&M<ai[a][1]+ai[a][3]){a3();break}}for(var a=0;a<al.length;a++){if(O+aB>al[a][0]&&O<al[a][0]+al[a][2]&&M+aB>al[a][1]&&M<al[a][1]+al[a][3]){a3();break}}for(var a=0;a<an.length;a++){if(O+aB>an[a][0]&&O<an[a][0]+an[a][2]&&M+aB>an[a][1]&&M<an[a][1]+an[a][3]&&an[a][6]>0){a3();break}}for(var a=0;a<aL.length;a++){if(O+aB>aL[a][0]&&O<aL[a][0]+aL[a][2]&&M+aB>aL[a][1]&&M<aL[a][1]+aL[a][3]){a3();break}}for(var a=0;a<aG.length;a++){if(O+aB>aG[a][8]&&O<aG[a][8]+aG[a][3]&&M+aB>aG[a][9]&&M<aG[a][9]+aG[a][4]){a3();break}}for(var a=0;a<aT.length;a++){if(O+aB>aT[a][0]&&O<aT[a][0]+aT[a][2]&&M+aB>aT[a][1]&&M<aT[a][1]+aT[a][3]){a3();break}}for(var a=0;a<ax.length;a++){if(O+aB>ax[a][11]&&O<ax[a][11]+ax[a][3]&&M+aB>ax[a][12]&&M<ax[a][12]+ax[a][4]){a3();break}}if(M<0){M=0;R=0}else{if(M>X){a3()}}if(aX){R+=af}if(R==0&&Y&&!aX){n=true;R=aC}M+=R;av=aA;ae=ay;av<O-2?av=O-2:av;av>O+2?av=O+2:av;ae<M-2?ae=M-2:ae;ae>M+2?ae=M+2:ae;V.fillStyle="#f82";V.fillRect(O,M,aB,aB);V.beginPath();V.fillStyle="#fcfcfc";V.arc(O+5,M+5,4,0,2*Math.PI);V.fill();V.beginPath();V.arc(O+15,M+5,4,0,2*Math.PI);V.fill();if(aX){V.fillStyle="#fcfcfc";V.beginPath();V.arc(O+10,M+15,4,0,2*Math.PI);V.fill()}else{V.fillStyle="#fcfcfc";V.beginPath();V.fillRect(O+2,M+12,16,6)}V.fillStyle="#000";V.beginPath();V.arc(av+5,ae+5,2,0,2*Math.PI);V.fill();V.beginPath();V.arc(av+15,ae+5,2,0,2*Math.PI);V.fill();V.fillStyle=I;V.fillRect(560,10,30,5);V.fillRect(560,20,30,5);V.fillRect(560,30,30,5);V.fillStyle=aW;V.beginPath();V.moveTo(530,22);V.arc(530,22,14,o,2*o,true);V.closePath();V.fill();V.beginPath();V.fillStyle="#fcfcfc";V.arc(530,22,10,0,4*o);V.closePath();V.fill();V.beginPath();V.fillStyle=aW;V.moveTo(522,32);V.lineTo(530,24);V.lineTo(530,40);V.closePath();V.fill();V.fillStyle=G;V.fillRect(478,9,8,28);V.fillRect(494,9,8,28);if(O>S[0]-aJ&&O<S[0]+aJ&&M>S[1]-aJ&&M<S[1]+aJ){a1++;E=0;aS=true;ao=false;a0=false}}function a3(){ao=true;O=D;M=j;R=0}function s(){aS=false;ao=false;a0=false;a2=false;V.fillStyle="#999";V.fillRect(0,0,P,X);V.font=Q+" 微软雅黑";V.fillStyle="#fcfcfc";V.textAlign="center";V.fillText("恭喜通关",300,310)}function W(c,a){return Math.floor(Math.random()*(a-c+1)+c)}function i(c,a){return Math.random()*(a-c)+c}ab.keydown(function(a){if((a.keyCode>36&&a.keyCode<41)||a.keyCode==82||a.keyCode==32){if(a.keyCode==37){ah=aV}if(a.keyCode==39){ag=aV}if(a.keyCode==38){Y=true}if(a.keyCode==38&&!aX){n=true;R=aC}if(a.keyCode==82){m()}if(a.keyCode==32){if(a2){ad=false;ak=true}else{if(ak){ad=true;ak=false;a2=true;a0=true;H()}}}return false}});ab.keyup(function(a){if(a.keyCode>36&&a.keyCode<41){if(a.keyCode==37){ah=0}if(a.keyCode==39){ag=0}if(a.keyCode==38&&n){n=false;if(R<0){R=R/2}}if(a.keyCode==38){Y=false}return false}});(function(){var c=0;var e=["webkit","moz"];for(var a=0;a<e.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[e[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[e[a]+"CancelAnimationFrame"]||window[e[a]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(y,v){var h=new Date().getTime();var w=Math.max(0,16.7-(h-c));var x=window.setTimeout(function(){y(h+w)},w);c=h+w;return x}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(h){clearTimeout(h)}}}());H()});