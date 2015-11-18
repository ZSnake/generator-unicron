var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
      constructor: function () {
        generators.Base.apply(this, arguments);

        // This makes `appname` a required argument.
        this.argument('appname', { type: String, required: true });
      },
      prompting: function () {
        var done = this.async();
        this.prompt({
          type    : 'input',
          name    : 'title',
          message : 'Your project title',
          default : this.appname // Default to current folder name
        }, function (answers) {
          this.title = answers.title
          done();
        }.bind(this));
      },
      writing: function(){
        this.fs.copyTpl(
          this.templatePath('./unicron/src/index.html'),
          this.destinationPath(this.appname + '/index.html'),
          {title : this.title}
        );
      }
  });
