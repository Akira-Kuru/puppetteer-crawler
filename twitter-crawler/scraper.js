"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.twitterCrawler = void 0;
var puppeteer = require("puppeteer");
var dotenv = require("dotenv");
var fs = require("fs");
dotenv.config({ path: '../.env' });
var twitterCrawler = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, header;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({
                    headless: false,
                    userDataDir: "../user_data"
                })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.setViewport({
                        width: 1280, height: 800,
                        deviceScaleFactor: 1
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.goto('https://twitter.com/login', {
                        waitUntil: 'networkidle2'
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.$('header')
                    // console.log(header);
                ];
            case 5:
                header = _a.sent();
                // console.log(header);
                if (header == null) {
                    authentication(page);
                }
                else {
                    hashtagCrawler(page);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.twitterCrawler = twitterCrawler;
(0, exports.twitterCrawler)();
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
// async function autoScroll(page){
//   await page.evaluate(async () => {
//       await new Promise((resolve, reject) => {
//           var totalHeight = 0;
//           var distance = 100;
//           var timer = setInterval(() => {
//               var scrollHeight = document.body.scrollHeight;
//               window.scrollBy(0, distance);
//               totalHeight += distance;
//               if(totalHeight >= scrollHeight - window.innerHeight){
//                   clearInterval(timer);
//                   resolve();
//               }
//           }, 100);
//       });
//   });
// }
function authentication(page) {
    return __awaiter(this, void 0, void 0, function () {
        var user_name, password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user_name = process.env.TWITTER_USERNAME;
                    password = process.env.TWITTER_PASSWORD;
                    return [4 /*yield*/, delay(2000)];
                case 1:
                    _a.sent();
                    console.log('Page Loaded');
                    console.log('Field Input: Username');
                    return [4 /*yield*/, page.type('#layers input', user_name)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.click('#layers div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(6)')];
                case 3:
                    _a.sent();
                    // For Firefox
                    // await page.type('#layers > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(3) > div > label > div > div:nth-child(2) > div:nth-child(1) > input', password);
                    return [4 /*yield*/, delay(2000)];
                case 4:
                    // For Firefox
                    // await page.type('#layers > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(3) > div > label > div > div:nth-child(2) > div:nth-child(1) > input', password);
                    _a.sent();
                    // For Chrome
                    console.log('Field Input: Password');
                    return [4 /*yield*/, page.type('#layers > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(3) > div > label > div > div:nth-child(2) > div:nth-child(1)', password)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.click('#layers div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div')];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function fieldChecker(page, field) {
    return __awaiter(this, void 0, void 0, function () {
        var text, removeClass, removeStyle, removeSpan;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function (elem) { return elem.innerHTML; }, field[0])];
                case 1:
                    text = _a.sent();
                    removeClass = text.replace(/class="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g, "");
                    removeStyle = removeClass.replace(/style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g, "");
                    removeSpan = removeStyle.replace(/<\/?span[^>]*>/g, "");
                    return [2 /*return*/, removeSpan];
            }
        });
    });
}
function hashtagChecker(page, field, hashtagJSON, count) {
    return __awaiter(this, void 0, void 0, function () {
        var text, regex, array;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function (elem) { return elem.innerHTML; }, field[0])];
                case 1:
                    text = _a.sent();
                    regex = new RegExp('(' + hashtagJSON.hashtags[count].text + ')', 'gi');
                    array = regex.exec(text);
                    return [2 /*return*/, array];
            }
        });
    });
}
function hashtagCrawler(page) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonString, hashtagJSON, hashtagLength, h, currentTimeline, i, user, username, userArray, tag, tagText, tagName, tagRegex, tagArray, desc, description, descriptionArray, hashtag, Users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jsonString = fs.readFileSync('../json/hashtag.json', 'utf-8');
                    hashtagJSON = JSON.parse(jsonString);
                    hashtagLength = Object.keys(hashtagJSON.hashtags).length;
                    console.log("hashtagJSON3");
                    h = 0;
                    _a.label = 1;
                case 1:
                    if (!(h < hashtagLength)) return [3 /*break*/, 13];
                    return [4 /*yield*/, page.goto('https://twitter.com/search?q=' + hashtagJSON.hashtags[h].text + '&f=user', {
                            waitUntil: 'networkidle2'
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, delay(2500)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.$$('div[aria-label="Timeline: Search timeline"] > div > div')];
                case 4:
                    currentTimeline = _a.sent();
                    i = 1;
                    _a.label = 5;
                case 5:
                    if (!(i <= currentTimeline.length)) return [3 /*break*/, 12];
                    return [4 /*yield*/, page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div[' + i + ']/div/div/div/div/div[2]/div[1]/div[1]/div/div[1]/a/div/div[1]/span')];
                case 6:
                    user = _a.sent();
                    username = fieldChecker(page, user);
                    userArray = hashtagChecker(page, user, hashtagJSON, h);
                    return [4 /*yield*/, page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div[' + i + ']/div/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/a/div/div/span')];
                case 7:
                    tag = (_a.sent())[0];
                    return [4 /*yield*/, tag.getProperty('textContent')];
                case 8:
                    tagText = _a.sent();
                    return [4 /*yield*/, tagText.jsonValue()];
                case 9:
                    tagName = _a.sent();
                    tagRegex = new RegExp('(' + hashtagJSON.hashtags[h].text + ')', 'gi');
                    tagArray = tagRegex.exec(tagName);
                    return [4 /*yield*/, page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div[' + i + ']/div/div/div/div/div[2]/div[2]')];
                case 10:
                    desc = _a.sent();
                    description = fieldChecker(page, desc);
                    descriptionArray = hashtagChecker(page, desc, hashtagJSON, h);
                    hashtag = '';
                    if (userArray != null || descriptionArray != null || tagArray != null) {
                        hashtag = hashtagJSON.hashtags[h].text;
                    }
                    else {
                        hashtag = 'no';
                    }
                    Users = [{
                            'id': i,
                            "username": username,
                            "description": description.then(),
                            "profileImage": '',
                            "tag": tagName,
                            "hashtag": hashtag
                        }];
                    console.log(Users);
                    _a.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 5];
                case 12:
                    h++;
                    return [3 /*break*/, 1];
                case 13: return [2 /*return*/];
            }
        });
    });
}
