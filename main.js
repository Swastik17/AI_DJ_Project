song1="";
song2="";
statusLeft=0;
statusRight=0;
scoreLeftWrist=0;
scoreRightWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
song1=loadSound("music.mp3");
song2=loadSound("peterpan.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function draw(){
image(video,0,0,600,500);
statusLeft=song1.isPlaying();
fill("#FF0000");
stroke("#FF0000");
if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    song2.stop();
}
if(statusLeft == false){
    song1.play();
    document.getElementById("song").innerHTML="Songname - Harry Potter";
}
statusRight=song2.isPlaying();
if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY);
    song1.stop();
}
if(statusRight == false){
song2.play();
document.getElementById("song").innerHTML="Songname - Peterpan";
}
}
function modelLoaded(){
    console.log("PoseNet is inistilised");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristX+" leftWristy = "+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristX+" rightWristy = "+rightWristY);

    }
    }
    function play(){
        song.play();
        song.setVolume(1);
        song.rate(1);
    }