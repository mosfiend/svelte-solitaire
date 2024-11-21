import { Assets, Container, Graphics } from "pixi.js";
import { Manager } from "../manager";
import { manifest } from "../assets/assets";
import { StartMenu } from "./StartMenu";
export class LoaderScene extends Container {
  constructor() {
    super();
    this.initializeLoader().then(() => {
      this.gameLoaded();
    });
  }
  update(deltaTime) {}
  async initializeLoader() {
    await Assets.init({ manifest });
    const bundleIds = manifest.bundles.map((bundle) => bundle.name);
    await Assets.loadBundle(bundleIds);
  }
  downloadProgress(progressRatio) {}
  gameLoaded() {
    Manager.changeScene(new StartMenu());
  }
  transitionIn() {
    Manager.app.stage.addChild(Manager.currentScene);
  }

  transitionOut() {
    Manager.app.stage.removeChild(Manager.currentScene);
  }

  resize() {}
}
