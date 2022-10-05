let html = document.body.innerHTML;
let patt =
  /(\<b\>(Warning|Notice|Fatal|Parse( error){0,}\<\/b\>))[^]+\<b\>\d+\<\/b\>/gi;

let match = patt.exec(html);
let m = match[2].indexOf(" ") != -1;
let s = m ? match[2].substring(0, match[2].indexOf(" ")) : match[2];
let matches = html
  .match(patt)
  .map((m) => `<div class="card ${s.toLowerCase()}-wrapper">${m}</div>`)
  .join("");
document.body.innerHTML = document.body.innerHTML.replace(patt, matches);

const root = document.querySelector(":root");
let iconName = s.toLowerCase() != "notice" ? "warning" : "notice";
if (typeof browser == "undefined") {
  browser = chrome;
}
root.style.setProperty(
  "--pseudo-image-url",
  `${browser.runtime.getURL(`phpPretifier/${iconName}-icon.svg`)}`
);
// remove backslashes
let url = root.style.cssText.replace("--pseudo-image-url:", "");
root.style.setProperty(
  "--pseudo-image-url",
  "url('" + url.replace(";", "") + "')"
);
