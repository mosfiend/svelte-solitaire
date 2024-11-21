import { Assets, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { v4 as uuid } from "uuid";
import { Tween } from "tweedle.js";
import { Manager } from "../manager";

export class NewNode extends Container {
  constructor(num) {
    super();
this.sprite = Sprite.from("back")
this.addChild(this.sprite);
         this.side = "back"
         this.sent = false
        this.sprite.scale.x =-0.3
        this.sprite.scale.y =0.3
this.num = num
    this.eventMode = "static";
    this.cursor = "pointer";
  }

flip() {
        const position = new Tween(this.sprite).to({
            x:-this.sprite.width
        },600).start()

const twen = new Tween(this.sprite.scale).to({
            x: 0,
        },300)

            .start()
.onComplete(()=>{
            this.sprite.texture = Texture.from(this.num+["S","H","C","D"][Math.trunc(Math.random()*4)])
            frontFlip.start()
            }) 

        const frontFlip = new Tween(this.sprite.scale).to({
            x:0.3,
        }, 300)
}
}
