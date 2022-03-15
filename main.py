#Drone Monitor Main Executable
import time
import subprocess
import concurrent.futures

SERVER_PATH = './dist/win-unpacked/drone-monitor.exe'
CLIENT_PATH = './server/server-win.exe'

def runExe(exe):
    subprocess.call(exe)
    time.sleep(1)

def main():
    print("Activating Drone Monitor...")
    while True:
        try:
            exeList = [SERVER_PATH, CLIENT_PATH]

            with concurrent.futures.ThreadPoolExecutor() as executor:
                executor.map(runExe, exeList)
                time.sleep(2)
        except:
            print("ERROR OCCURRED")

if __name__ == '__main__':
    main()