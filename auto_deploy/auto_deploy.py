from sh import git
import subprocess
import time
import os


def CheckForUpdate(workingDir):
    print("Fetching most recent code from source..." + workingDir)

    # Fetch most up to date version of code.
    p = git("--git-dir=" + workingDir + ".git/", "--work-tree=" + workingDir, "fetch", "origin", "master")

    print("Fetch complete.")
    time.sleep(2)
    print("Checking status for " + workingDir + "...")
    statusCheck = git("--git-dir=" + workingDir + ".git/", "--work-tree=" + workingDir, "status")

    if "Your branch is up-to-date" in statusCheck:
        print("Status check passes.")
        print("Code up to date.")
        return False
    else:
        print("Code update available.")
        return True


if __name__ == "__main__":

    checkTimeSec = 5
    gitDir = os.path.dirname(os.path.realpath(__file__)) + "/../"

    while True:
        print("*********** Checking for code update **************")

        if CheckForUpdate(gitDir):
            # pull changes
            pullChanges = git("--git-dir=" + gitDir + ".git/", "--work-tree=" + gitDir, "pull")
            print("changes pulled")
            # build
            p = subprocess.call("yarn --cwd jukejoint_common/ build", shell=True)
            p = subprocess.call("yarn --cwd jukejoint_streamer/ watch", shell=True)
            p = subprocess.call("yarn --cwd jukejoint_frontend/ build", shell=True)
            # restart services
            p = subprocess.call("sudo systemctl restart shittydj.service", shell=True)

        print("Check complete. Waiting for " + str(checkTimeSec) + "seconds until next check...")
        time.sleep(checkTimeSec)