"use strict";
exports.__esModule = true;
exports.convertAll = void 0;
var fs = require("fs");
function convertAll() {
    fs.readdirSync("./public").forEach(function (file) {
        if (file.split(".")[1] === "html") {
            var tsxFile = rewriteHtml(file);
            fs.renameSync("./public/" + tsxFile, "./pages/" + tsxFile);
            fs.unlinkSync("./public/" + file);
        }
    });
}
exports.convertAll = convertAll;
function rewriteHtml(file) {
    var html = fs.readFileSync("./public/" + file, {
        encoding: "utf8",
        flag: "r"
    });
    html = html.replace(/\n/g, "");
    const randomName = (Math.random() + 1).toString(36).substring(2);
    var componentName = "C" + randomName;
    var tsx = 'import type { NextPage } from "next"; const ' +
        componentName +
        ": NextPage = () => { return (<div dangerouslySetInnerHTML={{ __html: `" +
        html.toString() +
        "`}} />)}; export default " +
        componentName +
        ";";
    fs.writeFileSync("./public/" + file.split(".")[0] + ".tsx", tsx);
    return file.split(".")[0] + ".tsx";
}
convertAll();
