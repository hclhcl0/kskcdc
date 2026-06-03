import urllib.request
import ssl
import sys

url = "https://drive.google.com/uc?export=download&id=1Bk8UEx7LZAzJb_d9HvbPSRPmM9GoySSi"
output_path = "d:/CDC/web/health-report-app/scratch/drive_file"

print(f"Downloading from {url}...")
# Bypass SSL verification if needed (sometimes required in corporate environments)
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    with urllib.request.urlopen(url, context=ctx) as response, open(output_path, 'wb') as out_file:
        data = response.read()
        out_file.write(data)
    print("Download successful! Saved to:", output_path)
    
    # Try to inspect the downloaded file type and first 100 bytes
    with open(output_path, 'rb') as f:
        header = f.read(100)
        print("File header (first 100 bytes):", header)
        
        # Check if it starts with standard magic numbers
        if header.startswith(b'PK\x03\x04'):
            print("File type: ZIP/Office Open XML (like .docx, .xlsx, .zip)")
        elif b'html' in header.lower() or b'<!doc' in header.lower():
            print("File type: HTML (Google Drive page, file might be private or needs oauth)")
        elif header.startswith(b'%PDF'):
            print("File type: PDF")
        else:
            print("File type: Binary or text")
            try:
                print("Decoded text sample:", header.decode('utf-8'))
            except Exception:
                pass
except Exception as e:
    print("Error downloading file:", str(e))
