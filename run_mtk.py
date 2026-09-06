import os
import sys
import subprocess

# Define paths
base_dir = r"c:\Users\user\webcraft-studio"
repo_dir = os.path.join(base_dir, "mtkclient_repo")
dll_path = os.path.join(repo_dir, "libusb-1.0.dll")

# Add repo to sys.path and DLL to environment
os.environ['PATH'] = repo_dir + os.pathsep + os.environ['PATH']

print(f"Backend set to: {dll_path}")
print("Starting MTK Client...")

# Run mtk.py with the same arguments using Python 3.11
cmd = ["py", "-3.11", os.path.join(repo_dir, "mtk.py")] + sys.argv[1:]
env = os.environ.copy()

try:
    subprocess.run(cmd, env=env, check=True)
except subprocess.CalledProcessError as e:
    print(f"MTK Client failed with exit code {e.returncode}")
except Exception as e:
    print(f"Error: {e}")
