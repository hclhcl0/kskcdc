import pypdf
import os

pdf_path = "d:/CDC/web/health-report-app/scratch/drive_file"
output_path = "d:/CDC/web/health-report-app/scratch/pdf_text.txt"

if not os.path.exists(pdf_path):
    print("PDF file not found at:", pdf_path)
    exit(1)

try:
    print("Reading PDF file:", pdf_path)
    reader = pypdf.PdfReader(pdf_path)
    print("Total pages:", len(reader.pages))
    
    with open(output_path, 'w', encoding='utf-8') as out_file:
        for i, page in enumerate(reader.pages):
            out_file.write(f"\n--- PAGE {i + 1} ---\n")
            text = page.extract_text()
            out_file.write(text + "\n")
            
    print("Successfully wrote PDF text to:", output_path)
except Exception as e:
    print("Error reading PDF:", str(e))
