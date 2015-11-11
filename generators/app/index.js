var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
      constructor: function () {
        generators.Base.apply(this, arguments);

        // This makes `appname` a required argument.
        this.argument('appname', { type: String, required: true });
        // And you can then access it later on this way; e.g. CamelCased
        this.appname = _.camelCase(this.appname);
      },
      prompting: function () {
        var done = this.async();
        this.prompt([{
          type    : 'input',
          name    : 'appname',
          message : 'Your application name: ',
          default: this.appname
        },{
          type    : 'input',
          name    : 'database',
          message : 'Your database name: ',
          default : this.appname + "db"
        }], function (answers) {
          this.log(answers.database);
          done();
        }.bind(this));
      }
  });
