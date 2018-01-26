var app = Application.currentApplication()
app.includeStandardAdditions = true

try {
    getRootAccess()
    var chosenApp = chooseApp(getAppList())
    if (hasSharedPrefs(chosenApp)){
        downloadPrefs(chosenApp)
        displayFile("~/Desktop/PREFS.xml")
    } else {
        throw("No shared prefs for that app")
    }
} catch (error) {
    app.displayDialog(error.toString(), { buttons: ["Ok"] })
}



function getRootAccess(){
    app.doShellScript("~/Library/Android/sdk/platform-tools/adb root")
}

function getAppList() {
    var dirList = app.doShellScript("~/Library/Android/sdk/platform-tools/adb shell ls /data/data")
    dirListArray = dirList.split("\r")
    return dirListArray.filter(element => {
        return !element.includes("android")
    });
}

function chooseApp(appList) {
    return app.chooseFromList(appList)
}

function downloadPrefs(appLocation){
    var downloadPrefs = "~/Library/Android/sdk/platform-tools/adb pull /data/data/" + appLocation + "/shared_prefs/PREFS.xml ~/Desktop/PREFS.xml"    
    app.doShellScript(downloadPrefs)
}

function displayFile(fileLocation){
    app.displayDialog(app.doShellScript("cat "+ fileLocation))
}

function hasSharedPrefs(appName){  
    var ls = "~/Library/Android/sdk/platform-tools/adb shell ls /data/data/" + appName
    output = app.doShellScript(ls)
    return output.includes("shared_prefs") ? true : false
}

