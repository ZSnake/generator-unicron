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
        this.prompt([{
          type    : 'input',
          name    : 'name',
          message : 'Your project title',
          default : this.appname
        },
        {
          type    : 'input',
          name    : 'description',
          message : 'Your project description here'
        },{
          type    : 'input',
          name    : 'author',
          message : 'Application Author',
          store   : true
        },
        {
          type    : 'input',
          name    : 'homepage',
          message : 'Your projects homepage'
        },
        {
          type    : 'input',
          name    : 'repositoryType',
          message : 'Your project repository type',
          default : 'git'
        },
        {
          type    : 'input',
          name    : 'repository',
          message : 'Your project repository URL: '
        }], function (answers) {
          this.name = answers.name
          this.description = answers.description;
          this.author = answers.author;
          this.homepage = answers.homepage;
          this.repositoryType = answers.repositoryType;
          this.repository = answers.repository;
          done();
        }.bind(this));
      },
      writing: function(){
        this.directory('./unicron_files', this.destinationPath(this.appname));

        this.fs.copyTpl(
          this.templatePath('./unicron_templates/index.html'),
          this.destinationPath(this.appname + '/src/index.html'),
          {name : this.name}
        );

        this.fs.copyTpl(
          this.templatePath('./unicron_templates/package.json'),
          this.destinationPath(this.appname + '/package.json'),
          {
            name : this.name,
            description : this.description,
            author : this.author,
            homepage : this.homepage,
            repositoryType : this.repositoryType,
            repository : this.repository
          }
        );

        this.fs.copyTpl(
          this.templatePath('./unicron_templates/bower.json'),
          this.destinationPath(this.appname + '/bower.json'),
          {
            name : this.name,
            description : this.description,
            author : this.author,
            homepage : this.homepage,
          }
        );

        this.fs.copyTpl(
          this.templatePath('./unicron_templates/appveyor.yml'),
          this.destinationPath(this.appname + '/appveyor.yml'),
          {
            name : this.name,
          }
        );

        this.fs.copyTpl(
          this.templatePath('./unicron_templates/rakefile.rb'),
          this.destinationPath(this.appname + '/rakefile.rb'),
          {
            name : this.name,
          }
        );
      },
      install: function(){
        this.npmInstall(['node-inspector', 'bower', 'gulp', 'typescript', 'tsd', 'phantomjs', 'tslint', 'karma', 'karma-cli'], {'global': true});
        this.installDependencies();
      }
  });
