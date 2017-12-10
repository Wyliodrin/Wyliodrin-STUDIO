
"use strict";

var _ = require ('lodash');
var dexie = require ('dexie');
var settings = require ('settings');
require ('debug').enable (settings.debug);
var debug = require ('debug')('wyliodrin:library');

var store = false;
var update = false;

function loadAllProjects ()
{
	console.log (folder);
	console.log (projects_data);
	if (fs.existsSync (folder) && fs.existsSync (projects_data))
	{
		console.log (projects_data);
		retrieveAllProjects (function (project_list)
		{
			var folder = path.join (os.homedir (), '.WyliodrinSTUDIO');
			var projects_data = path.join (folder, 'projects.data');	
			console.log (projects_data);
			console.log (project_list);
			if (project_list && project_list.length === 0)
			{
				console.log (projects_data);
				var projects = JSON.parse (fs.readFileSync (projects_data));
				for (var projectIndex in projects)
				{
					add (projects[projectIndex]);
				}
				console.log (projects);
			}
		});
	}
}

function storeAllProjects ()
{
	if (store == false)
	{
		store = true;
		var folder = path.join (os.homedir (), '.WyliodrinSTUDIO');
		fs.mkdir (folder, function (err)
		{
			retrieveAllProjects (function (project_list)
			{
				console.log (project_list);
				fs.writeFile (path.join (folder, 'projects.data'), JSON.stringify (project_list), function (err)
				{
					store = false;
					if (update)
					{
						update = false;
						process.nextTick (storeAllProjects);
					}
				});
			});
		});
	}
	else
	{
		update = true;
	}
}

var _ = require ('lodash');

var db = new dexie ("WyliodrinApp");

db.version(7).stores ({
	applications:"++id,name,date,main,dashboard,firmware,notebook,visualproject,language,schematics,tree",
	settings:"key,value"
});

db.version(6).stores ({
	applications:"++id,name,date,main,dashboard,firmware,notebook,visualproject,language,schematics",
	settings:"key,value"
});

db.version(5).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language,schematics",
	settings:"key,value"
});

db.version(4).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language",
	settings:"key,value"
});

db.version(3).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language",
	settings:"key,value"
});

db.version(2).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language",
	settings:"&key,value"
});

db.version(1).stores ({
	applications:"++id,name,date,main,dashboard,firmware,visualproject,language"
});

db.open ();

if (nodeRequire)
{
	var fs = nodeRequire ('fs');
	var os = nodeRequire ('os');
	var path = nodeRequire ('path');
	setInterval (function ()
	{
		if (update) storeAllProjects ();
	}, 60000);

	console.log ('Store all projects');

	var folder = path.join (os.homedir (), '.WyliodrinSTUDIO');
	var projects_data = path.join (folder, 'projects.data');	
	process.nextTick (function ()
	{
		loadAllProjects ();
	});
}

function add (value, language, done, devicecategory)
{
	if (_.isString (value))
	{
		var title = value;
		debug ('Adding project with title '+title+' in '+language);

		var startproject = generateProject(undefined, title,language);

		db.applications.add (startproject).then (function (id)
		{
			debug ('Added project with id '+id);
			if (done) done (null, id);
		}).catch (function (err)
		{
			console.log (err);
			debug (err);
			if (done) done (err);
		});
	}
	else
	{
		var project = value;
		debug ('Adding project with title '+project.title+' in '+project.language);
		db.applications.add (project).then (function (id)
		{
			debug ('Added project with id '+id);
			debug (done);
			if (done) done (null, id);
		});
	}
	update = true;
}

function cloneProject (project, newTitle, done)
{

	var clonedProject = generateProject(undefined, newTitle, project.language, undefined, project.mainContent, project.visualContent, project.tree, project.notebook);
	console.log(clonedProject);
	db.applications.add (clonedProject).then (function (id)
	{
		// console.log('am adaugat proiectul in db');
		debug ('Cloned project with id' + project.id);
		if (done) done (null, id);
	}).catch (function (err)
	{
		console.log (err);
		debug (err);
		if (done) done (err);
	});
	update = true;
}

function generateProject(id, title, language, date, mainContent, visualContent, projectTree, projectNotebook)
{
	if (!date){
		date = new Date().getTime();
	}

	if (!mainContent){
		mainContent = '';
	}

	var ext = _.filter(settings.LANGUAGES, { 'title' : language } )[0].ext;

	var startproject;

	if (projectTree != undefined)
	{
		 startproject = {
			title: title,
			tree: projectTree,
			language: language,
			notebook: projectNotebook
		};
	}
	else
	{
		startproject = {
			title: title,
			tree:
			[{name:title, id:1,isdir:true,isroot:true,children:
				[{name:language,id:2,isdir:true,issoftware:true,children:
					[{name:'main'+ext,id:3,isdir:false,ismain:true,content: mainContent , visual: visualContent }]
				}]
			}],
			language: language,
			notebook: [{
				type: 'markdown',
				text: '# Steps to build the project'
			}]
		};
	}

	if (id) startproject.id = id;

	startproject.title = title;
	startproject.date = date;
	var ispython;
	if(startproject.language=='python')
	{
		ispython=true;
	}
	//if(startproject.language==)

	return startproject;
}

function erase (id)
{
	debug ('Erasing project '+id);
	db.applications.delete (id);
	update = true;
}

function retrieveProject (id, done)
{
	debug ('Retrieving project '+id);
	db.applications.get (id).then(function (project)
	{
		debug ('Retrieved project '+project);
		done (project);
	}).catch (function (error)
	{
		done (null);
	});
}

function retrieveAllProjects (done)
{
	debug ('Retrieving all projects');
	db.applications.toArray ().then(function (project_list)
	{
		debug ('Retrieved all projects');
		// console.log (project_list);
		for (var projectIndex in project_list)
		{
			project_list[projectIndex] = _.clone (project_list[projectIndex]);
			delete project_list[projectIndex].id;
			delete project_list[projectIndex].$$hashKey;
			console.log (project_list[projectIndex]);
		}
		done (project_list);
	}).catch (function (error)
	{
		console.log (error);
		done (null);
	});
}

function rename (id, title)
{
	debug ('Store project main '+id);
	db.applications.update (id, {title:title});
	update = true;
}

function storeMain (id, main,tree)
{
	debug ('Store project main '+id);
	db.applications.update (id, {main:main,tree:tree});
	update = true;
}

function storeTree (id, tree)
{
	debug ('Store project tree '+id);
	db.applications.update (id, {tree:tree});
	update = true;
}

function convertToTree(project)
{
	var temp = generateProject(project.id, project.title, project.language, project.date, project.main, project.visualproject);
	return temp;
}

function storeWorkingProject (projectid)
{
	debug ('Store working project '+projectid);
	db.settings.put ({key:'project', value:projectid}).then (function (result)
		{
			// console.log (result);
		}).catch (function (error)
		{
			console.log (error);
		});
}

function storeDashboard (id, dashboard)
{
	debug ('Store project dashboard '+id);
	db.applications.update (id, {dashboard:dashboard});
	update = true;
}

function storeSchematics (id, schematics)
{
	debug ('Store project schematics '+id);
	db.applications.update (id, {schematics:schematics});
	update = true;
}

function retrieveWorkingProject (done)
{
	debug ('Retrieving working project');
	db.settings.get ('project').then (function (settings)
	{
		// console.log (projectid);
		debug ('Working project '+settings.value);
		done (settings.value);
	}).catch (function (error)
	{
		done (null);
	});
}

function storeValue (key, value, done)
{
	debug ('Storing '+key);
	db.settings.put ({key:key, value:value}).then (function ()
	{
		if (done) done (value);
	}).catch (function (error)
	{
		debug (key+' '+error);
		if (done) done (null);
	});
}

function retrieveValue (key, defvalue, done)
{
	debug ('Retrieving '+key);
	db.settings.get (key).then (function (settings)
	{
		// console.log (projectid);
		debug (key+' '+settings.value);
		done (settings.value);
	}).catch (function (error)
	{
		debug ('Using '+defvalue);
		if (defvalue !== undefined)
		{
			db.settings.put ({key:key, value:defvalue}).then (function ()
			{
				done (defvalue);
			}).catch (function (error)
			{
				debug (key+' '+error);
				done (null);
			});
		}
	});
}

function storeNotebook (id, notebook)
{
	debug ('Store project '+id);
	db.applications.update (id, {notebook:notebook});
	update = true;
}

function listProjects (done)
{
	debug ('List projects');
	db.applications.toArray (function (list)
	{
		debug ('List projects '+list);
		done (null, list);
	});
}

module.exports.listProjects = listProjects;
module.exports.erase = erase;
module.exports.retrieveProject = retrieveProject;
module.exports.storeMain = storeMain;
module.exports.retrieveValue = retrieveValue;
module.exports.storeValue = storeValue;
module.exports.storeNotebook = storeNotebook;
module.exports.storeTree = storeTree;
module.exports.convertToTree = convertToTree;
module.exports.storeWorkingProject = storeWorkingProject;
module.exports.retrieveAllProjects = retrieveAllProjects;
module.exports.retrieveWorkingProject = retrieveWorkingProject;
module.exports.storeDashboard = storeDashboard;
module.exports.storeSchematics = storeSchematics;
module.exports.add = add;
module.exports.rename = rename;
module.exports.generateProject = generateProject;
module.exports.cloneProject = cloneProject;
