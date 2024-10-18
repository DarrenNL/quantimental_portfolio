import http.server
import socketserver

# Define the port you want to use for the local server
PORT = 8000  # You can change the port number if needed

# Directory where the HTML and CSV files are located
DIRECTORY = "."

# Handler to serve the current directory files (HTML, CSV)
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

# Set up an HTTP server on the specified port
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
