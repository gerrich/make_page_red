import BaseHTTPServer
import SimpleHTTPServer
import SocketServer
import json
import re

PORT = 8000

#Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
class S(BaseHTTPServer.BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
 
    def do_GET(self):
        self._set_headers()
        self.wfile.write("<html><body><h1>hi!</h1></body></html>")
 
    def do_HEAD(self):
        self._set_headers()
        
    def do_POST(self):
        #for line in self.rfile:
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)

        try:
          data = json.loads(post_body)
          fname = re.sub(r'\W','_',data['url'])
          print "url: ", data['url'], fname
          f = open(fname, 'w')
          f.write(post_body)
        except:
          print "FAIL"
        #print "LINE: %s"%post_body
        # Doesn't do anything with posted data
        self._set_headers()
        self.wfile.write("<html><body><h1>POST!</h1></body></html>")
Handler = S

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()

