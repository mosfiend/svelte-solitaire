import { Assets, Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { v4 as uuid } from "uuid";
import { Manager } from "../manager";

export class NewNode extends Sprite {
  constructor(num) {
    super();
this.texture = Texture.from(num+["S","H","C","D"][Math.trunc(Math.random()*4)])
// this.addChild(this.sprite);
        this.scale.x =0.3
        this.scale.y =0.3
        // console.log(this.x,this.sprite.x,this.y,this.sprite.y)

    this.eventMode = "static";
    this.cursor = "pointer";
  }



}
