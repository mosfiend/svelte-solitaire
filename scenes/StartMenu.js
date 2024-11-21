import { Assets, Container, Graphics } from "pixi.js";
import { v4 as uuid4 } from "uuid";
import { Manager } from "../manager";
import { NewNode } from "./NewNode";
import { RootNode } from "./RootNode";
import { Tween } from "tweedle.js";

const WIDTH = 270
const HEIGHT = 368

export class StartMenu extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = (this.screenWidth - WIDTH*6*0.3 +10*5)/2
    this.y = 30;
    this.eventMode = "static";
    this.curMousePos = { x: 0, y: 0 };
    this.isMoving = false;
    this.grabPos = { x: null, y: null };
    this.cards = []

    this.on("pointerup", this.onDragEnd, this);
    this.on("pointerupoutside", this.onDragEnd, this);
    this.on("pointerdown", this.onScreenDragStart, this);


for (let i =0;i<10;i++) {
this.addNode(i)
        }


let value = {progress:0}
let flipCards = new Tween(value).to({progress:100 },1000).onUpdate(()=>{
for (let i = 0;i<this.cards.length;i++) {
if  (!this.cards[i].sent && i<= value.progress/10) {
                    this.cards[i].sent = true
new Tween(this.cards[i]).to({x:280*0.3*(i%6), y:378*0.3 +Math.trunc(i/6)*20}, 200).start().onComplete(()=>{
                        if (Math.trunc(i/6)>=1) this.cards[i].flip()
                    })
                }
            }
        })
        .start()

    this.bg = new Graphics()
      .rect(0, 0, this.screenWidth, this.screenHeight)
      .fill(0xeeeeee);
    this.bg.alpha = 0.00000000001;
    this.bg.x = -this.x;
    this.bg.y = -this.y;
    this.addChildAt(this.bg, 0);

  }

  onDragEnd() {
    this.isMoving = false;
    this.isChildActive = false;
    if (this.dragTarget) {
      this.off("pointermove", this.onDragMove, this);
      this.dragTarget.alpha = 1;
      this.grabPos.x = null;
      this.grabPos.y = null;

      // WATCH OUT for this being commented out
      // this.dragTarget = null;
      //
    }
  }

  onDragStart(event, target) {
    // STATE MANAGEMENT

   this.grabPos.x = (event.global.x - this.x) / this.scale.x - target.x;
   this.grabPos.y = (event.global.y - this.y) / this.scale.y - target.y;

    this.isChildActive = true;
    this.dragTarget = target;
    this.on("pointermove", this.onDragMove, this);
  }

  onDragMove(event) {
    event.stopPropagation();

    if (this.dragTarget) {
      this.dragTarget.x =
        (event.global.x - this.x) / this.scale.x - this.grabPos.x;
      this.dragTarget.y =
        (event.global.y - this.y) / this.scale.y - this.grabPos.y;
    }
    }

  addNode(num) {
    let childNode = new NewNode(num);

    childNode.on("pointerdown", (event) => {
      this.onDragStart(event, childNode);
    });
    this.addChild(childNode);
        this.cards.push(childNode)
  }

  onScreenDragStart(event) {
    if (this.isChildActive) return;
    this.curMousePos.x = event.global.x;
    this.curMousePos.y = event.global.y;
  }

  transitionIn() {
    Manager.app.stage.addChild(Manager.currentScene);
  }

  transitionOut() {
    Manager.app.stage.removeChild(Manager.currentScene);
  }

  resize(newWidth, newHeight) {
    this.screenWidth = newWidth;
    this.screenHeight = newHeight;
  }

  update(deltaTime) {
  }
}
