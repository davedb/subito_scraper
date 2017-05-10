"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n       <header>\n          <nav class=\"navbar navbar-default\">\n              <div class=\"navbar-header\">\n                  <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n              <span class=\"sr-only\">Toggle navigation</span>\n              <span class=\"icon-bar\"></span>\n              <span class=\"icon-bar\"></span>\n              <span class=\"icon-bar\"></span>\n              </button>\n                  <a class=\"navbar-brand\" href=\"#\">secondhandy.it</a>\n              </div>\n              <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                  <ul class=\"nav navbar-nav\">\n                  </ul>\n                  <form class=\"navbar-form navbar-left\" role=\"search\">\n                      <div class=\"form-group\">\n                          <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\n                      </div>\n                      <button type=\"submit\" class=\"btn btn-success\">cerca</button>\n                  </form>\n              </div>\n          </nav>\n      </header>\n\n      <main>\n          <div class=\"jumbotron\">\n              <h1>{{message}}</h1>\n          </div>\n\n      </main>\n      <footer class=\"text-center\">\n          Copyright &copy;2017\n      </footer>\n    ",
        styles: ["\n    .jumbotron { box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); }\n  "]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map