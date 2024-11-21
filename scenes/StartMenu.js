import { Assets, Container, Graphics } from "pixi.js";
import { v4 as uuid4 } from "uuid";
import { Manager } from "../manager";
import { NewNode } from "./NewNode";
import { RootNode } from "./RootNode";

export class StartMenu extends Container {
  constructor() {
    super();
    this.screenWidth = Manager.width;
    this.screenHeight = Manager.height;
    this.x = this.screenWidth / 2;
    this.y = 30;
    this.eventMode = "static";
    this.curMousePos = { x: 0, y: 0 };
    this.isMoving = false;
    this.grabPos = { x: null, y: null };

    // this.on("pointerup", this.onDragEnd, this);
    // this.on("pointerupoutside", this.onDragEnd, this);
    // this.on("pointerdown", this.onScreenDragStart, this);

    this.bg = new Graphics()
      .rect(0, 0, this.screenWidth, this.screenHeight)
      .fill(0xeeeeee);
    this.bg.alpha = 0.000001;
    this.bg.x = -this.x;
    this.bg.y = -this.y;
    this.addChildAt(this.bg, 0);

// for (let i =0;i<10;i++) {
this.addNode(0)
        // }
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

    this.grabPos.x = event.global.x - this.x - target.x;
    this.grabPos.y = event.global.y  - target.y;

    this.isChildActive = true;
    this.dragTarget = target;
    this.on("pointermove", this.onDragMove, this);
  }

  onDragMove(event) {
    event.stopPropagation();

    if (this.dragTarget) {
      this.dragTarget.x = event.global.x - this.x - this.grabPos.x;
      this.dragTarget.y = event.global.y - this.y - this.grabPos.y;
    }
    }

  addNode(num) {
    let rayID =  uuid4()
    let childNode = new NewNode(num);

    childNode.on("pointerdown", (event) => {
      this.onDragStart(event, childNode);
    });
    this.addChild(childNode);
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
    // Update logic goes here
  }
}
