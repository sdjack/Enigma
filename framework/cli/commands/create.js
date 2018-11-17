var fs = require('fs'),
path = require('path'),
chalk = require('chalk'),
frameworkDir = path.normalize(__dirname + '/../../'),
curDir = frameworkDir + '/',
pkgTemplate = {
    name: "",
    version: "1.0.0",
    description: "",
    main: "constructor.js",
    author: "Steven Jackson",
    license: "GPL-3.0",
    dependencies: {},
    enigma: {
      enabled: "true",
      classname: "",
      displayname: "",
      archetype: ""
    }
},
defaultValues = {
  service: {
    description: 'Service plugin module for the ENIGMA Framework',
    pkgprefix: 'enigma_service_',
    dispsuffix: ' Service',
    dir: frameworkDir + '/services/'
  },
  controller: {
    description: 'Controller module for the ENIGMA Framework',
    pkgprefix: 'enigma_controller_',
    dispsuffix: ' Controller',
    dir: frameworkDir + '/controllers/'
  }
},
defaultPkgName = 'general',
defaultGrpName = 'generic',
defaultPkgDesc = 'Generic node package for use by WHG',
defaultPkgTmp = defaultValues.service,
SERVICEGROUPS = ['*CREATE NEW*'];

const LICENSE_TEMPLATE = "ENIGMA Framework\n\n%N% (%T%)\n\nCopyright (C) 2016  Steven Jackson\n\n"
+ "This program is free software: you can redistribute it and/or modify\n"
+ "it under the terms of the GNU General Public License as published by\n"
+ "the Free Software Foundation, either version 3 of the License, or\n"
+ "(at your option) any later version.\n\n"
+ "This program is distributed in the hope that it will be useful,\n"
+ "but WITHOUT ANY WARRANTY; without even the implied warranty of\n"
+ "MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n"
+ "GNU General Public License for more details.\n"
+ "You should have received a copy of the GNU General Public License\n"
+ "along with this program.  If not, see <http://www.gnu.org/licenses/>.";

const README_TEMPLATE = "#%N%\n"
+ "##%T%\n"
+ "####DESCRIPTION\n"
+ "This package creates a %t% for use by the ENIGMA service framework.\n"
+ "%D%\n"
+ "___\n"
+ "####USAGE\n"
+ "TBD\n";


var getClassName = function (str) {
  var cn = str.replace(/ /g,"_");
  cn = cn.toLowerCase();
  return cn;
};

var getDisplayName = function (str) {
  var dn = str.replace(/_/g," ");
  dn = dn.toLowerCase();
  dn = dn.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  return dn;
};

var getDirectories = function (srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
};

var getDirFiles = function (srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isFile();
    });
};

var copySourceFile = function (srcFile, destFile) {
  console.log(chalk.yellow('Reading file: ' + srcFile));
  var srcBuffer = fs.readFileSync(srcFile);
  if (srcBuffer) {
    try {
        fs.writeFileSync(destFile, srcBuffer);
        console.log(chalk.bold.cyan('Added file') + ' %s', srcFile);
    } catch (e) {
        console.log(chalk.red(e));
    }
  }
};

var copyContents = function (srcDir, destDir) {
    var dirAarray = getDirectories(srcDir);
    var srcArray = getDirFiles(srcDir);
    if (srcArray) {
        srcArray.forEach(function (srcFilename) {
            var lastSlash = srcFilename.lastIndexOf('/'),
                filename = lastSlash === -1 ? srcFilename : srcFilename.substring(lastSlash),
                destFile = destDir + filename,
                srcFile = srcDir + srcFilename;
            copySourceFile(srcFile, destFile);
        });
    }

    if (dirAarray) {
        dirAarray.forEach(function (subDir) {
            var srcSubDir = srcDir + subDir + '/';
            var destSubDir = destDir + subDir + '/';
            if (directoryExists(destSubDir, true)) {
                var srcArray = getDirFiles(srcSubDir);
                if (srcArray) {
                    srcArray.forEach(function (srcFilename) {
                        var lastSlash = srcFilename.lastIndexOf('/'),
                            filename = lastSlash === -1 ? srcFilename : srcFilename.substring(lastSlash),
                            destFile = destSubDir + filename,
                            srcFile = srcSubDir + srcFilename;
                        copySourceFile(srcFile, destFile);
                    });
                }
            }
            copyContents(srcSubDir, destSubDir);
        });
    }
};

var recommendFileName = function (name) {
    var srch = true;
    var iteration = 0;
    var result = name;
    var lookup = defaultPkgTmp.dir + result;

    while (srch === true) {
        var stat = fs.stat(lookup, function (err, data) {
            if (err) return false;
            return true;
        });
        if (stat) {
            result = name + '_' + iteration;
            lookup = defaultPkgTmp.dir + result;
            iteration++;
        } else {
            srch = false;
        }
    }
    return result;
};

var checkFileName = function (name) {
  var msg = false;
    try {
        fs.statSync(defaultPkgTmp.dir + name);
    } catch (e) {
        msg = true;
    }
    return msg;
};

var directoryExists = function (dir, canCreate) {
    var dirExists = false;
    try {
        fs.statSync(dir);
        dirExists = true;
    } catch (e) {
        if (canCreate) {
            try {
                fs.mkdirSync(dir);
                dirExists = true;
            } catch (e2) {
                dirExists = false;
                console.log(chalk.bold.red(e2));
            }
        } else {
            dirExists = false;
            console.log(chalk.bold.red(e));
        }
    }
    return dirExists;
};

var repeatQuestions = [
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to create another package? (just hit enter for YES) ',
        default: true
    }
];
var questions = [
  {
      type: 'list',
      name: 'packageType',
      message: 'What type of package are you creating?: ',
      choices: ['controller', 'service'],
      default: function () {
        defaultPkgTmp = defaultValues['service'];
        defaultPkgDesc = defaultPkgTmp.description;
        return 'service';
      },
      validate: function (val) {
        defaultPkgTmp = defaultValues[val];
        defaultPkgDesc = defaultPkgTmp.description;
        return true;
      }
  },
  {
      type: 'list',
      name: 'serviceGroup',
      message: 'Which service group will this be added to?: ',
      choices: function () {
        return SERVICEGROUPS;
      },
      when: function (a) {
        return (a.packageType === 'service');
      },
      default: function () {
        var val = (!SERVICEGROUPS[0]) ? defaultGrpName : SERVICEGROUPS[0];
        return val;
      }
  },
  {
      type: 'input',
      name: 'newServiceGroup',
      message: 'What\'s the name of the new service group?: ',
      when: function (a) {
        return (a.packageType === 'service' && a.serviceGroup === '*CREATE NEW*');
      },
      default: defaultGrpName
  },
  {
      type: 'input',
      name: 'packageName',
      message: 'What\'s the name of this new package?',
      default: defaultPkgName,
      validate: function (val) {
        var check = checkFileName(defaultGrpName + '/' + val);
        if (!check) {
          console.log("\n" + chalk.bold.red('The package "' + val + '" Already Exists') + "\n");
          return false
        } else {
          return true;
        }
      }
  },
  {
      type: 'input',
      name: 'packageDesc',
      message: 'Write a description: ',
      default: function () {
        return defaultPkgDesc;
      }
  }
];

var processRequest = function (self, answers, cb) {
    var dir = frameworkDir,
        pd = answers.packageDesc,
        pn = answers.packageName,
        pt = answers.packageType,
        sg = answers.serviceGroup,
        nsg = answers.newServiceGroup,
        sgn = (sg === '*CREATE NEW*') ? nsg : sg,
        strTemplate = defaultValues[pt],
        preDir = dir.endsWith('/') ? dir : dir + '/',
        pkgFileTemplate = pkgTemplate,
        pkgName, className, displayName, destDir;

    className = getClassName(pn);
    displayName = getDisplayName(pn);
    pkgName = strTemplate.pkgprefix + className;

    pkgFileTemplate.name = pkgName;
    pkgFileTemplate.description = pd;
    pkgFileTemplate.enigma.classname = className;
    pkgFileTemplate.enigma.displayname = displayName;
    pkgFileTemplate.enigma.archetype = pt;

    if (pt === 'service') {
      pkgFileTemplate.enigma.servicegroup = sgn;
      destDir = preDir + '/services/' + sgn + '/' + className + '/';
    } else {
      destDir = preDir + '/controllers/' + className + '/';
    }

    self.log(chalk.black('|'));
    self.log(chalk.black('|'));
    self.log(chalk.black('_______________________________'));
    self.log(chalk.gray('*******************************'));
    self.log(chalk.magenta('YOUR SELECTIONS'));
    self.log(chalk.gray('*******************************'));
    self.log('Package Name: ' + chalk.cyan(pn) + ' - <' + chalk.cyan(pt) + '>');
    self.log('Description: ' + chalk.cyan(pd));
    self.log('Destination: ' + chalk.cyan(dir));
    self.log(chalk.black('_______________________________'));
    self.log(chalk.gray('*******************************'));
    self.log(chalk.magenta('INSTALLING'));
    self.log(chalk.gray('*******************************'));

    var completed = true;

    if (sg === '*CREATE NEW*') {
        try {
            fs.mkdirSync(preDir + '/services/' + nsg);
        } catch (e) {
            console.log(chalk.bold.red(e));
        }
    }

    try {
        if (directoryExists(destDir, true)) {
            var srcDir = frameworkDir + '/cli/forge/' + pt + '_template/';
            copyContents(srcDir, destDir);

            var pkgContent = JSON.stringify(pkgFileTemplate, null, 2) + '\n';
            fs.writeFileSync(destDir + 'package.json', pkgContent);
            self.log(chalk.bold.cyan('Wrote package.json'));

            var licenseContent = LICENSE_TEMPLATE.replace(/(%N%)/g, displayName);
            licenseContent = licenseContent.replace(/(%T%)/g, className);
            fs.writeFileSync(destDir + 'LICENSE', licenseContent);
            self.log(chalk.bold.cyan('Wrote LICENSE'));

            var readmeContent = README_TEMPLATE.replace(/(%N%)/g, displayName);
            readmeContent = readmeContent.replace(/(%T%)/g, 'ENIGMA ' + getDisplayName(pt));
            readmeContent = readmeContent.replace(/(%t%)/g, pt);
            readmeContent = readmeContent.replace(/(%D%)/g, pd);
            fs.writeFileSync(destDir + 'README.md', readmeContent);
            self.log(chalk.bold.cyan('Wrote README.md'));

            self.log(chalk.black('_______________________________'));
            self.log(chalk.gray('*******************************'));
            self.log(chalk.bold.green('INSTALLION COMPLETE!'));
            self.log(chalk.gray('*******************************'));
        } else {
            completed = false;
            self.log(chalk.black('|'));
            self.log(chalk.black('|'));
            self.log(chalk.bold.red('THERE WERE ERRORS DURING INSTALLATION. EXITING!'));
        }
    }
    catch (e) {
        completed = false;
        self.log(chalk.black('|'));
        self.log(chalk.black('|'));
        self.log(chalk.red(e));
    }

    if (completed) {
      self.prompt(repeatQuestions).then(function (answers2) {
          if (answers2.askAgain) {
              self.prompt(questions).then(function (answers3) {
                  processRequest(self, answers3, cb);
              });
          } else {
              cb();
          }
      });
    } else {
      cb();
    }
};

var command_action = function (args, cb) {
    var self = this;
    var groupAarray = getDirectories(frameworkDir + '/services');
    if (groupAarray) {
      SERVICEGROUPS = ['*CREATE NEW*'];
      groupAarray.forEach(function (groupName) {
        SERVICEGROUPS.push(groupName);
      });
    }
    self.prompt(questions).then(function (answers) {
      processRequest(self, answers, cb);
    });
};

var COMMAND_CONSTRUCT = function () {
  this.command = 'create';
  this.description = 'Create a new ENIGMA package';
  this.action = command_action;
};

exports.plugin = new COMMAND_CONSTRUCT();
