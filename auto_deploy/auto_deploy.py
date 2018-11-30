import sh
from sh import git
import time
import os, sys

aggregated = ""


def CheckForUpdate(workingDir):
    print("Fetching most recent code from source..." + workingDir)

    # Fetch most up to date version of code.
    # p = git("--git-dir=" + workingDir + ".git/", "--work-tree=" + workingDir, "fetch", "origin", "master",
    #         _out=ProcessFetch, _out_bufsize=0, _tty_in=True)
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


# def ProcessFetch(char, stdin):
#     global aggregated
#
#     sys.stdout.flush()
#     aggregated += char
#     if aggregated.endswith("Password for 'https://yourrepo@bitbucket.org':"):
#         print(mainLogger, "Entering password...", True)
#         stdin.put("yourpassword\n")


if __name__ == "__main__":
    checkTimeSec = 2
    gitDir = "./../"
    while True:
        print("*********** Checking for code update **************")

        if CheckForUpdate(gitDir):
            # stop running services

            # pull changes
            #pullChanges = git("--git-dir=" + gitDir + ".git/", "--work-tree=" + gitDir, "pull")
            print("changes pulled")
            # restart services

        print("Check complete. Waiting for " + str(checkTimeSec) + "seconds until next check...", True)
        time.sleep(checkTimeSec)