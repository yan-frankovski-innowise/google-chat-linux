const path = require("path");
const fs = require("fs");
const { app } = require("electron");

let theme = 'default';
const iconPathTemplate = `\`icon/\${theme}/\${iconName}\``;
const evalIconPath = (theme, iconName) => {
    return eval(iconPathTemplate);
}

const getBasePath = () => {
    if (process.resourcesPath) {
        const testPath = path.resolve(process.resourcesPath, evalIconPath(theme, "normal-64.png"));
        if (fs.existsSync(testPath)) {
            return process.resourcesPath;
        }
    }
    return path.join(__dirname, '..', 'assets');
};

const setIconTheme = (t) => {
    theme = t;
}


const normal = () => {
    return path.resolve(getBasePath(), evalIconPath(theme, "normal-64.png"))
}
const badge = () => {
    return path.resolve(getBasePath(), evalIconPath(theme, "badge-64.png"))
}
const offline = () => {
    return path.resolve(getBasePath(), evalIconPath(theme, "offline-64.png"))
}

module.exports = {
    "configsPath": path.resolve(app.getPath("appData"), "google-hangouts-chat-linux.json"),
    "OVERLAY_NEW_NOTIF": path.resolve(getBasePath(), "icon/overlay-new-xs.png"),
    normal: normal,
    badge: badge,
    offline: offline,
    setIconTheme: setIconTheme
}
