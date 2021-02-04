bullets = []

function shoot(x, y, d){
    let bullet = d3.select("svg")
        .append("circle")

    bullet.attr("cx", x)
        .attr("cy", y)
        .attr("r", 10)

    let dir = d/360 * 2* Math.PI
    let b = {
        bullet: bullet,
        x: x,
        y: y,
        d: dir,
        updates: 0
    }
    bullets.push(b)

}

function update_bullets(){

    for(var i=0; i<bullets.length; i++){
        let b =  bullets[i]
        if(b.updates>100){
            d3.remove(b.bullet)
        }
        else {

            let new_x = b.x - Math.sin(b.d)*20
            let new_y = b.y + Math.cos(b.d)*20
            b.y= new_y
            b.x=new_x
            b.bullet.attr("cx", new_x )
                .attr("cy", new_y)


        }
    }
}