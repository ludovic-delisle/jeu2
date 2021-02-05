function add_dot(){
    let nx=200
    let ny= 200
    let r = 30
    let dot = d3.select("svg")
        .append("circle")

    let rect = d3.select("svg")
        .append("rect")

    dot.attr("cx", nx)
        .attr("cy", ny)
        .attr("r", r)
        .attr("id", "main_dot")


    rect.attr("x", nx-r/4)
        .attr("y", ny)
        .attr("width", r/2)
        .attr("height", 60)
        .attr("id", "canon")

    main_dot={
        x: nx,
        y: ny,
        size: r,
        vy: 0,
        vx: 0,
        ax: 0,
        ay: 0,
        orientation: 0
    };


}
function set_ax(ax){
    main_dot.ax=ax
}
function set_ay(ay){
    main_dot.ay=ay
}

function move_dot(ax, ay){
    let x_th=10
    let y_th=10
    let speed_decay= 0.95
    if(ax==0){
        //if acceleration is 0 then we decelerate by factor 0.4 and if it gets under 0.1 then it goes directly to 0
        main_dot.vx=main_dot.vx*speed_decay
        if(Math.abs(main_dot.vx)<0.1){
            main_dot.vx=0
        }
    }else{
        main_dot.vx += ax
        if(main_dot.vx>x_th) {
            main_dot.vx = x_th
        }
        if(main_dot.vx<-x_th) {
            main_dot.vx = -x_th
        }
    }
    if(ay==0){
        //if acceleration is 0 then we decelerate by factor 0.4 and if it gets under 0.1 then it goes directly to 0
        main_dot.vy=main_dot.vy*speed_decay
        if(Math.abs(main_dot.vy)<0.1){
            main_dot.vy=0
        }
    }else{
        main_dot.vy += ay
        if(main_dot.vy>y_th) {
            main_dot.vy = y_th
        }
        if(main_dot.vy<-y_th) {
            main_dot.vy = -y_th
        }
    }

}
function rotate_canon(a){
    main_dot.orientation+=a
    if(main_dot.orientation>=360){
        main_dot.orientation=main_dot.orientation-360
    }
    if(main_dot.orientation<=0){
        main_dot.orientation=main_dot.orientation+360
    }
}

reloading = false
reload_frames=0
function try_to_shoot(){
    if(!reloading) {
        let dir = main_dot.orientation/360 * 2* Math.PI
        let bullet_x = main_dot.x - Math.sin(dir)*50
        let bullet_y = main_dot.y + Math.cos(dir)*50
        shoot(bullet_x, bullet_y, main_dot.orientation)
        reloading=true
        reload_frames=20
    }
}
k=0
function update_dot() {

    if (reload_frames == 0) {
        reloading = false
    } else {
        reload_frames--
    }

    move_dot(main_dot.ax, main_dot.ay)

    let dot = d3.select("#main_dot")
    let rect = d3.select("#canon")

    let pos_x = main_dot.x
    let pos_y = main_dot.y
    let speed_x = main_dot.vx
    let speed_y = main_dot.vy
    let new_pos_x = +pos_x + +speed_x
    let new_pos_y = +pos_y + +speed_y

    if(centered_x()) {
        let displacement_x = main_dot.x - new_pos_x
        if(!limit_x(displacement_x)) {
            translate_world(displacement_x, 0)
        }
        else {
            main_dot.x = new_pos_x
        }
    }
    else {
        main_dot.x = new_pos_x
    }
    if(centered_y()) {
        let displacement_y = main_dot.y - new_pos_y
        if(!limit_y(displacement_y)) {
            translate_world(0, displacement_y)
        }
        else {
            main_dot.y = new_pos_y
        }
    }
    else {
        main_dot.y = new_pos_y
    }

    dot.attr("cx", main_dot.x)
        .attr("cy", main_dot.y)

    rect.attr("x", -30 / 4)
        .attr("y", -30 / 4)
        .attr("transform", "translate(" + main_dot.x + "," + main_dot.y + "), rotate(" + main_dot.orientation + ")")

}

function centered_x(){
    let svg = d3.select("#main_svg")

    if(main_dot.x> svg.attr("width")/2 -20 && main_dot.x < svg.attr("width")/2 +20){
        return true
    }
    return false
}
function centered_y(){
    let svg = d3.select("#main_svg")

    if(main_dot.y> svg.attr("height")/2 -20 && main_dot.y < svg.attr("height")/2 +20){
        return true
    }
    return false
}