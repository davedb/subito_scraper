import { Component } from '@angular/core';

@Component({
   selector : 'my-app',
   template: `
       <header>
          <nav class="navbar navbar-default">
              <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              </button>
                  <a class="navbar-brand" href="#">secondhandy.it</a>
              </div>
              <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav">
                  </ul>
                  <form class="navbar-form navbar-left" role="search">
                      <div class="form-group">
                          <input type="text" class="form-control" placeholder="Search">
                      </div>
                      <button type="submit" class="btn btn-success">cerca</button>
                  </form>
              </div>
          </nav>
      </header>

      <main>
          <div class="jumbotron">
              <h1>{{message}}</h1>
          </div>

      </main>
      <footer class="text-center">
          Copyright &copy;2017
      </footer>
    `,
   styles: [`
    .jumbotron { box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); }
  `]
})

export class AppComponent {
  message : 'test message'
}