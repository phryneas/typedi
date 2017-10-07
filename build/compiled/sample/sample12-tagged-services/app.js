"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Container_1 = require("../../src/Container");
var Token_1 = require("../../src/Token");
var Service_1 = require("../../src/decorators/Service");
var Inject_1 = require("../../src/decorators/Inject");
var Extension = new Token_1.Token();
var Extension1 = /** @class */ (function () {
    function Extension1() {
        this.name = "Extension 1";
    }
    Extension1 = __decorate([
        Service_1.Service({ tags: [Extension] })
    ], Extension1);
    return Extension1;
}());
var Extension2 = /** @class */ (function () {
    function Extension2() {
        this.name = "Extension 2";
    }
    Extension2 = __decorate([
        Service_1.Service({ tags: [Extension] })
    ], Extension2);
    return Extension2;
}());
var TargetClass = /** @class */ (function () {
    function TargetClass() {
    }
    TargetClass.prototype.logExtensions = function () {
        for (var _i = 0, _a = this.extensions; _i < _a.length; _i++) {
            var extension = _a[_i];
            console.log(extension.name);
        }
    };
    __decorate([
        Inject_1.InjectTagged(Extension),
        __metadata("design:type", Array)
    ], TargetClass.prototype, "extensions", void 0);
    return TargetClass;
}());
Container_1.Container.get(TargetClass).logExtensions();
//# sourceMappingURL=app.js.map