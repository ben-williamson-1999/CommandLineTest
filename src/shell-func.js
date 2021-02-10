const spawn = require('child_process').spawn;
const execFile = require('child_process').execFile;
const cp = require('child_process');
const path = require('path');

const buttonTest = document.getElementById("buttonTest");
const consoleTest = document.getElementById("textareaSpace");
const textArea = document.getElementById("allText");

const util = require('util');
const shell = require('shelljs');
shell.config.execPath = shell.which('node').toString();

function sayHelloFromGradle(event) {
	const GRADLE_HOME = path.resolve("C:\\cdl_install\\strata\\trunk\\git\\strata\\gradlew.bat")
	var path_dir = path.resolve("C:\\cdl_install\\strata\\trunk\\git\\strata")

	var child = cp.spawn('cmd.exe', ['/c', GRADLE_HOME, 'build', '--dry-run'], {
		cwd: path_dir,
		env: {
			GRADLE_OPTS:"-Dorg.gradle.daemon=false -Dorg.gradle.parallel=true -Dorg.gradle.jvmargs= -Xms2048M -XX:ReservedCodeCacheSize=2048M"
		}
	})

	child.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
		addToTextArea(data.toString());
    });

    child.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
		addToTextArea(data.toString());
    });

    child.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		addToTextArea(code.toString());
    });

}

function createDocker(event){
	var pathToDocker = path.resolve("C:\\cdl_install\\sonarqube_project\\docker.machine.cdl\\run_docker.sh")
	var child = cp.execFile(`${pathToDocker}`,{
		env: {
			COMSPEC:"/usr/bin/sh"
		},
		shell: true
	})

	child.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
		addToTextArea(data.toString());
    });

    child.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
		addToTextArea(data.toString())
	});

    child.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		addToTextArea(code)
	});
	
}

function testButton(event){
	addToTextArea("THIS IS A TEST");
}

function addToTextArea(toAdd){
	//console.log("THIS METHOD HAS BEEN RUN")
	textArea.value += toAdd;
	textArea.scrollTop = textArea.scrollHeight;
}