import usb.core
import usb.util
import sys

try:
    devices = usb.core.find(find_all=True)
    for dev in devices:
        print(f"ID {dev.idVendor:04x}:{dev.idProduct:04x}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
