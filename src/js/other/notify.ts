import "@ppzp/noty/content/index.css";
import "src/css/notify.scss";
import Noty from "@ppzp/noty/noty.js";
import Animation from '@ppzp/noty/animation/index.js';
import Content from '@ppzp/noty/content/index.js';

const noty = new Noty({
    Animation, Content,
    rootClass: 'solar-notify',
    customPosition: true,
    duration: 5000,
});
let notyList: Array<notyJs.notyContent> = [];
function notyInfo(text: string): notyJs.notyContent {
    const notyContent = noty.info(text, {
        onClose: () => {
            const index = notyList.indexOf(notyContent);
            index !== -1 && notyList.splice(index, 1);
        }
    });
    notyList.push(notyContent);
    return notyContent;
}

export default class Notify {
    static introController(): notyJs.notyContent {
        return notyInfo("切换使用不同控制器");
    }

    static initOritController(): notyJs.notyContent {
        return notyInfo("轨道控制器：通过鼠标拖拽查看不同角度")
    }

    static introFlyController(): notyJs.notyContent {
        return notyInfo("飞行控制器：通过键盘W/S/A/D和鼠标进行飞行")
    }

    static introSyncController(): notyJs.notyContent {
        return notyInfo("地球同步卫星：体验地球同步卫星视角")
    }

    static introPlanetClick(): notyJs.notyContent {
        return notyInfo("点击星体可展示相关信息")
    }

    static close(notyContent: notyJs.notyContent): void {
        notyContent.close();
        const index = notyList.indexOf(notyContent);
        index !== -1 && notyList.splice(index, 1);
    }

    static closeAll(): void {
        notyList.forEach(notyContent => notyContent.close());
        notyList = [];
    }
};