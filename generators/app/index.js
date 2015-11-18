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
        console.log("source: " + this.sourceRoot());
        console.log('destination: ' + this.destinationPath(this.appname + '/src/index.html'));
        this.directory('../unicron', this.destinationPath(this.appname));
        this.fs.copyTpl(
          this.templatePath('./index.html'),
          this.destinationPath(this.appname + '/src/index.html'),
          {title : this.title}
        );
      }
  });
