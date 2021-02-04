var keyPressed=[];
var keyReleased=[];

document.addEventListener('keydown', function(key_pressed) {
    keyPressed[key_pressed.key] = true;
    keyReleased[key_pressed.key] = false;

})
document.addEventListener('keyup', function(key_pressed) {
    keyPressed[key_pressed.key] = false;
    keyReleased[key_pressed.key] = true;

})


function event() {

    if (keyPressed['a'] && keyPressed['d']) {
        set_ax(0)

    }
    if (keyPressed['a'] && !keyPressed['d']) {
        set_ax(-1)

    }
    if (keyPressed['d'] && !keyPressed['a']) {
        set_ax(1)

    }
    if(!keyPressed['d'] && !keyPressed['a']){
        set_ax(0)
    }


    if (keyPressed['w'] && keyPressed['s']) {
        set_ay(0)

    }
    if (keyPressed['w'] && !keyPressed['s']) {
        set_ay(-1)

    }
    if (!keyPressed['w'] && keyPressed['s']) {
        set_ay(1)

    }
    if(!keyPressed['w'] && !keyPressed['s']){
        set_ay(0)
    }

    if(keyPressed["ArrowLeft"]){
        rotate_canon(-6)
    }
    if(keyPressed["ArrowRight"]){
        rotate_canon(6)
    }
    if(keyPressed[' ']){
        try_to_shoot()
    }



}